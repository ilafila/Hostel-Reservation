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
  render: () => {
    return `
      <section class="login-component">
        <img class="login-photo"src="./Images/login.jpg">
        <div class="login-component__login-container">
          <div class="login-container__main-part">
            <h1 class="sign-title">Sign in to book a room</h1>
            <div class="login-input-container">
              <ion-icon class="login-icon"  name="mail-outline"></ion-icon>
              <input type="text" placeholder="email">
            </div>
            <div class="login-input-container">
              <ion-icon class="login-icon" name="lock-open-outline"></ion-icon>
              <input type="text" placeholder="password">
            </div>
        
            <div class="buttons">
              <a class="login-btn" href="#/book">Sign in</a>
              <button class="registration-btn">Sign up</button>
            </div>
          </div>
        </div>
      </section>
    `;
  }
} 

const BookComponent = {
  handleModal: async () => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hide');
  },

  render: () => {
    return `
      <section class="booking-component">
        <div class="booking-component__booking-container">
          <img class="booking-img" src="./Images/booking.jpg">
          <div class="booking-container__main-container">
            <h2>Lets enjoy your vacation!!!</h2>
            <div class="main-container">
              <div class="main-container__date-container">
                <div class="departure-container">
                  <div class="info-container">
                    <h4>In</h4>
                    <ion-icon name="calendar-outline"></ion-icon>
                  </div>
                  <input class="departure" type="text" placeholder="25.01">
                  
                </div>
                <div class="return-container">
                  <div class="info-container">
                    <h4>Out</h4>
                    <ion-icon class="icon-book"name="log-out-outline"></ion-icon>
                  </div>
                  <input class="return" type="text" placeholder="30.01">
              </div>
              </div>
              <div class="main-container__book-container">
                <div class="room-container">
                  <div>
                    <h4>Room <ion-icon class="icon-book" name="bed-outline"></ion-icon></h4>
                    <input class="room-type" type="text" placeholder="private">
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
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                </div>
                <div class="floor">
                  <h3>Floor 3:</h3>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                </div>
                <div class="floor">
                  <h3>Floor 4:</h3>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                  <ion-icon class="room-icon" name="bed"></ion-icon>
                </div>
              </div>
            </div>
          </div>
          </div>


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

function parseLocation(){
  return location.hash.slice(1).toLowerCase() || '/';

}

function findComponentByPath(path, routes){
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
