const productNameElement = document.getElementById('product-name');
const productImageElement = document.getElementById('product-image');
const productDescriptionElement = document.getElementById('product-description');
const productPriceElement = document.getElementById('product-price');
const productBrandElement = document.getElementById('product-brand');

const url = new URLSearchParams(location.search);
const id = url.get('id');

async function loadProductDetails() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o'
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero dei dettagli del prodotto');
        }

        const product = await response.json();

        productNameElement.textContent = product.name;
        productImageElement.src = product.imageUrl;
        productImageElement.alt = product.name;
        productDescriptionElement.textContent = product.description;
        productPriceElement.textContent = `Prezzo: ${product.price} €`;
        productBrandElement.textContent = `Distributore: ${product.brand}`;
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);
