import './style.css'


Fancybox.bind("[data-fancybox='pdfs']", {
  Toolbar: {
    display: [
      "zoom",
      "close",
      "fullscreen",
    ],
  },
  Thumbs: false,
  type: "iframe", // Optional fallback
  iframe: {
    preload: false,
    css: {
      width: '100%',
      height: '90vh',
    },
  },
});

window.onload = function() {
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
  };
  
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };
  
  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'visible';
    }
  };


  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const image = document.querySelector('.parallax-img');
  
    if (image) {
      const translateY = Math.min(scrolled * 0.3, -100); // Cap at 100px
      image.style.transform = `translate(-50%, ${translateY}px)`;
    }
  });

const apiKey = import.meta.env.VITE_API_KEY;
let weather = {
  fetchWeather: function (city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
          .then((response) => {
              if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
              }
              return response.json();
          })
          .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
      const country = data.sys.country;
      const icon = data.weather[0].icon;
      const temp = data.main.temp;
      const celsius = Math.round(temp -273);
      document.querySelector(".country").innerText = country;
      document.querySelector(".icon").src =`https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".temp").innerText = ` ${celsius}°C`;
},
};
weather.fetchWeather("Eindhoven");


  const cards = document.querySelectorAll('.card');
  const container = document.querySelector('.card-stack-container');
  const originalColor = getComputedStyle(container).backgroundColor;

  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const bgColor = card.getAttribute('data-bg');
      container.style.backgroundColor = bgColor;
    });

    card.addEventListener('mouseleave', () => {
      container.style.backgroundColor = originalColor;
    });
  });




