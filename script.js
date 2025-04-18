const activeFilters = document.querySelector('#active-filters');
const filterButton = document.querySelectorAll('.filter-button');
const extensionList = document.querySelector('#extension-list');
const headerBar = document.querySelector('#header-bar');
const themeToggle = document.querySelector('#theme-toggle');
const siteLogo = document.querySelector('#site-logo');
const resetDataBtn = document.querySelector('#reset-data');
const isActiveToggle = document.querySelector('#is-active-toggle');
const body = document.querySelector('body');

let theme = "light";
let selectedFilter = "all-filter";
let extensionsData = [];

// Initial data load
loadData();

// Event listeners for buttons and toggles
themeToggle.addEventListener("click", toggleTheme);
resetDataBtn.addEventListener("click", resetData);

activeFilters.addEventListener("click", function(e) {
    if (e.target && e.target.matches('button')) {
        selectedFilter = e.target.id;
        filterButton.forEach(btn => btn.classList.remove("selected"));
        e.target.classList.add("selected");
        console.log(selectedFilter);
        handleFilter(selectedFilter);
    }
});

extensionList.addEventListener("click", function(e) {
    if (e.target && e.target.matches('.card-delete-button')) {
        const selectedCard = e.target.closest('.extension-card');
        const extName = selectedCard.querySelector('.card-title').textContent;
        const indexToDelete = extensionsData.findIndex((ext) => ext.name === extName);
        let newExtensionsData = extensionsData.filter((ext, index) => index !== indexToDelete);
        extensionsData = newExtensionsData;
        localStorage.setItem('extensionsData', JSON.stringify(newExtensionsData));
        handleFilter(selectedFilter);
    } else if (e.target && e.target.matches('.is-active-toggle')) {
        const selectedCard = e.target.closest('.extension-card');
        const extName = selectedCard.querySelector('.card-title').textContent;
        const indexToToggle = extensionsData.findIndex((ext) => ext.name === extName);
        extensionsData[indexToToggle].isActive = !extensionsData[indexToToggle].isActive;
        localStorage.setItem('extensionsData', JSON.stringify(extensionsData));
        handleFilter(selectedFilter);
    }
});

// ===== Functions =====

// Load data from local storage or fetch from file if not present in local storage
function loadData() {
    const localData = localStorage.getItem('extensionsData');

    if (localData) {
        extensionsData = JSON.parse(localData);
        renderExtensions(extensionsData);
    } else {
        fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
        extensionsData = data;
        localStorage.setItem('extensionsData', JSON.stringify(data));
        renderExtensions(extensionsData); 
    });
    }
}

// Handle filter toggles
function handleFilter(activeFilter) {
    let filteredExtensions;

    if (activeFilter === "all-filter") {
        filteredExtensions = extensionsData;
    } else if (activeFilter === "active-filter") {
        filteredExtensions = extensionsData.filter((ext) => ext.isActive === true); 
    } else {
        filteredExtensions = extensionsData.filter((ext) => ext.isActive === false);

    }
    selectedFilter = activeFilter;
    renderExtensions(filteredExtensions);
}

// Handle theme change
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

// Reset back to light theme
function resetTheme () {
    theme = "light";
    body.classList.remove("dark");
}

// Render extensions cards from extensionsData array
function renderExtensions (renderData) {
    const html = renderData.map(item => {
        return `
        <div class="extension-card">
        <div class="card-header">
        <div class="card-logo">
        <img src="${item.logo}" alt="${item.name} logo">
        </div>
        <div class="card-text">
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.description}</p>
        </div>
        </div>
        <div class="card-footer">
        <button type="button" class="card-delete-button">Remove</button>
        <label class="switch">
        <input class="is-active-toggle" type="checkbox" ${item.isActive ? "checked" : ""}>
        <span class="slider round"></span>
        </label>
        </div>
        </div>
        `;
    }).join('');

    extensionList.innerHTML = html;
}

// Reset data for ease of testing and fetch sample data from file
function resetData () {
    const localStorageData = localStorage.getItem('extensionsData');

    if(localStorageData) {
        localStorage.removeItem('extensionsData');
        fetch('./data.json')
    .then((res) => res.json())
    .then((data) => {
        extensionsData = data;
        localStorage.setItem('extensionsData', JSON.stringify(data));
        selectedFilter = "all-filter";
        renderExtensions(extensionsData);
        handleFilter(selectedFilter);
    });

    }
}