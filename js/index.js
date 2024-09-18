console.log("index.js is connected to index.html");

const apiKey = 'live_H0ZrzBpYUAoRhosEuwCOjYNstw0zhVhauLVAylK4xN5NMqXejWpPkd8B9reg9sgp';
const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const catsList = document.querySelector('#cats ul');
    data.forEach(image => {
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      img.src = image.url;
      img.alt = 'Bengal Cat';
      listItem.appendChild(img);
      catsList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Error fetching Bengal cat images:', error);
    document.getElementById('cats').innerHTML = '<p>There was an error fetching Bengal cat images.</p>';
  });


