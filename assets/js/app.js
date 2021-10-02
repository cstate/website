'use strict';

// Toggle Menu

function toggleMenu() {
  document.querySelector('.nav__mobile').classList.toggle('hidden')
  document.querySelector('.nav__mobile-background').classList.toggle('hidden')
  document.querySelector('.nav__menu--open').classList.toggle('hidden')
  document.querySelector('.nav__menu--close').classList.toggle('hidden')
  document.querySelector('html').classList.toggle('mobile-menu-open')
}

function toggleMenu() {
  document.querySelector('.nav__mobile').classList.toggle('hidden')
  document.querySelector('.nav__mobile-background').classList.toggle('hidden')
  document.querySelector('.nav__menu--open').classList.toggle('hidden')
  document.querySelector('.nav__menu--close').classList.toggle('hidden')
  document.querySelector('html').classList.toggle('mobile-menu-open')
} 

// Dropdown

function toggleDropdown(thing) {
  thing.parentNode.querySelector('.dropdown-content').classList.toggle('hidden')
  thing.parentNode.querySelector('.dropdown-background').classList.toggle('hidden')
}