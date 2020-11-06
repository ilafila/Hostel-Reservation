from flask import Flask, request
from connection import MySQL
import json


app = Flask(__name__)
db = MySQL()


def response(response, status, mimetype='application/json'):
    global app
    return app.response_class(
        response=response,
        status=status,
        mimetype=mimetype)


@app.route('/register', methods=['POST'])
def register():
    """
    Showing registration page and register new users
    :param:
        {
            "mail": <mail>,
            "password": <password>
        }
    :returns
        POST: status of addition user to database
    """
    req_json = request.get_json()
    try:
        mail = req_json['mail']
        password = req_json['password']
    except KeyError:
        return response(json.dumps({"message": "Not enough data provided"}), 400)
    if db.user_exists(mail):
        return response(json.dumps({"message": "User already exists"}), 400)
    else:
        if db.add_user(mail, password):
            return response(json.dumps({"message": "User added"}), 201)
        else:
            return response(json.dumps({"message": "Something went wrong"}), 400)


@app.route('/login', methods=['POST'])
def login():
    """
    Logging in user profile
    :param:
        {
            "mail": <mail>,
            "password": <password>
        }
    :return
        POST: response with exec message
        {
            "user_id": <user_id>
        }
    """
    if request.method == 'POST':
        req_json = request.get_json()
        try:
            login = req_json['mail']
            password = req_json['password']
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)
        user_id = db.check_auth(login, password)
        if user_id:
            return response(json.dumps({"user_id": user_id}), 200)
        else:
            return response(json.dumps({"message": "Wrong credentials"}), 403)


@app.route('/book', methods=['GET', 'POST'])
def book():
    """Booking specific room/getting rooms info
    :param:
        GET:
            {
                "time_in": <time_in>, - string in format "yyyy-mm-dd tt:tt"
                "time_out": <time_out>,
                "type": <type> - string
            }
        POST:
            {
                "user_id": <user_id>,
                "room_num": <room_num>,
                "time_in": <time_in>,
                "time_out": <time_out>
            }
    :returns:
        rooms info for GET, code message for POST
        Response for GET:
        [
            {
                "room_num": <room_id>,
                "floor": <floor>,
                "type": <type>,
                "price": <price>,
                "capacity": <capacity>,
                "available": <available>
            },
            {
                ...
            },
            ...
        ]
    """
    req_json = request.get_json()
    try:
        time_in = req_json['time_in']
        time_out = req_json['time_out']
    except KeyError:
        return response(json.dumps({"message": "Not enough data provided"}), 400)

    if request.method == 'GET':
        try:
            type = req_json['type']
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)
        info = db.get_rooms_info(time_in, time_out, type)
        return response(json.dumps(info), 200)
    else:
        try:
            user_id = req_json['user_id']
            room_num = req_json['room_num']
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)
        res = db.book(user_id, room_num, time_in, time_out)
        if res:
            return response(json.dumps({"message": "Done"}), 201)
        else:
            return response(json.dumps({"message": "Wrong input"}), 400)


if __name__ == '__main__':
    app.run(debug=True)
