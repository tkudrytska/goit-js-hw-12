import { fetchImages } from "./js/pixabay-api";
import { renderImages } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
export const gallery = document.querySelector('.image-gallery');
const btn = document.querySelector(`.load-more`);
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.image-gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

let page = 1;
let limit = 15;
let currentQuery = "";
const totalPages = Math.ceil(500 / limit);

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputValue = form.elements.query.value.trim();

    if (!inputValue) {
        iziToast.show({
            message: 'Please enter a search query.',
            color: 'red',
            position: 'topRight',
        });
        btn.style.display = 'none';
        return;
    }

    currentQuery = inputValue;
    page = 1;
    gallery.innerHTML = '';
    btn.style.display = 'none';

    loadImages();
});

async function loadImages() {
    loader.style.display = 'block';
    try {
        const images = await fetchImages(currentQuery, page, limit);

        if (images.length === 0 && page === 1) {
            iziToast.show({
                message: `Sorry, there are no images matching your search query. Please try again!`,
                color: 'red',
                position: 'topRight',
            });
            gallery.innerHTML = '';
            btn.style.display = 'none';
            return;
        }

        renderImages(images);

        lightbox.refresh();

        scroll();

        if (page < totalPages) {
            btn.style.display = 'block';
        } else {
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                color: "red",
                position: "topRight",
            });
            btn.style.display = 'none';
        }
    } catch (error) {
        iziToast.show({
            message: "We're sorry, but you've reached the end of search results.",
            color: "red",
            position: "topRight",
        });
        btn.style.display = 'none';
    } finally {
        loader.style.display = 'none';
    }
}

btn.addEventListener("click", () => {
    page += 1;
    btn.style.display = 'none';
    loadImages();
});

function scroll() {
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};