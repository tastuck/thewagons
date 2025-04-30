let stages = [];
let currentIndex = 0;
const favoriteBtn = document.getElementById('favoriteBtn');
const favLink = document.getElementById('favLink');
const logoutBtn = document.getElementById('logout');
const loginForm = document.getElementById('loginForm');

function setLoggedInState() {
    localStorage.setItem('loggedIn', 'true');
    favLink.style.display = 'block';
    logoutBtn.style.display = 'block';
    loginForm.style.display = 'none';
    updateFavoriteButton();
}

function setLoggedOutState() {
    localStorage.removeItem('loggedIn');
    favLink.style.display = 'none';
    logoutBtn.style.display = 'none';
    loginForm.style.display = 'block';
    favoriteBtn.style.display = 'none';
}

function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
}

function updateFavoriteButton() {
    if (isLoggedIn()) {
        favoriteBtn.style.display = 'inline-block';
        // Here you could check if this stage is already favorited
        favoriteBtn.textContent = 'Add to Favorites';
    } else {
        favoriteBtn.style.display = 'none';
    }
}

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    setLoggedInState();
});

logoutBtn.addEventListener('click', () => {
    setLoggedOutState();
});

favoriteBtn.addEventListener('click', () => {
    // toggle favorite state (you could persist per-stage favorites here)
    favoriteBtn.textContent = favoriteBtn.textContent.includes('Add')
        ? 'Remove from Favorites'
        : 'Add to Favorites';
});

function getFestival() {
    fetch('festivals.json')
        .then(r => {
            if (!r.ok) throw new Error('Network error');
            return r.json();
        })
        .then(data => {
            const fest = data.find(f => f.festival === 'Camp Flog Gnaw 2014');
            if (!fest) {
                document.getElementById('festivalName').textContent = 'Festival not found';
                return;
            }
            stages = fest.stages;
            if (!isLoggedIn()) setLoggedOutState();
            showStage();
        })
        .catch(console.error);
}

function showStage() {
    const stage = stages[currentIndex];
    const cont = document.getElementById('stageContainer');
    cont.innerHTML = `
    <h2>${stage.name}</h2>
    ${stage.img.map(src => `<img src="${src}" alt="${stage.name}">`).join('')}
  `;
    updateFavoriteButton();
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    showStage();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < stages.length - 1) currentIndex++;
    showStage();
});

getFestival();
