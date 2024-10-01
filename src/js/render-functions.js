import { gallery } from '../main';

export function renderImages(images) {
    const markup = images
        .map((image) => {
            const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image;
            return `
            <li class="gallery-item">
                <a href="${largeImageURL}" class="gallery-item">
                    <img src="${webformatURL}" alt="${tags}" />
                    <div class="image-info">
                        <p>Likes: ${likes}</p>
                        <p>Views: ${views}</p>
                        <p>Comments: ${comments}</p>
                        <p>Downloads: ${downloads}</p>
                    </div>
                </a>
            </li>`;
        })
        .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
};
