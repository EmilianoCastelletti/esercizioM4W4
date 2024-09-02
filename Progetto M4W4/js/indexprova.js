// Funzione per creare una card del prodotto
function creaCardProdotto(prodotto) {
    const link = document.createElement('a');
    link.href = 'dettaglio.html?id=' + prodotto._id;
    link.className = 'product-link'; 
    link.style.textDecoration = 'none'; 

    const card = document.createElement('div');
    card.className = 'product-card'; 

    const img = document.createElement('img');
    img.src = prodotto.imageUrl;
    img.alt = prodotto.name;
    img.className = 'product-image'; 

    const title = document.createElement('h2');
    title.textContent = prodotto.name + ' - ' + prodotto.price + ' €';
    title.className = 'product-title'; 

    card.append(img);
    card.append(title);

    link.append(card);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container'; 

    const addBtn = document.createElement('button');
    addBtn.innerText = 'Aggiungi al carrello';
    addBtn.className = 'btn'; 
    addBtn.id = 'addcart';

    buttonsContainer.append(addBtn);

    const container = document.createElement('div');
    container.className = 'product-container';

    container.append(link);
    container.append(buttonsContainer);

    return container;
}


// Funzione per recuperare i prodotti dal server
async function caricaProdotti() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o '
          }});
        
        if (!response.ok) {
            throw new Error('Errore nel recupero dei prodotti');
        }

        const prodotti = await response.json();
        
        const productContainer = document.getElementById('product-cards');
        
        prodotti.forEach(prodotto => {
            const card = creaCardProdotto(prodotto);
            productContainer.appendChild(card); 
        });

    } catch (error) {
        console.error('Si è verificato un errore durante il caricamento dei prodotti:', error);
    }
}
document.addEventListener('DOMContentLoaded', caricaProdotti);

//Funzione di ricerca dei prodotti
const searchProducts = (ev) => {
  let query = ev.target.value.trim(); 
  let allTitles = document.querySelectorAll(".product-title"); 

  allTitles.forEach((title) => {
    const currContainer = title.closest(".product-container");
    if (!title.innerText.toLowerCase().includes(query.toLowerCase()) && query !== "") {
      currContainer.style.display = "none"; 
    } else {
      currContainer.style.display = "block"; 
    }
  });
};
  
  document.getElementById("search-bar").addEventListener("input", searchProducts);
  