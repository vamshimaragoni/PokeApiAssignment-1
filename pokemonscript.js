const galleryElement = document.getElementById('gallery');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let offset = 0;
const limit = 3;
//This function will accept the urls and returns the data in the form of json after fetching.
async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
//This function will create the 3 pokemoncards whenever it is called.
function createPokemonCard(pokemon) {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');

    const pokemonImg = document.createElement('img');
    pokemonImg.classList.add('pokemon-img');
    pokemonImg.src = pokemon.sprites.front_default; 

    const pokemonName = document.createElement('p');
    pokemonName.textContent = pokemon.name;

    pokemonCard.appendChild(pokemonImg);
    pokemonCard.appendChild(pokemonName);
    return pokemonCard;
}
//This function is used to display the images of pokemon by calling required functions.
//results is property of json in the given context(took from pokeAPi) which returns the data in the form of an array
async function displayPikachus() {
    const response = await fetchData(`${apiUrl}?offset=${offset}&limit=${limit}`);
    const pokemons = response.results;
    galleryElement.innerHTML = '';
    pokemons.forEach(async (pokemon) => {
        const pokemonsImages = await fetchData(pokemon.url);
        const pokemonCard = createPokemonCard(pokemonsImages);
        galleryElement.appendChild(pokemonCard);
    });
}
function updateOffset(delta) {
    offset += delta;
    if (offset < 0) {
        offset = 0;
    }
}
//Next Button
nextBtn.addEventListener('click', async () => {
    updateOffset(limit);
    displayPikachus();
});

// PREV button
prevBtn.addEventListener('click', async () => {
    updateOffset(-limit);
    displayPikachus();
});

// On page load, it will display 3 images.
displayPikachus();