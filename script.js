
// Fetch the JSON data containing the opening hours
fetch('openinghours.json')
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
    // Extract the opening hours array from the JSON data
    const openingHours = data[0].openinghours;

    // Get the current day and hour
    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
    const currentHour = today.getHours();

    // Find the opening hours for the current day
    const todaysHours = openingHours.find(day => day.day === currentDay);

    // Determine if the museum is open or closed
    let openingStatus;
    if (todaysHours.hours === 'Lukket') {
      openingStatus = 'Lukket nu';
    } else {
      const [openHour, closeHour] = todaysHours.hours.split(' - ').map(time => parseInt(time.split(':')[0]));
      if (currentHour >= openHour && currentHour < closeHour) {
        openingStatus = 'Åbent nu';
      } else {
        openingStatus = 'Lukket nu';
      }
    }

    // Update the openingStatus message in the HTML
    let openingStatusElement = document.getElementById("openingStatus");
    openingStatusElement.textContent = openingStatus;
  })
  .catch(error => {
    console.error('Error fetching or parsing opening hours data:', error);
  });



// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// JavaScript
document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector(".buttonbuy1");
  button.addEventListener("click", function(event) {
    event.preventDefault();
    const targetSection = document.querySelector(button.getAttribute("href"));
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", function() {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    // Highlight or update navigation based on the current section
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

});
