let letterArray = [[[], []], [[], []], [[], []], [[], []], [[], []]];
let letterFinish = false;

async function searchPoke() {
    let search = document.getElementById('searchPoke').value;
    search = search.toLowerCase();

    document.getElementById('searchPoke').disabled = true;

    await enterSearch(search);
}

async function enterSearch(search) {
    await loadPoceJson();

    let list = document.getElementById('outputSearchPoke');
    list.innerHTML = '';

    if (search.length == 0) {
        letterArray = [[[], []], [[], []], [[], []], [[], []], [[], []]];
        document.getElementById('searchPoke').disabled = false;
        document.getElementById('searchPoke').focus(); XMLDocument
    }

    if (search.length == 1) { await ifSearchOne(search); }

    if (search.length == 2) { letterArray[1] = [[], []]; searchPokeLetter(search, 1, 0, 1); }

    if (search.length == 3) { letterArray[2] = [[], []]; searchPokeLetter(search, 2, 1, 2); }

    if (search.length == 4) { letterArray[3] = [[], []]; searchPokeLetter(search, 3, 2, 3); }

    if (search.length == 5) { letterFinish = false; letterArray[4] = [[], []]; searchPokeLetter(search, 4, 3, 4); }

    if (search.length > 5) { letterFinish = true; searchPokeLetter(search, 4, 3, 4); }
}

async function ifSearchOne(search) {
    letterArray = [[[], []], [[], []], [[], []], [[], []], [[], []]];

    for (let i = 0; i < pokeJson[0].length; i++) {
        let currentPoke = pokeJson[2][i];

        if (pokeJson[2][i].toLowerCase().charAt(0).includes(search[0]) && search.length == 1) {
            letterArray[0][0].push(i + 1);
            letterArray[0][1].push(currentPoke);
        }

        if (search.length < 0) {
            document.getElementById('outputSearchPoke').innerHTML = '';
            document.getElementById('searchPoke').value = '';
        }
    };

    await outputRenderSearch(0, 0);
}

async function searchPokeLetter(search, letterPos, arrayGet, arrayPush) {

    for (let i = 0; i < letterArray[arrayGet][1].length; i++) {
        let currentPokeNumber = letterArray[arrayGet][0][i]
        let currentPoke = letterArray[arrayGet][1][i];

        if (letterFinish == true) {
            if (letterArray[arrayGet][1][i].toLowerCase().includes(search)) {

                letterArray[arrayPush][0] = [];
                letterArray[arrayPush][1] = [];
                letterArray[arrayPush][0].push(currentPokeNumber);
                letterArray[arrayPush][1].push(currentPoke)
            }
        } else {
            if (letterArray[arrayGet][1][i].toLowerCase().charAt(letterPos).includes(search[letterPos])) {

                letterArray[arrayPush][0].push(currentPokeNumber);
                letterArray[arrayPush][1].push(currentPoke)
            }
        }
    }
    await outputRenderSearch(arrayPush, 0);
}

let addZero = 0;

async function outputRenderSearch(firstArray, secondArray) {
    let list = document.getElementById('outputSearchPoke');
    list.innerHTML = '';

    for (let i = 0; i < letterArray[firstArray][secondArray].length; i++) {
        let idNum = letterArray[firstArray][secondArray][i];
        let idNumColor = pokeJson[1][idNum - 1];

        loadAddZero(idNum);

        list.innerHTML += renderOutputSearch(idNum, idNumColor, letterArray[firstArray][1][i]);
    }

    document.getElementById('searchPoke').disabled = false;
    document.getElementById('searchPoke').focus(); XMLDocument
}

function renderOutputSearch(idNum, idNumColor, array) {
    return `
            <ul onclick="showPokoCard(${idNum - 1})">
                <a onclick="closeSearch()" class="color_${idNumColor}" href="#">${array}</a>    
                <a onclick="closeSearch()" class="color_${idNumColor}" href="#">#${addZero}</a>
            </ul>
        `;
}

function loadAddZero(idNum) {
    addZero = idNum;
    if (idNum.toString().length == 1) { addZero = '00' + addZero.toString() };
    if (idNum.toString().length == 2) { addZero = '0' + idNum.toString() };
}

function closeSearch() {
    document.getElementById('outputSearchPoke').innerHTML = '';
    document.getElementById('searchPoke').value = '';
}