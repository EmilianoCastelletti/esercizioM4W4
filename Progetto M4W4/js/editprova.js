

// Funzione per creare la card del prodotto
function creaCardProdotto(prodotto) {
    const card = document.createElement('div');
    card.className = 'product-card'; 

    const img = document.createElement('img');
    img.src = prodotto.imageUrl;
    img.alt = prodotto.name;
    img.className = 'product-image'; 


    const title = document.createElement('h2');
    title.textContent = prodotto.name + ' - ' + prodotto.price +'€';
    title.className = 'product-title'; 

    const deletebtn = document.createElement('button');
    deletebtn.innerText = 'Elimina';
    deletebtn.id = 'deletebtn'

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      
      deletebtn.addEventListener('click', async function () {
        swalWithBootstrapButtons.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const deleteFun = await fetch('https://striveschool-api.herokuapp.com/api/product/' + prodotto._id, {
                method: 'DELETE',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o'
                }
              });
      
              if (!deleteFun.ok) {
                throw new Error('Errore nella eliminazione');
              }
      
              card.remove();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
      
            } catch (error) {
              console.error('Si è verificato un errore:', error);
              swalWithBootstrapButtons.fire({
                title: "Errore!",
                text: "Si è verificato un errore durante l'eliminazione del prodotto.",
                icon: "error"
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Your imaginary file is safe :)",
              icon: "error"
            });
          }
        });
      });
      

    const editbtn = document.createElement('a');
    editbtn.href = 'editmod.html?id=' + prodotto._id
    editbtn.innerText = 'Modifica';
    editbtn.id = 'editbtn';

    card.append(img);
    card.append(title);
    card.append(deletebtn);
    card.append(editbtn);
    return card;
}

// Funzione per recuperare i prodotti dal server
async function caricaProdotti() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o '
            }
        });

        if (!response.ok) {
            throw new Error('Errore nel recupero dei prodotti');
        }

        const prodotti = await response.json();

        const productContainer = document.getElementById('product-cards');

        prodotti.forEach(prodotto => {
            console.log('Prodotto:', prodotto)
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
        const currCard = title.closest(".product-card"); 
        if (!title.innerText.toLowerCase().includes(query.toLowerCase()) && query !== "") {
            currCard.style.display = "none"; 
        } else {
            currCard.style.display = "block"; 
        }
    });
};

document.getElementById("search-bar").addEventListener("input", searchProducts);
