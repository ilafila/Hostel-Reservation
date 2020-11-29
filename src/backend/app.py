from flask import Flask, request, url_for
from authlib.integrations.flask_client import OAuth
from flask_cors import CORS, cross_origin
from connection import MySQL
import config
import json


app = Flask(__name__)
app.secret_key = config.APP_SECRET_KEY
oauth = OAuth(app)
oauth.register(
    name='google',
    client_id=config.GOOGLE_CLIENT_ID,
    client_secret=config.GOOGLE_CLIENT_SECRET,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    # This is only needed if using openId to fetch user info
    client_kwargs={'scope': 'openid email profile'},
)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = MySQL()


def response(response, status, mimetype='application/json'):
    global app
    return app.response_class(
        response=response,
        status=status,
        mimetype=mimetype)


@app.route('/register', methods=['POST'])
@cross_origin()
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
@cross_origin()
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


@app.route('/book', methods=['GET', 'POST', 'DELETE'])
@cross_origin()
def book():
    """Booking specific room/getting rooms info
    :param:
        GET:
            parameters: "time_in": <time_in>, - string in format "yyyy-mm-dd tt:tt"
                        "time_out": <time_out>,
                        "type": <type> - string
        POST:
            {
                "user_id": <user_id>,
                "room_num": <room_num>,
                "time_in": <time_in>,
                "time_out": <time_out>
            }
        DELETE:
            {
                "rental_id": <rental_id>
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
    if request.method == 'GET':
        try:
            time_in = request.args.get('time_in')
            time_out = request.args.get('time_out')
            type = request.args.get('type')
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)
        info = db.get_rooms_info(time_in, time_out, type)
        return response(json.dumps(info), 200)
    elif request.method == 'POST':
        req_json = request.get_json()
        try:
            time_in = req_json['time_in']
            time_out = req_json['time_out']
            user_id = req_json['user_id']
            room_num = req_json['room_num']
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)
        res = db.book(user_id, room_num, time_in, time_out)
        if res:
            return response(json.dumps({"message": "Done"}), 201)
        else:
            return response(json.dumps({"message": "Wrong input"}), 400)
    else:
        req_json = request.get_json()
        try:
            rental_id = req_json['rental_id']
        except KeyError:
            return response(json.dumps({"message": "Not enough data provided"}), 400)

        res = db.cancel_book(rental_id)
        if res:
            return response(json.dumps({"message": "Done"}), 201)
        else:
            return response(json.dumps({"message": "Wrong input"}), 400)


@app.route('/rooms/<user_id>', methods=['GET'])
@cross_origin()
def user_rooms(user_id):
    """Booking specific room/getting rooms info
    :param:
        GET:
            parameters: None
    :returns:
        [
        {
            "room_num": <room_id>,
            "floor": <floor>,
            "type": <type>,
            "price": <price>,
            "capacity": <capacity>,
            "available": <available>
        },
        ...
        ]"""

    rooms = db.get_user_rooms(user_id)
    return response(json.dumps(rooms), 200)


@app.route('/login/google')
@cross_origin()
def login_google():
    redirect_uri = url_for('authorize_google', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)


@app.route('/authorize/google')
@cross_origin()
def authorize_google():
    token = oauth.google.authorize_access_token()  # Access token from google (needed to get user info)
    resp = oauth.google.get('userinfo')  # userinfo contains stuff u specificed in the scrope
    user_info = resp.json()

    mail = user_info['email']
    password = 'google_auth'
    user_id = db.check_auth(mail, password)
    if not user_id:
        db.add_user(mail, password)
        user_id = db.check_auth(mail, password)
    return response(json.dumps({"user_id": user_id}), 200)


if __name__ == '__main__':
    app.run(debug=True)
