import pymysql
from pymysql.cursors import DictCursor
from config import MySQLDB
import datetime


class MySQL:
    def __init__(self):
        self._connect()

    def _connect(self):
        self.connection = pymysql.connect(
            host=MySQLDB['host'],
            user=MySQLDB['user'],
            password=MySQLDB['password'],
            db=MySQLDB['db'],
            charset='utf8mb4',
            cursorclass=DictCursor)

    def _close_connection(self):
        self.connection.close()

    def user_exists(self, mail):
        """Checking whether user with this mail already registered"""
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()

        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                COUNT(user.user_id) as count
            FROM 
                user 
            WHERE
                user.mail = %s
            """
            cursor.execute(query, mail)
            return cursor.fetchone()['count'] == 1

    def add_user(self, mail, password):
        """Adding user to database"""
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()
        with self.connection.cursor() as cursor:
            query = """
            INSERT INTO
                user (mail, password)
            VALUES
                (%s, %s)
            """
            try:
                cursor.execute(query, [mail, password])
                self.connection.commit()
                return True
            except:
                return False

    def check_auth(self, mail, password):
        """Checking credentials"""
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()
        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                user.user_id as user_id, COUNT(user.user_id) as count
            FROM
                user
            WHERE
                mail = %s and password = %s
            """
            cursor.execute(query, [mail, password])
            row = cursor.fetchone()
            if row['count'] == 1:
                return row['user_id']
            else:
                return False

    def get_rooms_info(self, time_in, time_out, type):
        """Getting rooms info for room type and time"""
        print("get_rooms_info")
        rooms = list()
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()

        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                room.room_num,
                room.floor,
                room.type,
                room.price,
                room.capacity,
                room.available
            FROM
                room
                    LEFT OUTER JOIN
                (SELECT 
                    rental.room_num, COUNT(rental.room_num) AS count
                FROM
                    rental
                WHERE
                    rental.time_in <= %s
                        AND rental.time_out >= %s
                        OR rental.time_in <= %s
                        AND rental.time_out >= %s
                        OR rental.time_in <= %s
                        AND rental.time_out >= %s
                GROUP BY (rental.room_num)) AS T1 ON room.room_num = T1.room_num
            WHERE
                room.type = %s
                    AND room.available = 1
                    AND (T1.count IS NULL OR T1.count = 0)
    
            """
            cursor.execute(query, [time_in, time_out, time_out, time_out, time_in, time_in, str(type)])
            for row in cursor:
                rooms.append(row)

        return rooms

    def book(self, user, room, time_in, time_out):
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()

        with self.connection.cursor() as cursor:
            query = """
            INSERT INTO
               rental (room_num, user_id, time_in, time_out)
            VALUES
               (%s, %s, %s, %s)
            """
            try:
                cursor.execute(query, [str(room), str(user), time_in, time_out])
                self.connection.commit()
            except:
                return False
            return True

    def get_user_rooms(self, user):
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()

        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                rental.rental_id,
                room.room_num AS room,
                room.floor,
                room.type,
                room.price,
                room.capacity,
                room.available,
                rental.time_in,
                rental.time_out
            FROM
                rental,
                room
            WHERE
                rental.room_num = room.room_num
                    AND rental.user_id = %s
                    AND rental.time_out >= %s
            """
            time = datetime.datetime.now()
            now = f"{time.year}-{time.month}-{time.day} {time.hour}:{time.minute}"

            cursor.execute(query, [user, now])
            self.connection.commit()

            rooms = list()
            for row in cursor:
                rooms.append(row)
        return rooms

    def cancel_book(self, rental_id):
        try:
            self._close_connection()
        except:
            print("Already closed")
        self._connect()

        with self.connection.cursor() as cursor:
            query = """
            DELETE FROM rental 
            WHERE
                rental_id = %s
            """

            try:
                cursor.execute(query, rental_id)
                self.connection.commit()
                return True
            except:
                return False
