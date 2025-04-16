const activeFilters = document.querySelector('#active-filters');
const filterButton = document.querySelectorAll('.filter-button');
const extensionList = document.querySelector('#extension-list');
const headerBar = document.querySelector('#header-bar');
const themeToggle = document.querySelector('#theme-toggle');
const siteLogo = document.querySelector('#site-logo');
const body = document.querySelector('body');

let theme = "light";
let selectedFilter = "all-filter";
let extensionsData = [];

loadData();

themeToggle.addEventListener("click", toggleTheme);

activeFilters.addEventListener("click", function(e) {
    if (e.target && e.target.matches('button')) {
        selectedFilter = e.target.id;
        filterButton.forEach(btn => btn.classList.remove("selected"));
        e.target.classList.add("selected");
        console.log(selectedFilter);
    }
});

function loadData() {
    const localData = localStorage.getItem('extensionsData');

    if (localData) {
        extensionsData = JSON.parse(localData);
        renderExtensions();
    } else {
        fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
        extensionsData = data;
        localStorage.setItem('extensionsData', JSON.stringify(data));
        renderExtensions(); 
    });
    }
}

function refreshData() {
    if (localStorage.getItem('extensionsData')) {
        extensionsData = localStorage.getItem('extensionsData');
    }
}

function toggleTheme () {
    if (body.classList.contains("dark")) {
        resetTheme();
        themeToggle.innerHTML = '<img src="./assets/images/icon-moon.svg" alt="light theme toggle">';
        siteLogo.innerHTML = '<img src="./assets/images/logo.svg" alt="extensions-logo">'
    } else {
        theme = "dark";
        body.classList.add("dark");
        themeToggle.innerHTML = '<img src="./assets/images/icon-sun.svg" alt="dark theme toggle">';
        siteLogo.innerHTML = '<img src="./assets/images/logo-dark.svg" alt="extensions-logo">'

    }   
}

function resetTheme () {
    theme = "light";
    body.classList.remove("dark");
}

function renderExtensions () {
    const html = extensionsData.map(item => {
        return `
        <div class="extension-card">
        <div class="card-header">
        <div class="card-logo">
        <img src="${item.logo}" alt="${item.name} logo">
        </div>
        <div class="card-text">
        <h3 class="card-title">${item.name}</h2>
        <p class="card-desc">${item.description}</p>
        </div>
        </div>
        <div class="card-footer">
        <button type="button" class="card-delete-button">Remove</button>
        <label class="switch">
        <input type="checkbox" ${item.isActive ? "checked" : ""}>
        <span class="slider round"></span>
        </label>
        </div>
        </div>
        `;
    }).join('');

    extensionList.innerHTML = html;
}