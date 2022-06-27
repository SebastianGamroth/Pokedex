// ============== navigation menu ==============

let navBarBoolen = false;

function navBar() {
    if (!navBarBoolen) { document.getElementById('body').classList.add('overflow'); }
    if (navBarBoolen && !cardBoolen) { document.getElementById('body').classList.remove('overflow'); }

    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');

    document.getElementById('pageLaws').classList.toggle('d-none');
    toggleRegulations('imprint', 'privacy', 'copyright');

    navBarBoolen = !navBarBoolen;
}


function backNavBar() {
    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');
}


function back() {
    navBarBoolen = !navBarBoolen;
    document.getElementById('body').classList.remove('overflow');
    document.getElementById('pageLaws').classList.toggle('d-none');
    document.getElementById('backNavBar').classList.add('d-none');
    document.getElementById('back').classList.add('d-none');
    toggleRegulations('imprint', 'privacy', 'copyright');
}

// ============== jump top - more Poke ==============

function arrowUp() {
    window.scrollTo(0, 0);
}


window.onscroll = function () {
    if (window.scrollY < 120) {
        document.getElementById('arrowUp').style.display = 'none';
    }

    if (window.scrollY > 120) {
        document.getElementById('arrowUp').style.display = 'flex';;
    }
}


function moreByScroll() {
    window.onscroll = function () {
        let index = window.scrollY + window.innerHeight + 0.34;

        if (index >= document.body.clientHeight) {
            morePokeCards();
        }
    }
}


// function morePokeCards() {
//     minNum = pokeDeck;
//     pokeDeck += 20;
//     renderPokeDeck();
// }

// ============== page Laws ==============

function imprint() {
    regulationShow('imprint');
    toggleRegulations('privacy', 'copyright');
}


function privacy() {
    regulationShow('privacy');
    toggleRegulations('imprint', 'copyright');
}


function copyright() {
    regulationShow('copyright');
    toggleRegulations('imprint', 'privacy');
}


function regulationShow(index) {
    window.scrollTo(0, 0);
    document.getElementById(index).classList.remove('d-none');
    hideMenu();
}


function toggleRegulations(first, second, third) {
    document.getElementById(first).classList.add('d-none');
    document.getElementById(second).classList.add('d-none');
    if (third == 'copyright') { document.getElementById(third).classList.add('d-none'); }
}


function hideMenu() {
    document.getElementById('back').classList.remove('d-none');
    document.getElementById('backNavBar').classList.remove('d-none');
    document.getElementById('menu').classList.toggle('d-none');
    document.getElementById('barImg').classList.toggle('barImg');
}