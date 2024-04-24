
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

  //shows the åbningstider when you press the button
  document.getElementById('toggleOpeningHours').addEventListener('click', function() {
    var openingHours = document.getElementById('openingHours');
    if (openingHours.style.display === 'none') {
      openingHours.style.display = 'block';
    } else {
      openingHours.style.display = 'none';
    }
  });
  
  //shows the billet priser when you press the button
  document.getElementById('toggleBilletPriser').addEventListener('click', function() {
    var billetPriser = document.getElementById('billetPriser');
    if (billetPriser.style.display === 'none') {
      billetPriser.style.display = 'block';
    } else {
      billetPriser.style.display = 'none';
    }
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

