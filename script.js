const activeFilters = document.querySelector('#active-filters');
const filterButton = document.querySelectorAll('.filter-button');
const extensionList = document.querySelector('#extension-list');
const headerBar = document.querySelector('#header-bar');

let theme;
let selectedFilter = "all-filter";
let extensions = [];

activeFilters.addEventListener("click", function(e) {
    if (e.target && e.target.matches('button')) {
        selectedFilter = e.target.id;
        filterButton.forEach(btn => btn.classList.remove("selected"));
        e.target.classList.add("selected");
        // handleFilterChange(e.target.id);
        console.log(selectedFilter);
    }
});

// function handleFilterChange (buttonId) {
//     filterButton.forEach(btn => btn.classList.remove("selected"));

// }