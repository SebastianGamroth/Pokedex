let letterFinish = false;

let nameNew;
let idNew;
let addZero = 0;

let array0 = [[], [], [], []];


function searchPoke() {
    let search = document.getElementById('searchPoke').value;
    search = search.toLowerCase();

    newSearch3(search);
}

// ============== serach 1 ==============

function newSearch(search) {

    let list = document.getElementById('outputSearchPoke');
    list.innerHTML = '';

    if (search.length == 0) {
        document.getElementById('outputSearchPoke').innerHTML = '';
        document.getElementById('searchPoke').value = '';

        document.getElementById('searchPoke').disabled = false;
        document.getElementById('searchPoke').focus(); XMLDocument
    }

    if (search.length == 1) { array0 = [[], [], [], []]; renderSearch_1(search); }
    if (search.length == 2) { array0[1] = []; renderSearch_2(search, 0, 1); }
    if (search.length == 3) { letterFinish = false; array0[2] = []; renderSearch_2(search, 1, 2); }
    if (search.length >= 4) { letterFinish = true; array0[3] = []; renderSearch_2(search, 2, 3); }
}


function renderSearch_1(search) {

    for (let i = 0; i < pokeArray[1].length; i++) {
        let currentPoke = pokeArray[1][i];

        if (currentPoke.toLowerCase().charAt(0).includes(search[0])) {
            array0[0].push(currentPoke);
        }
    };
    renderHtml(0);
}


function renderSearch_2(search, from, to) {

    for (let i = 0; i < array0[from].length; i++) {
        let currentPoke = array0[from][i];

        if (letterFinish) {

            if (currentPoke.toLowerCase().includes(search)) {
                array0[to].push(currentPoke);
            }

        } else {

            if (currentPoke.toLowerCase().charAt(to).includes(search[to])) {
                array0[to].push(currentPoke);
            }
        }
    };
    renderHtml(to);
}


function renderHtml(pos) {
    let list = document.getElementById('outputSearchPoke');

    for (let i = 0; i < array0[pos].length; i++) {
        const currentPoke = array0[pos][i];

        idNew = pokeArray[1].indexOf(currentPoke);
        nameNew = currentPoke;

        loadAddZero(idNew + 1);

        list.innerHTML += exportRenderHtml();
    }
}


function exportRenderHtml() {
    return `
            <ul onclick="showPokoCard(${idNew})">
                <a onclick="closeSearch()" class="color_g" href="#">${nameNew}</a>    
                <a onclick="closeSearch()" class="color_g}" href="#">#${addZero}</a>
            </ul>
            `;
}

// ============== serach 2 ==============


function newSearch2(search) {

    let list = document.getElementById('outputSearchPoke');
    list.innerHTML = '';

    if (search.length > 0) {
        pokeArray[1].forEach(element => {
            let currentPoke = element.toLowerCase().includes(search);

            if (currentPoke) {
                idNew = pokeArray[1].indexOf(element);
                nameNew = element;

                loadAddZero(idNew + 1);
                list.innerHTML += `
                         <ul onclick="showPokoCard(${idNew})">
                             <a onclick="closeSearch()" class="color_g" href="#">${nameNew}</a>    
                             <a onclick="closeSearch()" class="color_g}" href="#">#${addZero}</a>
                         </ul>
                     `;

            };
        });
    }
    if (search.length <= 0) {
        document.getElementById('outputSearchPoke').innerHTML = '';
        document.getElementById('searchPoke').value = '';
    }
}

// ============== serach 3 ==============

function newSearch3(search) {

    let list = document.getElementById('outputSearchPoke');
    list.innerHTML = '';

    for (let i = 0; i < pokeArray[0].length; i++) {
        let currentPoke = pokeArray[1][i];

        if (currentPoke.toLowerCase().includes(search) && search.length > 0) {
            idNew = pokeArray[1].indexOf(currentPoke);
            nameNew = currentPoke;

            loadAddZero(idNew + 1);
            list.innerHTML += `
            <ul onclick="showPokoCard(${idNew})">
                <a onclick="closeSearch()" class="color_g" href="#">${nameNew}</a>    
                <a onclick="closeSearch()" class="color_g}" href="#">#${addZero}</a>
            </ul>
        `;
        }

        if (search.length < 0) {
            document.getElementById('outputSearchPoke').innerHTML = '';
            document.getElementById('searchPoke').value = '';
        }
    };
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