// Autenticación
const clientId = '65a2f93e478a4a0d907bedcc2c58bf8c';
const clientSecret = 'b4407a50063b45be8add9c20cdeabb0c';

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// Búsqueda de artistas
const searchArtist = async (artistName) => {
  const accessToken = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });

  const data = await response.json();
  return data.artists.items;
};

// Manejo del evento de búsqueda
const searchButton = document.getElementById('card-concentracion');
const artistInput = document.getElementById('artist-input');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', async () => {
  const artistName = urlParams.get('cadena');
  const artists = await searchArtist(artistName);

  let html = '';
  artists.forEach((artist) => {
    html += `<div>
              <h3>${artist.name}</h3>
              <p>${artist.genres.join(', ')}</p>
              <p><img src="${artist.images[0].url}" alt="Artista"></p>
            </div>`;
  });

  resultsDiv.innerHTML = html;
});

