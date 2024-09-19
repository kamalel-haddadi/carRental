

// find this Car listings
let listing = null;

// get datas from file json
fetch("../js/listings.json")
    .then((response) => response.json())
    .then((data) => {
        listing = data;
        showDetail();
    })
    .catch((error) => {
        console.error("Error fetching listing data:", error);
        // Optionally redirect to an error page
        window.location.href = "/assets/pages/404error.html";
    });

// find the listings
function showDetail() {
    let listingID = new URLSearchParams(window.location.search).get("id");
    let Thislistings = listing.find((value) => value.id == listingID);

    // if no listing has id = listingID
    if (!Thislistings) {
        window.location.href = "/";
    } else {
        // Update main image
        document.querySelector('.main-image .image').src = Thislistings.image1;
        document.querySelector('.main-image .image').alt = Thislistings.name;

        // Update thumbnail images
        const thumbnails = document.querySelectorAll('.thumbnail img');
        thumbnails[0].src = Thislistings.image2;
        thumbnails[1].src = Thislistings.image3;
        thumbnails[2].src = Thislistings.image4;

        // Update car details
        document.querySelector('.car-info .name').textContent = Thislistings.name;
        document.querySelector('#total-price').textContent = `$${Thislistings.price}.00`;

        // Update additional details
        const detailsList = document.querySelector('.card_List_info ul ');
        if (detailsList) {
            detailsList.innerHTML = `
          <li>Year: ${Thislistings.year}</li>
          <li><ion-icon name="hardware-chip-outline"></ion-icon>${Thislistings.type}</li>
          <li><ion-icon name="people-outline"></ion-icon>${Thislistings.places}</li>
          <li><ion-icon name="speedometer-outline"></ion-icon>${Thislistings.kilomiterPerlitre}</li>
          <li><ion-icon name="flash-outline"></ion-icon>${Thislistings.TypeEnirgie}</li>
        `;
        }

        // Update description
        const description = document.querySelector('.car-info p');
        if (description) {
            description.textContent = Thislistings.description;
        }

        // Update booking form details if needed
        // For example, you might want to set the car name in the form
        const formCarName = document.querySelector('.booking-form .car-name');
        if (formCarName) {
            formCarName.textContent = Thislistings.name;
        }
    }
}

// Add event listeners for thumbnail clicks
document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        const mainImage = document.querySelector('.main-image .image');
        mainImage.src = thumb.querySelector('img').src;
    });
});

// Add event listeners for arrow navigation
document.querySelector('.arrow-left').addEventListener('click', () => navigateImages(-1));
document.querySelector('.arrow-right').addEventListener('click', () => navigateImages(1));

function navigateImages(direction) {
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const mainImage = document.querySelector('.main-image .image');
    let currentIndex = Array.from(thumbnails).findIndex(img => img.src === mainImage.src);
    currentIndex = (currentIndex + direction + thumbnails.length) % thumbnails.length;
    mainImage.src = thumbnails[currentIndex].src;
}



const reviewsData = [
    {
        name: "Alex Stanton",
        title: "CEO at TechCorp",
        date: "21 July 2022",
        rating: 5,
        content: "We are very satisfied with the service from the RentApp. It offers competitive pricing and a wide selection of vehicles with excellent amenities. The staff provides friendly and courteous service."
    },
    {
        name: "Skylar Dias",
        title: "CTO at InnovateCo",
        date: "20 July 2022",
        rating: 3.5,
        content: "The RentApp has been a great help to us. They offer affordable rates and a diverse fleet of well-equipped, comfortable vehicles. The customer service team is consistently friendly and professional."
    },
    {
        name: "Skylar Dias",
        title: "CTO at InnovateCo",
        date: "20 July 2022",
        rating: 4,
        content: "The RentApp has been a great help to us. They offer affordable rates and a diverse fleet of well-equipped, comfortable vehicles. The customer service team is consistently friendly and professional."
    },
    {
        name: "Skylar Dias",
        title: "CTO at InnovateCo",
        date: "20 July 2022",
        rating: 2,
        content: "The RentApp has been a great help to us. They offer affordable rates and a diverse fleet of well-equipped, comfortable vehicles. The customer service team is consistently friendly and professional."
    },
    {
        name: "Skylar Dias",
        avatar:"./assets/images/car-1.jpg",
        title: "CTO at InnovateCo",
        date: "20 July 2022",
        rating: 5,
        content: "The RentApp has been a great help to us. They offer affordable rates and a diverse fleet of well-equipped, comfortable vehicles. The customer service team is consistently friendly and professional."
    }
];

const reviewsContainer = document.getElementById('reviews-container');
const showAllButton = document.getElementById('show-all');
let showingAll = false;

function createReviewElement(review) {
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-name">${review.name}</div>
                <div class="reviewer-title">${review.title}</div>
            </div>
            <div class="review-date">${review.date}</div>
        </div>
        <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        <p class="review-content">${review.content}</p>
    `;
    return reviewElement;
}

function displayReviews(showAll = false) {
    reviewsContainer.innerHTML = '';
    const reviewsToShow = showAll ? reviewsData : reviewsData.slice(0, 2);
    reviewsToShow.forEach(review => {
        reviewsContainer.appendChild(createReviewElement(review));
    });
}

showAllButton.addEventListener('click', () => {
    showingAll = !showingAll;
    displayReviews(showingAll);
    showAllButton.textContent = showingAll ? 'Show Less ▲' : 'Show All ▼';
});

displayReviews();
