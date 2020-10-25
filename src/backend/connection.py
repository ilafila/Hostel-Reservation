import pymysql
from pymysql.cursors import DictCursor
from config import MySQLDB


class MySQL():
    def __init__(self):
        self.connection = self._connect()

    def _connect(self):
        return pymysql.connect(
            host=MySQLDB['host'],
            user=MySQLDB['user'],
            password=MySQLDB['password'],
            db=MySQLDB['db'],
            charset='utf8mb4',
            cursorclass=DictCursor)

    def user_exists(self, mail):
        """Checking whether user with this mail already registered"""
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

    def check_intersec(self, time_in, time_out, room):
        """Checking time intersection while booking"""
        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                COUNT(rental.room_num) AS count
            FROM
                rental
            WHERE
                rental.time_in <= %s
                    AND rental.time_out >= %s
                    OR rental.time_in <= %s
                    AND rental.time_out >= %s
                    OR rental.time_in >= %s
                    AND rental.time_out <= %s
                    OR rental.time_in <= %s
                    AND rental.time_out >= %s
            GROUP BY (rental.room_num)
            HAVING rental.room_num = %s
            """
            cursor.execute(query, [time_in, time_in, time_out, time_out, time_in, time_out, time_in, time_out, str(room)])
            try:
                return cursor.fetchone()['count'] == 0
            except TypeError:
                return True

    def get_available_rooms(self, type):
        """Getting room_num of each available room"""
        with self.connection.cursor() as cursor:
            query = """
            SELECT 
                room.room_num as room
            FROM
                room
            WHERE
                room.type = %s
                    AND room.available = 1
            """
            rooms = list()

            cursor.execute(query, type)
            for row in cursor:
                rooms.append(int(row['room']))
            return rooms

    def get_room_info(self, room):
        """Getting specific room info"""
        with self.connection.cursor() as cursor:
            query = """
            SELECT 
               *
            FROM
               room
            WHERE
               room.room_num = %s
            """
            cursor.execute(query, str(room))
            return cursor.fetchone()

    def get_rooms_info(self, time_in, time_out, type):
        """Getting rooms info for room type and time"""
        rooms_num = self.get_available_rooms(type)
        rooms = list()
        for room_num in rooms_num:
            if self.check_intersec(time_in, time_out, room_num):
                rooms.append(self.get_room_info(room_num))

        return rooms

    def book(self, user, room, time_in, time_out):
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
