console.log("index.js is connected to index.html");

const apiKey = 'live_H0ZrzBpYUAoRhosEuwCOjYNstw0zhVhauLVAylK4xN5NMqXejWpPkd8B9reg9sgp';
const breedSelect = document.getElementById('breedSelect');

// Placeholder image in case no image is available
const placeholderImage = 'https://via.placeholder.com/300x200.png?text=No+Image+Available';

// Function to fetch and populate breed options in the dropdown
function fetchBreeds() {
  const breedUrl = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;
  fetch(breedUrl)
    .then(response => response.json())
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        breedSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching breed information:', error));
}

// Function to fetch and display cat images for the selected breed
function fetchCatImagesByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${apiKey}`;
  const selectedBreed = breedSelect.options[breedSelect.selectedIndex].text;
  const catsList = document.querySelector('#cats ul');
  catsList.innerHTML = '';  // Clear previous images

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        document.getElementById('cats').innerHTML = '<p>No images available for this breed.</p>';
        return;
      }

      data.forEach((image, index) => {
        const listItem = document.createElement('li');
        const breedTitle = document.createElement('h3');
        const photoNumber = document.createElement('p');
        const img = document.createElement('img');

        breedTitle.innerText = `Breed: ${selectedBreed}`;
        photoNumber.innerText = `Photo #${index + 1}`;
        img.src = image.url || placeholderImage;
        img.alt = `${selectedBreed} Cat`;

        listItem.appendChild(breedTitle);
        listItem.appendChild(photoNumber);
        listItem.appendChild(img);
        catsList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching cat images:', error));
}

// Function to display breed information with description and images
function showBreedsWithDescription() {
  const breedUrl = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`;
  fetch(breedUrl)
    .then(response => response.json())
    .then(breeds => {
      const catsList = document.querySelector('#cats ul');
      catsList.innerHTML = '';  // Clear previous content

      breeds.forEach((breed, index) => {
        const listItem = document.createElement('li');
        const breedTitle = document.createElement('h3');
        const breedDescription = document.createElement('p');
        const breedImage = document.createElement('img');

        breedTitle.innerText = `#${index + 1}: ${breed.name}`;
        breedDescription.innerText = breed.description || 'No description available';
        breedImage.src = breed.reference_image_id 
                         ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
                         : placeholderImage;
        breedImage.alt = `${breed.name} Cat`;

        listItem.appendChild(breedTitle);
        listItem.appendChild(breedImage);
        listItem.appendChild(breedDescription);
        catsList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching breed information:', error));
}

// Event listener for breed selection from dropdown
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  if (selectedBreedId) {
    fetchCatImagesByBreed(selectedBreedId);
  }
});

// Event listener for "Show Breeds" button
document.getElementById('showBreeds').addEventListener('click', showBreedsWithDescription);

// Initial fetch of breeds to populate the dropdown
fetchBreeds();