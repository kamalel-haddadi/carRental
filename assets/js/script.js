'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * the form workin here
 */







/**
 * Fetch the car listings data using JSOM
 */

let listings = null; 
fetch('./assets/js/listings.json')
      .then(Response => Response.json())
      .then(data =>{
        listings = data;
        console.log(listings)
        addDataToHTML();
      });
// Add the data to the HTML
let listingCar = document.querySelector(".featured-car-list");
function addDataToHTML(){
  listings.forEach(listing => {
    let newListings = document.createElement('a');
    newListings.href = "/assets/pages/CarListings.html?id=" + listing.id;
    newListings.classList.add("showcase");
        newListings.innerHTML = ` 
        <li>
  <div class="featured-car-card">

    <figure class="card-banner">
      <img src="${listing.image1}" alt="${listing.name}" loading="lazy" width="440" height="300" class="w-100">
    </figure>

    <div class="card-content">

      <div class="card-title-wrapper">
        <h3 class="h3 card-title">
          <a href="#">${listing.name}</a>
        </h3>

        <data class="year" value="${listing.year}">${listing.year}</data>
      </div>

      <ul class="card-list">

        <li class="card-list-item">
          <ion-icon name="people-outline"></ion-icon>

          <span class="card-item-text">${listing.places}</span>
        </li>

        <li class="card-list-item">
          <ion-icon name="flash-outline"></ion-icon>

          <span class="card-item-text">${listing.TypeEnirgie}</span>
        </li>

        <li class="card-list-item">
          <ion-icon name="speedometer-outline"></ion-icon>

          <span class="card-item-text">${listing.kilomiterPerlitre}</span>
        </li>

        <li class="card-list-item">
          <ion-icon name="hardware-chip-outline"></ion-icon>

          <span class="card-item-text">${listing.type}</span>
        </li>

      </ul>

      <div class="card-price-wrapper">

        <p class="card-price">
          <strong>${listing.price} DH</strong> / Day
        </p>

        <button class="btn fav-btn" aria-label="Add to favourite list">
          <ion-icon name="heart-outline"></ion-icon>
        </button>
        <button class="btn">Rent now</button>
      </div>
    </div>
  </div>
</li>
        `
    listingCar.appendChild(newListings);
  });
}

// find this Car listings
let listingsD = null; 
fetch('./assets/js/listings.json')
      .then(Response => Response.json())
      .then(data =>{
        listingsD = data;
        console.log(listings)
        showDetail();
      });
      function showDetail(){
        let detail = document.querySelector('.left-column');
        let CarID = new URLSearchParams(window.location.search).get('id');
        let thisCar = listingsD.filter(value =>{
          return value.id == CarID
        })[0];

      }
