let pokeDeck = 20;

let pokeCards;
let pokeCardsSpecies;
let pokeCardsDamage;
let pokeCardsEvolves;

let urlDamage;
let urlEvolution;

let evolutionNameArray = [];
let evolutionPicsArray = [];
let pokeId;
let pokeName;
let minNum = 0;
let newPokeID = 0;

// ============== API ==============

async function loadPoceJson() {
    let responseJson = await fetch('./json/poke.json');
    pokeJson = await responseJson.json();
}


async function loadPokeApi(i) {

    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    pokeCards = await response.json();

    urlDamage = pokeCards.types[0].type.url;

    let url2 = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
    let responseSpecies = await fetch(url2);
    pokeCardsSpecies = await responseSpecies.json();

    urlEvolution = pokeCardsSpecies.evolution_chain.url;
}


async function loadDamagePokeApi() {
    let responseSpecies = await fetch(urlDamage);
    pokeCardsDamage = await responseSpecies.json();
}


async function loadEvolutionPokeApi() {
    let responseSpecies = await fetch(urlEvolution);
    pokeCardsEvolves = await responseSpecies.json();
}

// ============== render Poke Deck ==============

async function renderPokeDeck() {
    for (let i = minNum; i < pokeDeck; i++) {
        await loadPokeApi(i);

        addPokeZero();
        missingPicture();

        document.getElementById('cardDeck').innerHTML += returnRenderPokeDeck(i);

        if (pokeCards.types.length > 1) { typeMainDeck(i); } // query Is Existing
    }
}


function addPokeZero() {
    newPokeID = pokeCards.id;
    if (pokeCards.id.toString().length == 1) { newPokeID = '00' + newPokeID.toString() };
    if (pokeCards.id.toString().length == 2) { newPokeID = '0' + pokeCards.id.toString() };
}


let alternateImage;

function missingPicture() {
    alternateImage = pokeCards.sprites.other.dream_world.front_default;
    let picturePvg = pokeCards.sprites.other['official-artwork'].front_default;

    if (!alternateImage) {
        alternateImage = picturePvg;
    }
}


function returnRenderPokeDeck(i) {
    return `
            <div class="pokeContainerDeck ${pokeCardsSpecies.color.name}" style="border: 1px solid ${pokeCardsSpecies.color.name}" onclick="showPokoCard(${i})">
                <div class="pokeHeadDeck">
                    <div class="pokeTitleDeck">
                        <h3 class="color_${pokeCardsSpecies.color.name}">${pokeCardsSpecies.names[8].name}</h3>
                        <span>${pokeCardsSpecies.genera[7].genus}</span>
                    </div>
                    <h2 class="pokeIdDeck color_${pokeCardsSpecies.color.name}">#${newPokeID}</h2>
                </div>
                <div class="pokeImgContainer">
                    <div class="typeMainDeck" id="typeMainDeck_${i}">
                        <div><img class="typeImg" src="./img/${pokeCards.types[0].type.name}.svg"></div>
                        
                    </div>
                    <img class="pokeImgDeck" src="${alternateImage}">
                </div>
            </div>
            `
}


function typeMainDeck(i) {
    document.getElementById('typeMainDeck_' + i).innerHTML +=
        `
    <div><img class="typeImg" src="./img/${pokeCards.types[1].type.name}.svg"></div>
    `;
}

// ============== render Poke Card ==============

async function renderPokeCard(i) {
    await loadPokeApi(i);

    addPokeZero();
    missingPicture();

    document.getElementById('card').innerHTML = returnCardBox(i);

    if (i == 0) { document.getElementById('returnPoco').style.display = ('none'); }
    if (i == 899) { document.getElementById('nextPoco').style.display = ('none'); }
    if (pokeCards.types.length > 1) { typeMain(i); }
    baseStatsPoke(i);
    developmentsPoke(i);
    damagePoke(i);
}


function returnCardBox(i) {
    let color = pokeCardsSpecies.color.name;
    if (color == 'yellow') { color = '#505011' };
    if (color == 'white') { color = '#595959' };
    if (color == 'pink') { color = '#783c46' };

    return `
            <div class="box">
                <div class="arrowleft"><img id="returnPoco" onclick="nextCardofPoke(0,${i})" src="./img/arrowLeftRight.svg"></div>
                <div class="arrowRight"><img id="nextPoco" onclick="nextCardofPoke(1,${i})" src="./img/arrowLeftRight.svg"></div>
                <img class="closeCardofPoke" onclick="closePokoCard()" src="./img/close.svg">
            </div>

            <div class="pokeCardContainer cardOverflow ${pokeCardsSpecies.color.name}" style="border: 1px solid ${pokeCardsSpecies.color.name}" id="pokeContainer">
            
                <div class="headerNavitagion ${pokeCardsSpecies.color.name}">
                    <div style="box-shadow: 0px 0px 2px 0px ${color}" onclick="renderDescription(${i})" class="first">Description</div>
                    <div style="box-shadow: 0px 0px 2px 0px ${color}" onclick="renderBaseStats(${i})" class="second">BaseStats</div>
                    <div style="box-shadow: 0px 0px 2px 0px ${color}" onclick="renderDevelopments(${i})" class="third">Developments</div>
                    <div style="box-shadow: 0px 0px 2px 0px ${color}" onclick="renderCapabilities(${i})" class="fourth">Capabilities</div>
                </div>

                <div class="description" id="description_${i}">
                    <div class="pokeHeader" id="pokeHeader_${i}">
                        <div class="pokeHead">
                            <div class="pokeTitle" style="box-shadow: 0px 0px 2px 0px ${color}">
                                <h3 class="color_${pokeCardsSpecies.color.name}">${pokeCardsSpecies.names[8].name}</h3>
                                <span>${pokeCardsSpecies.genera[7].genus}</span>
                            </div>
                            <h2 class="pokeID color_${pokeCardsSpecies.color.name}">#${newPokeID}</h2>
                        </div>
                        <img class="pokeImg" src="${alternateImage}">
                    </div>
                    <div class="descriptionPoke" id="descriptionPoke_${i}"
                        style="box-shadow: 0px 0px 2px 0px ${color}">
                        <h4>Flavor</h4>
                        <p>${pokeCardsSpecies.flavor_text_entries[6].flavor_text}"</p>
                    </div>
                    <div class="pokeBodyMass" id="pokeBodyMass_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                        <div class="pokeHeight">
                            <h4>Height</h4>
                            <h5>${pokeCards.height / 10} m</h5>
                        </div>
                        <div class="pokeWeight">
                            <h4>Weight</h4>
                            <h5>${pokeCards.weight / 10} kg</h5>
                        </div>
                    </div>
                </div>

                <div class="baseStatsPoke" id="baseStatsPoke_${i}" id="baseStatsPoke_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                    <h4>Base Stats</h4>
                </div>
                
                <div class="developments" id="developments_${i}">
                    <div class="pokeDevelopments" id="pokeDevelopments_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                    <h4>Developments</h4>
                        <div class="developmentsImg" id="developmentsPoke_${i}">

                        </div>
                    </div>  
                    <div class="pokeBreeding" id="pokeBreeding_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                        <h4>Breeding</h4>
                        <div class="breedingContainer">
                            <div class="breedingMain">
                                <h4>Egg Groups</h4>
                                <h5>${pokeCardsSpecies.egg_groups[0].name} and ${pokeCards.types[0].type.name}</h5>
                            </div>
                            <div class="hatchTimeMain">
                                <h4><nobr>Hatch time</nobr></h4>
                                <h5>${pokeCards.types[0].type.name}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="capabilities" id="capabilities_${i}">
                    <div class="pokeType" id="pokeType_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                        <h4>Type</h4>
                        <div class="typeMain" id="typeMain_${i}">
                            <div class="${pokeCards.types[0].type.name}" style="box-shadow: 0px 0px 2px 0px #000000"><img class="typeImg" src="./img/${pokeCards.types[0].type.name}.svg">${pokeCards.types[0].type.name}</div>
                        </div>
                    </div>
                    <div class="pokeStrength" id="pokeStrength_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                        <h4>Strength</h4>
                        <div class="damageContainer" id="pokeStrength"></div>

                    </div>
                    <div class="pokeWeakness" id="pokeWeakness_${i}" style="box-shadow: 0px 0px 2px 0px ${color}">
                        <h4>Weakness</h4>
                        <div class="damageContainer" id="pokeWeakness"></div>

                    </div>
                </div>

            </div>
            `;
}


function typeMain(i) {
    document.getElementById('typeMain_' + i).innerHTML +=
        `
        <div class="${pokeCards.types[1].type.name}" style="box-shadow: 0px 0px 2px 0px #000000"><img class="typeImg" src="./img/${pokeCards.types[1].type.name}.svg">${pokeCards.types[1].type.name}</div>
        `;
}


function baseStatsPoke(iNr) {
    for (let i = 0; i < 6; i++) {
        let pokeStat;
        if (pokeCards.stats[i].base_stat > 100) { pokeStat = 100 }
        else { pokeStat = pokeCards.stats[i].base_stat }

        document.getElementById('baseStatsPoke_' + iNr).innerHTML +=
            `
            <div class="statsContainer">
                <h4>${pokeCards.stats[i].stat.name}</h4>
                <h5>${pokeCards.stats[i].base_stat}</h5>
                <div class="progressContainer">
                    <div class="progressIndicator" style="width: ${pokeStat}%; background-color: ${pokeCardsSpecies.color.name};"></div>
                </div>
            </div>
            `;
    }
}


function renderDescription(i) {
    document.getElementById('description_' + i).style.display = 'flex';
    toggleNone('baseStatsPoke_' + i);
    toggleNone('developments_' + i);
    toggleNone('capabilities_' + i);
}


function renderBaseStats(i) {
    document.getElementById('baseStatsPoke_' + i).style.display = 'flex';
    toggleNone('description_' + i);
    toggleNone('developments_' + i);
    toggleNone('capabilities_' + i);
}


function renderDevelopments(i) {
    document.getElementById('developments_' + i).style.display = 'flex';
    toggleNone('description_' + i);
    toggleNone('baseStatsPoke_' + i);
    toggleNone('capabilities_' + i);
}


function renderCapabilities(i) {
    document.getElementById('capabilities_' + i).style.display = 'flex';
    toggleNone('developments_' + i);
    toggleNone('description_' + i);
    toggleNone('baseStatsPoke_' + i);
}


function toggleNone(name) {
    document.getElementById(name).style.display = 'none';
}

// ============== developments Poke ==============

async function developmentsPoke(idNr) {
    await loadEvolutionPokeApi(idNr);
    evolutionNameArray = [];
    evolutionPicsArray = [];

    if (pokeCardsEvolves.chain) {
        pokeName = pokeCards.name;
        evolutionNameArray.push(pokeCardsEvolves.chain.species.name);
        evolutionPicsArray.push(idNr);

        if (pokeCardsEvolves.chain.evolves_to[0]) {
            evolutionNameArray.push(pokeCardsEvolves.chain.evolves_to[0].species.name);
            evolutionPicsArray.push(idNr + 1);

            if (pokeCardsEvolves.chain.evolves_to[0].evolves_to[0]) {
                evolutionNameArray.push(pokeCardsEvolves.chain.evolves_to[0].evolves_to[0].species.name);
                evolutionPicsArray.push(idNr + 2);
            }
        }
    }

    sortEvolutionPoke(idNr);
}


function sortEvolutionPoke(idNr) {
    let index = evolutionNameArray.indexOf(pokeName);
    pokeId = idNr;

    if (index == 0) { evolutionPicsArray = [pokeId++, pokeId++, pokeId++] };
    if (index == 1) { evolutionPicsArray = [pokeId -= 1, pokeId += 1, pokeId += 1] };
    if (index == 2) { evolutionPicsArray = [pokeId -= 2, pokeId += 1, pokeId += 1] };

    pushEvolutionPoke(idNr);
}


async function pushEvolutionPoke(idNr) {

    for (let i = 0; i < evolutionNameArray.length; i++) {
        await loadPokeApi(evolutionPicsArray[i]);
        missingPicture();

        let color = pokeCardsSpecies.color.name;
        if (color == 'yellow') { color = '#505011' };
        if (color == 'white') { color = '#595959' };
        if (color == 'pink') { color = '#783c46' };

        document.getElementById('developmentsPoke_' + idNr).innerHTML += renderEvolutionPoke(i, color);
    }
}


function renderEvolutionPoke(i, color) {
    return `
            <div class="pokoChain" style="box-shadow: 0px 0px 2px 0px ${color};">
                <img src="${alternateImage}">
                <h5>${evolutionNameArray[i]}</h5>
            </div>
            `;
}

// ============== damage of Poke  ==============

let damageStrength = 'pokeStrength';
let damageWeakness = 'pokeWeakness';

async function damagePoke(idNr) {
    await loadDamagePokeApi(idNr);
    let damageFrom = pokeCardsDamage.damage_relations.double_damage_from;
    let damageTo = pokeCardsDamage.damage_relations.double_damage_to;

    renderDamage(damageFrom, damageStrength);
    renderDamage(damageTo, damageWeakness);
}


function renderDamage(damage, idName) {

    for (let i = 0; i < damage.length; i++) {

        document.getElementById(idName).innerHTML +=
            `
                <div class="damageBox ${damage[i].name}" style="box-shadow: 0px 0px 2px 0px #000000">
                    <img class="typeImg" src="./img/${damage[i].name}.svg">
                    <h5>${damage[i].name}</h5>
                </div>
            `;
    }
}

// ============== show and close Poke Cards ==============

let cardBoolen = false;

function showPokoCard(i) {
    renderPokeCard(i)
    document.getElementById('body').classList.add('overflow')
    document.getElementById('card').style.zIndex = ('1');
    document.getElementById('card').classList.remove('d-none')
    cardBoolen = true;
}


function closePokoCard() {
    document.getElementById('pokeContainer').innerHTML = ('');
    document.getElementById('body').classList.remove('overflow')
    document.getElementById('card').style.zIndex = ('0');
    document.getElementById('card').classList.add('d-none')
    closeSearch();
    cardBoolen = false;
}

// ============== next Poke Cards ==============

function nextCardofPoke(id, i) {
    if (id == 0) {
        closePokoCard();
        showPokoCard(i - 1);
    }
    if (id == 1) {
        closePokoCard();
        showPokoCard(i + 1);
    }
}

// ============== add 20 Poke Cards ==============

function morePokeCards() {
    minNum = pokeDeck;
    pokeDeck += 20;
    renderPokeDeck();
}