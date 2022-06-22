let currentPokemon;
let pokemonStart = 0;
let loadedPokemonNumber = 26;
let pokemonLimit = 650;

/**
 * Scroll-Event for Loading more Pokemons
 */
window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        if (loadedPokemonNumber < pokemonLimit) {
            loadedPokemonNumber += 25;
            pokemonStart += 25;
            renderPokedex();
        }
    }
});


/**
 * Fetch API => load Pokemon-Dates from API
 */
async function renderPokedex() {
    for (let i = pokemonStart + 1; i < loadedPokemonNumber; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        renderPokemonInfo(i);
    }
}


function renderPokemonInfo(i) {
    document.getElementById('pokedex').innerHTML += generatePokemonInfoHTML(i);
}


async function openCard(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    document.getElementById('pokedex').innerHTML += generateOpenCardHTML(i);
}


function closeCard(i) {
    document.getElementById('big-card').classList.add('d-none');
}


/**
 * Switch between Info-Box "About" and Info-Box "Stats"
 */
function chooseBoxInOpenCard() {
    if (document.getElementById('info-stats').classList.contains('d-none') == true) {
        document.getElementById('info-about').classList.add('d-none');
        document.getElementById('info-stats').classList.remove('d-none');
        document.getElementById('info-stats-header').classList.remove('cb-inactiv');
        document.getElementById('info-about-header').classList.add('cb-inactiv');
    } else {
        document.getElementById('info-about').classList.remove('d-none');
        document.getElementById('info-stats').classList.add('d-none');
        document.getElementById('info-stats-header').classList.add('cb-inactiv');
        document.getElementById('info-about-header').classList.remove('cb-inactiv');
    }
}


/**
 * Search Pokemon
 */
function searchPokemon() {
    const search = document.getElementById("search").value;

    for (let i = 1; i < pokemonLimit; i++) {
        let pokemonCard = document.getElementById(`pokemonCard${i}`);
        let pokemonName = document.getElementById(`pokemonName${i}`).innerHTML;

        if (!pokemonName.includes(search)) {
            pokemonCard.classList.add('d-none');
        }
        else {
            if (pokemonCard.classList.contains('d-none')) {
                pokemonCard.classList.remove('d-none');
            }
        }
    }
}