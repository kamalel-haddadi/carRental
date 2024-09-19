"use strict";

// modal variables
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

// modal function
const modalCloseFunc = function () {
    modal.classList.add("closed");
};

// modal eventListener
modalCloseOverlay.addEventListener("click", modalCloseFunc);
modalCloseBtn.addEventListener("click", modalCloseFunc);

// notification toast variables
const notificationToast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

// notification toast eventListener
toastCloseBtn.addEventListener("click", function () {
    notificationToast.classList.add("closed");
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll(
    "[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
    "[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
    // mobile menu function
    const mobileMenuCloseFunc = function () {
        mobileMenu[i].classList.remove("active");
        overlay.classList.remove("active");
    };

    mobileMenuOpenBtn[i].addEventListener("click", function () {
        mobileMenu[i].classList.add("active");
        overlay.classList.add("active");
    });

    mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
    overlay.addEventListener("click", mobileMenuCloseFunc);
}

// accordion variables
const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");

for (let i = 0; i < accordionBtn.length; i++) {
    accordionBtn[i].addEventListener("click", function () {
        const clickedBtn = this.nextElementSibling.classList.contains("active");

        for (let i = 0; i < accordion.length; i++) {
            if (clickedBtn) break;

            if (accordion[i].classList.contains("active")) {
                accordion[i].classList.remove("active");
                accordionBtn[i].classList.remove("active");
            }
        }

        this.nextElementSibling.classList.toggle("active");
        this.classList.toggle("active");
    });
}

// Get the modal
var modalWish = document.getElementById("Wishlist-Mdales");
var btn = document.getElementById("whishlistBtn");
var span = document.getElementsByClassName("closeWhishlist")[0];
btn.onclick = function () {
    modalWish.style.display = "block";
};
span.onclick = function () {
    modalWish.style.display = "none";
};
window.onclick = function (event) {
    if (event.target == modalWish) {
        modalWish.style.display = "none";
    }
};


// Fetch listing data
let listing = null;
fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        listing = data;
        addDataToHTML(listing); // Initial load
    });

// Add data to HTML
function addDataToHTML(filteredListing) {
    let listingProduct = document.querySelector(".product-grid");
    listingProduct.innerHTML = ""; // Clear previous listings

    filteredListing.forEach((listing) => {
        // Remove the 'src/main/resources/static/' part from image paths
        let image1Path = listing.image1.substring('src/main/resources/static/'.length);
        let image2Path = listing.image2.substring('src/main/resources/static/'.length);

        // Create new Element items
        let newListings = document.createElement("a");
        newListings.href = "./listings?id=" + listing.id;
        newListings.dataset.id = listing.id;
        newListings.classList.add("showcase");
        newListings.innerHTML = `
      <div class="showcase-banner">
        <img
          src="${image1Path}"
          alt="${listing.description}"
          width="300px"
          class="product-img default"
          height="300px"
        />
        <img
          src="${image2Path}"
          alt="${listing.description}"
          width="300px"
          class="product-img hover"
          height="300px"
        />
        <p class="showcase-badge">${listing.typeBien}</p>
        <div class="showcase-actions">
          <button class="btn-action">
            <ion-icon name="heart-outline" class="btn-actionT"></ion-icon>
          </button>
          <button class="btn-action">
            <ion-icon name="eye-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div class="showcase-content">
        <a href="#" class="showcase-category">${listing.ville}</a>
        <a href="#">
          <h3 class="showcase-title">${listing.adresse}</h3>
        </a>
        <div class="showcase-rating">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star-outline"></ion-icon>
          <ion-icon name="star-outline"></ion-icon>
        </div>
        <div class="price-box">
          <p class="price">$${listing.prix}</p>
        </div>
      </div>
    `;
        listingProduct.appendChild(newListings);
    });
}

// Filter button event listener
document.getElementById("filterButton").addEventListener("click", function () {
    const priceMin = document.getElementById("priceMin").value;
    const priceMax = document.getElementById("priceMax").value;
    const location = document.getElementById("location").value.toLowerCase();
    const propertyType = document.getElementById("propertyType").value;

    // Filter logic
    const filteredListing = listing.filter(item => {
        const meetsPriceCriteria =
            (!priceMin || item.prix >= priceMin) &&
            (!priceMax || item.prix <= priceMax);
        const meetsLocationCriteria =
            !location || item.ville.toLowerCase().includes(location);
        const meetsPropertyTypeCriteria =
            !propertyType || item.typeBien === propertyType;

        return meetsPriceCriteria && meetsLocationCriteria && meetsPropertyTypeCriteria;
    });

    addDataToHTML(filteredListing);
    });
    // Reset button event listener
    document.getElementById("resetButton").addEventListener("click", function () {
    // Clear filter inputs
    document.getElementById("filterForm").reset();

    // Show all listings
    addDataToHTML(listing);
});







