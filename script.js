let currentPokemon;
let pokemonStart = 0;
let loadedPokemonNumber = 26;
let limit = 650;

//############# Scroll-Event for Loading more Pokemons ############# 
window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (Math.ceil(scrolled) === scrollable) {
        if (loadedPokemonNumber < limit) {
            loadedPokemonNumber += 25;
            pokemonStart += 25;
            renderPokedex();
        }
    }
});


//############# Fetch API => load Pokemon-Dates from API ############# 
async function renderPokedex() {
    for (let i = pokemonStart + 1; i < loadedPokemonNumber; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        console.log('Loaded pokemon', currentPokemon);

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


//############# Switch between Info-Box "About" and Info-Box "Stats" ############# 
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


//############# Generate HTML ############# 
function generatePokemonInfoHTML(i) {
    return /*html*/`
    <div onclick="openCard(${i})" class="pokemonCard" id="pokemonCard${i}" style="background-color: var(--bg-${currentPokemon['types'][0]['type']['name']})">
        <div class="pokemon-header">
            <h2>${currentPokemon['name']}</h2>
        </div>
        <div class="img-box">
            <img class="pokemon-img" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
        </div>
        <div class="pokemon-type-id-box">
            <div class="pokemon-type-id">
                <h2>${currentPokemon['types'][0]['type']['name']}</h2>
            </div>
            <div class="pokemon-type-id">
                <h2>#${currentPokemon['id']}</h2>
            </div>
        </div>
    </div>
    `;
}


function generateOpenCardHTML(i) {
    return /*html*/ `
    <div class="big-card-bg" id="big-card">
        <div class="openCard big-card margin-0 width-400" id="pokemonCard${i}" style="background-color: var(--bg-${currentPokemon['types'][0]['type']['name']})">
            <div class="card-top">
                <div class="header-icons">
                    <img src="img/save.svg">
                    <img onclick="closeCard(${i})" src="img/x-mark.png">
                </div>

                <div class="pokemon-header">
                    <h2 class="header-open-card">${currentPokemon['name']}</h2>
                </div>
                <div class="img-box width-400">
                    <img class="pokemon-img" src="${currentPokemon['sprites']['other']['dream_world']['front_default']}">
                </div>
                <div class="pokemon-type-id-box">
                    <div class="pokemon-type-id type-margin">
                        <h2>${currentPokemon['types'][0]['type']['name']}</h2>
                    </div>
                    <div class="pokemon-type-id">
                        <h2>#${currentPokemon['id']}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="pokemoncard card-bottom">
            <div class="cb-header">
                <div class="cb-about" id="info-about-header" onclick="chooseBoxInOpenCard()"><h3>About</h3></div>
                <div class="cb-stats cb-inactiv" id="info-stats-header" onclick="chooseBoxInOpenCard()"><h3>Stats</h3></div>
            </div>
            <div class="cb-charakter" id="info-about">
                <div class="cb-charakter-header">
                    <h4>Height:</h4>
                    <h4>Weight:</h4>
                    <h4>Type:</h4>
                    <h4>Ability:</h4>
                </div>

                <div class="cb-charakter-infos">
                    <h4>${currentPokemon['height']}</h4>
                    <h4>${currentPokemon['weight']}</h4>
                    <h4>${currentPokemon['types'][0]['type']['name']}, ${currentPokemon['types'][1]['type']['name']}</h4>
                    <h4>${currentPokemon['abilities'][0]['ability']['name']} / ${currentPokemon['abilities'][1]['ability']['name']}</h4>
                </div>
            </div>


            <div class="cb-charakter d-none" id="info-stats">
                <div class="cb-charakter-header">
                    <h4></h4>
                    <h4></h4>
                    <h4></h4>
                    <h4></h4>
                </div>

                <div class="cb-charakter-infos">
                    <h4>${currentPokemon['height']}</h4>
                    <h4>${currentPokemon['weight']}</h4>
                    <h4>${currentPokemon['types'][0]['type']['name']}, ${currentPokemon['types'][1]['type']['name']}</h4>
                    <h4>${currentPokemon['abilities'][0]['ability']['name']} / ${currentPokemon['abilities'][1]['ability']['name']}</h4>
                </div>
            </div>

            <div class="cb-buttons">
                <button>Last Card</button>
                <button>Next Card</button>
            </div>
        </div>
    </div>
`;
}
