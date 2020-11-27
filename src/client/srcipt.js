const HomeComponent = {
  render: () => {
    return `
    <section class="home-component">
      <div class="greeting-container">
        <div class="great-text">
          <p>Our hostel greets you</p>
        </div>
      </div>

      <div class="general-info-container">
        <h1>We can help you enjoy Saint-Petersburg</h1>
        <div class="general-info-container__location">
          <img alt="greeting image" class="location-img" src="./Images/location.jpg">
          <p class="info-text">We are located in the heart of Saint-Petersburg.So you can visit all the most popular attractions,
          walk through magestic streets and plunge into the atmosphere of small sights.You don't have to spend a lot of time for road </p>
        </div> 
      </div>

      <div class="hostel-info-container">
        <div class="hostel-info-container__activities-container">
          <div class="info-block">
            <ion-icon class="icon" name="cafe-outline"></ion-icon>
            <p class="text">Breakfast is included and awaits you every morning. Start a new day with our express breakfast with takeaway options</p>
          </div>

          <div class="info-block">
            <ion-icon class="icon" name="wifi-outline"></ion-icon>
            <p class="text">We know the importance of the little things. Simple things like the availability of free Wi-Fi
            will make you feel right at home after a busy day</p>
          </div>

          <div class="info-block">
            <ion-icon class="icon" name="bed-outline"></ion-icon>
            <p class="text">You are resting, the devices are charging. Conveniently located sockets, a comfortable bed, an air blanket, pillows to choose from
            - you are guaranteed a great rest</p>
          </div>
        </div>
      </div>

      <div class="rooms-section-container">
        <div class="rooms-section-container__room-container">
          <img class="room" src="./Images/Private room/bedroom2.png">
          <div class="room-info">
            <h2>Private room</h2>
            <p class="text">Are you coming solo, as a couple or with friends and you need privacy?
            Our private rooms with 1 double or 2 twins beds with private bathroom are ideal for you, bright, calm and stylish.
            Enjoy a view of the city from the balcony by price <strong>20 euro</strong>/night </p>
          </div>
        </div>
        <div class="rooms-section-container__room-container family">
          <div class="room-info">
            <h2>Family room</h2>
            <p class="text">We designed this suite for families or friends wishing to have their privacy.
            With the same functionality as the other private double room but with more beds !
            Rooms with a large double bed and two bunk-beds with private bathroom  for 4 people by price <strong>35 euro</strong>/night
            </p>
          </div>
          <img class="room" src="./Images/Family room/family1.png">
        </div>
      </div>

      <div class="booking-section-container">
        <div class="booking-section-container__contact-container">
          <h2>Contact us</h2>
          <div class="contacts">
            <div class="contact">
              <ion-icon class="contact-icon" name="location-outline"></ion-icon>
              <p class="text">Universitetskaya emb., 7</p>
            </div>
            <div class="contact">
              <ion-icon class="contact-icon" name="call-outline"></ion-icon>
              <p class="text">+7(911)913-74-50 </p>
            </div>
            <div class="contact">
              <ion-icon class="contact-icon" name="mail-outline"></ion-icon>
              <p class="text">spbhostel@gmail.com</p>
            </div>
            <a class="book" href="#/login">Book</a>
          </div>
        </div>
      </div>

  </section>
    `;
  }
}

const LogInComponent = {
  handleLogin: async () => {
    const logInInfo = {
      mail: document.querySelector('.email').value,
      password: document.querySelector('.password').value,
    };

    // const response = await fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(logInInfo)
    // });

    // if (response.ok) {
    //   const userInfo = await response.json();
    //   const userId = userInfo.user_id;
    //   console.log(userId);
    //   localStorage.setItem('userId', userId);
    //   let link = document.createElement('a');
    //   link.href = '#/book';
    //   link.click();
    //   delete link;
    // }
    // const userInfo = await response.json();
    // const userId = userInfo.user_id;
    // console.log(userId);
    // localStorage.setItem('userId', userId);
    let link = document.createElement('a');
    link.href = '#/book';
    link.click();
    delete link;
  },

  handleRegistration: async () => {
    const registrationInfo = {
      mail: document.querySelector('.email').value,
      password: document.querySelector('.password').value,
    };

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationInfo)
    });

    if (response.ok) {
      alert('You are successfully registered!');
    }
  },

  render: () => {
    return `
      <section class="login-component">
        <img class="login-photo"src="./Images/login.jpg">
        <div class="login-component__login-container">
          <div class="login-container__main-part">
            <h1 class="sign-title">Sign in to book a room</h1>
            <div class="login-input-container">
              <ion-icon class="login-icon" name="mail-outline"></ion-icon>
              <input type="text" class="email" placeholder="email">
            </div>
            <div class="login-input-container">
              <ion-icon class="login-icon" name="lock-open-outline"></ion-icon>
              <input type="text" class="password" placeholder="password">
            </div>
        
            <div class="buttons">
              <button class="login-btn" onclick="LogInComponent.handleLogin()">Sign in</button>
              <button class="registration-btn" onclick="LogInComponent.handleRegistration()">Sign up</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

const BookComponent = {
  redirectToHome: () => {
    const image = document.querySelector('.booking-img');
    image.classList.remove('hide');

    const bookingText = document.querySelector('.booking-text');
    bookingText.classList.add('hide');

    const bookingInfoContainer = document.querySelector('.booking-info-container');
    bookingInfoContainer.classList.add('hide');

    const link = document.createElement('a');
    link.href = '#/';
    link.click();
    delete link;
  },

  redirectToLogIn: () => {
    const image = document.querySelector('.booking-img');
    image.classList.remove('hide');

    const bookingText = document.querySelector('.booking-text');
    bookingText.classList.add('hide');

    const bookingInfoContainer = document.querySelector('.booking-info-container');
    bookingInfoContainer.classList.add('hide');

    const link = document.createElement('a');
    link.href = '#/login';
    link.click();
    delete link;
  },

  showMyRooms: async () => {
    const myRoomsContainer = document.querySelector('.my-rooms-container');
    const response = await fetch('url');
    const myRooms = await response.json();
    myRooms.forEach((room) => {
      BookComponent.createMyRoom(room.room_num, room.type);
    });
  },

  createMyRoom: (number, type) => {
    const myRoomContainer = document.createElement('div');
    myRoomContainer.classList.add('my-room-container');
    const img = document.createElement('img');
    img.classList.add('booking-info-img');
    if(type == 'private'){
      img.setAttribute('src', './Images/Private room/bedroom2.png');
    } else {
      img.setAttribute('src', './Images/Family room/family1.png');
    }
    myRoomContainer.appendChild(img);
    const roomInfo = document.createElement('div');
    roomInfo.classList.add('room-info');
    const roomNumber = document.createElement('p');
    roomNumber.innerText = `Room number: ${number}`;
    const roomType = document.createElement('p');
    roomType.innerText = `Room Type: ${type}`;
    roomInfo.appendChild(roomNumber);
    roomInfo.appendChild(roomType);
    myRoomContainer.appendChild(roomInfo);


  },

  showBookContainer: () => {
    const image = document.querySelector('.booking-img');
    image.classList.add('hide');

    const bookingText = document.querySelector('.booking-text');
    bookingText.classList.remove('hide');

    const bookingInfoContainer = document.querySelector('.booking-info-container');
    bookingInfoContainer.classList.remove('hide');
  },

  showRoom: function(event) {
    const modalRoom = document.querySelector('.modal-room-info-container');
    modalRoom.classList.add('show');

    const roomNumber = document.querySelector('.room-number-text');
    roomNumber.innerText = `Room number: ${event.target.dataset.number}`;
    const roomType = document.querySelector('.room-type-text');
    roomType.innerText = `Type: ${event.target.dataset.type}`;
    const img = document.querySelector('.booking-info-img');
    if(event.target.dataset.type === 'family'){
      img.setAttribute('src', './Images/Family room/family1.png');
    } else {
      img.setAttribute('src', './Images/Private room/bedroom2.png');
    }
    const roomCapacity = document.querySelector('.room-capacity-text');
    roomCapacity.innerText = `Capacity: ${event.target.dataset.capacity}`;
    const roomPrice = document.querySelector('.room-price-text');
    roomPrice.innerText = `Price: ${event.target.dataset.price}`;

    const bookBtn = document.querySelector('.booking-btn');
    bookBtn.dataset.number = event.target.dataset.number;
    bookBtn.addEventListener('click', BookComponent.bookRoom);
  },

  bookRoom: async function(event){
    const roomNumber = event.target.dataset.number;
    const userId = localStorage.getItem('userId');
    const roomInfo = JSON.parse(localStorage.getItem('roomInfo'));
    const bookInfo = {
      user_id: userId,
      room_num: roomNumber,
      time_in: roomInfo.timeIn,
      time_out: roomInfo.timeOut,
    }

    const response = await fetch('http://localhost:5000/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookInfo)
    });

    if (response.ok) {
      const modalRoom = document.querySelector('.modal-room-info-container');
      modalRoom.classList.remove('show');
    }
  },

  closeRoom: () => {
    const modalRoom = document.querySelector('.modal-room-info-container');
    modalRoom.classList.remove('show');
  },

  handleModal: async () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('hide');
    const roomInfo = {
      timeIn: document.querySelector('.departure').value + ` ${document.querySelector('.timeIn').value}`,
      timeOut: document.querySelector('.return').value + ` ${document.querySelector('.timeOut').value}`,
      type: document.querySelector('.room-type').value,
    }
    const response = await fetch(`http://localhost:5000/book?time_in=${roomInfo.timeIn}&time_out=${roomInfo.timeOut}&type=${roomInfo.type}`);
    if (response.ok) {
      localStorage.setItem('roomInfo', JSON.stringify(roomInfo));
      const availableRoomsJson = await response.json();
      const availableRooms = Array.from(availableRoomsJson);
      const icons = Array.from(document.querySelectorAll('.room-icon'));
      if(roomInfo.type === 'family'){
        if(+icons[0].dataset.number === 1){
          for(let i = 0; i < icons.length; i++){
            icons[i].dataset.number = 13 + i;
          }
        }
      } else if(roomInfo.type === 'private'){
        if(+icons[0].dataset.number !== 1){
          for(let i = 0; i < icons.length; i++){
            icons[i].dataset.number = i + 1;
          }
        }
      }

      icons.forEach((icon) => {
        const room = availableRooms.find((room) => room.room_num === +icon.dataset.number);
        if(room != undefined){
          icon.style.color = 'green';
          icon.dataset.type = roomInfo.type;
          if(roomInfo.type === 'family'){
            icon.dataset.price = 35;
            icon.dataset.capacity = 4;
          } else {
            icon.dataset.price = 20;
            icon.dataset.capacity = 2;
          }
          icon.addEventListener('click', BookComponent.showRoom);
        } else {
          icon.style.color = 'red';
          icon.removeEventListener('click', BookComponent.showRoom);
        }
      });

      modal.classList.remove('hide');
    }
  },

  render: () => {
    return `
      <section class="booking-component">
        <div class="booking-component__booking-container">
          <nav class="navigation">
            <div class="button-container">
              <button class="light-btn" onclick="BookComponent.redirectToHome()">Home</button>
            </div>
            <div class="button-container">
              <button class="light-btn" onclick="BookComponent.redirectToLogIn()">Login/Registration</button>
            </div>
            <div class="button-container">
              <button class="light-btn" onclick="BookComponent.showMyRooms()">My rooms</button>
            </div>
            <div class="booking-container">
              <button class="strong-btn" onclick="BookComponent.showBookContainer()">Book now</button>
            </div>
          </nav>


          <div class="booking-container__main-container">
            <img class="booking-img" src="./Images/booking.jpg" alt="main cabinet photo">
            <h2 class=" booking-text hide">Lets enjoy your vacation!!!</h2>
            <div class="booking-info-container hide">
              <div class="main-container">
                <div class="main-container__date-container">
                  <div class="departure-container">
                    <div class="info-container">
                      <h4>In</h4>
                      <ion-icon name="calendar-outline"></ion-icon>
                    </div>
                    <input class="departure" type="date">
                  </div>
                  <div class="return-container">
                    <div class="info-container">
                      <h4>Out</h4>
                      <ion-icon class="icon-book" name="log-out-outline"></ion-icon>
                    </div>
                    <input class="return" type="date">
                  </div>
                </div>

                <div class="main-container__time-container">
                  <div class="timeIn-container">
                    <div>
                      <h4>Time in<ion-icon name="alarm-outline"></ion-icon></h4>
                      <input class="timeIn" type="text" placeholder="20:30">
                    </div>
                  </div>
                  <div class="timeOut-container">
                    <div>
                      <h4>Time out<ion-icon name="alarm-outline"></ion-icon></h4>
                      <input class="timeOut" type="text" placeholder="21:30">
                    </div>
                  </div>
                </div>

                <div class="main-container__book-container">
                  <div class="room-container">
                    <div>
                      <h4>Room <ion-icon class="icon-book" name="bed-outline"></ion-icon></h4>
                      <input class="room-type" type="text" placeholder="private or family">
                    </div>
                  </div>
                  <button onclick="BookComponent.handleModal()" class="find-btn"><ion-icon class="icon-book" name="search-outline"></ion-icon></button>
                </div>
              </div> 

              <div class="modal hide">
                <div class="available-rooms-container">
                  <h2>Rooms</h2>
                  <div class="available-rooms">
                    <div class="floor">
                      <h3>Floor 2:</h3>
                      <ion-icon data-number="1" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="2" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="3" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="4" class="room-icon" name="bed"></ion-icon>
                    </div>
                    <div class="floor">
                      <h3>Floor 3:</h3>
                      <ion-icon data-number="5" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="6" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="7" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="8" class="room-icon" name="bed"></ion-icon>
                    </div>
                    <div class="floor">
                      <h3>Floor 4:</h3>
                      <ion-icon data-number="9" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="10" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="11" class="room-icon" name="bed"></ion-icon>
                      <ion-icon data-number="12" class="room-icon" name="bed"></ion-icon>
                    </div>
                  </div>
                </div>
              </div>

            </div> 
          </div> 

          <div class="modal-room-info-container hide">
            <ion-icon class="close-room-info" onclick="BookComponent.closeRoom()" name="close-outline"></ion-icon>
            <div class="room-info-container">
              <img class="booking-info-img" src="./Images/Private room/bedroom2.png">
              <div class="book-info">
                <p class="room-number-text">Room number</p>
                <p class="room-type-text">Type</p>
              </div>
              <div class="book-info">
                <p class="room-capacity-text">Capacity</p>
                <p class="room-price-text">Price</p>
              </div>
              <button class="strong-btn booking-btn">Book</button>
            </div>
          </div>

          <div class="my-rooms-container"></div>
        </div> 
      </section>
    `;
  }
}

const ErrorComponent = {
  render: () => {
    return `
      <section class="red">
        <h1>Error</h1>
      </section>
    `;
  }
}

const routes = [
  { path: '/', component: HomeComponent, },
  { path: '/login', component: LogInComponent, },
  { path: '/book', component: BookComponent, },
];

function parseLocation() {
  return location.hash.slice(1).toLowerCase() || '/';

}

function findComponentByPath(path, routes) {
  return routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
}

const router = () => {
  // Find the component based on the current path
  const path = parseLocation();
  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
  // Render the component in the "app" placeholder
  document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
