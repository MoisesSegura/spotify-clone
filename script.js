//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

//Declaramos variables
var side_menu = document.getElementById("menu_side");
var btn_open = document.getElementById("btn_open");
var body = document.getElementById("body");

//Evento para mostrar y ocultar menú
    function open_close_menu(){
        body.classList.toggle("body_move");
        side_menu.classList.toggle("menu__side_move");
    }

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760){

    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
}

//Haciendo el menú responsive(adaptable)

window.addEventListener("resize", function(){

    if (window.innerWidth > 760){

        body.classList.remove("body_move");
        side_menu.classList.remove("menu__side_move");
    }

    if (window.innerWidth < 760){

        body.classList.add("body_move");
        side_menu.classList.add("menu__side_move");
    }

});







const clientId = 'e44e9944a8dc4ff1aee0224c7e6f2fcc';
const clientSecret = '90b9fd64675d4112ad07e4e9f6bfcd8a';


// Lista de términos de búsqueda aleatorios (puedes agregar más)
const searchTerms = [
    'rock', 'pop', 'jazz', 'hip hop', 'electronic', 'reggaeton', 'classical', 'metal'
];

// Función para obtener un token de acceso
async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    return data.access_token;
}

// Función para buscar artistas aleatorios
async function fetchRandomArtists(token) {
    try {
        // Selecciona un término de búsqueda aleatorio
        const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];

        // Realiza la búsqueda en la API de Spotify
        const response = await fetch(`https://api.spotify.com/v1/search?q=${randomTerm}&type=artist&limit=8`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Verifica la estructura de la respuesta

        // Retorna los artistas encontrados
        return data.artists.items;
    } catch (error) {
        console.error('Error al buscar artistas:', error);
        return []; // Retorna un array vacío en caso de error
    }
}

// Función para renderizar los artistas en la página
function renderArtists(artists) {
    const container = document.querySelector('.container-card-concentracion');
    if (artists.length > 0) {
        container.innerHTML = artists.map(artist => `
            <button class="card-concentracion" onclick="redirectToArtist('${artist.id}')">
                <div class="card-img">
                    <img src="${artist.images[0]?.url || 'img/placeholder.jpg'}" alt="${artist.name}" />
                    <div class="overlay"></div>
                </div>
                <h4>${artist.name}</h4>
            </button>
        `).join('');
    } else {
        container.innerHTML = '<p>No se encontraron artistas.</p>';
    }
}

// Función para redirigir a la página del artista
function redirectToArtist(artistId) {
    window.location.href = `Artist.html?artist=${artistId}`;
}

// Función principal para cargar el contenido
async function loadContent() {
    const token = await getAccessToken(); // Obtén el token de acceso
    const artists = await fetchRandomArtists(token); // Obtén artistas aleatorios
    renderArtists(artists); // Renderiza los artistas en la página
}


loadContent();


// script para obtener playlist

