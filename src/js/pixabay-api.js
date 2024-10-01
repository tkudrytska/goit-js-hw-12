import axios from "axios";

export async function fetchImages(inputValue, page, limit) {
    try {
        const response = await axios.get(`https://pixabay.com/api`, {
            params: {
                key: '46126545-8899f9a6fbc888edd135bf332',
                q: inputValue,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: limit,
                page: page,
            }
        });

        return response.data.hits;
    } catch (error) {
        console.error(error);
        throw error;
    }    
}