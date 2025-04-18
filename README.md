# Frontend Mentor - Browser Extensions Manager UI Solution

This is a solution to the [Browser Extensions Manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

The goal of this project is to build a browser extension manager UI that allows users to:

- Toggle extensions between active and inactive states
- Filter extensions by their status (active or inactive)
- Remove extensions from the list
- Select a color theme
- View the layout optimized for different screen sizes (responsive design)
- See hover and focus states for all interactive elements

### Links

- Solution URL: [Interactive browser extension manager](https://www.frontendmentor.io/solutions/interactive-browser-extension-manager-htmlcssjs-9B5D-OdmJf)

## My process

### Built with

- HTML5 for semantic structure
- CSS (Flexbox, Grid) for layout
- JavaScript for interactive functionality

### What I learned

During this project, I learned how to:

- Implement dynamic features like toggling states and filtering lists.
- Make the layout responsive using Flexbox and CSS Grid.
- Use JavaScript to handle user interactions and DOM manipulation.

Here's a code snippet I’m particularly proud of:

```js
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
```