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
function showOpeningHours() {
  fetch('openinghours.json')
    .then(response => response.json())
    .then(data => {
      const openingHours = data[0].openinghours; // Access the openinghours array inside the first object

      const openingHoursContainer = document.getElementById('openingHoursContainer');
      openingHoursContainer.innerHTML = ''; // Clear previous content

      openingHours.forEach(day => {
        const dayElement = document.createElement('p');
        if (day.hours === 'Lukket') {
          dayElement.textContent = `${day.day}: Lukket`;
        } else {
          dayElement.textContent = `${day.day}: ${day.hours}`;
        }
        openingHoursContainer.appendChild(dayElement);
      });

      // Show the opening hours container
      openingHoursContainer.style.display = 'block';
    })
    .catch(error => console.error('Error fetching opening hours:', error));
}



