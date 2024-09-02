const crea = document.getElementById('send');
crea.addEventListener('click', async (c) => { 
    c.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const price = document.getElementById('price').value.trim();
    const imageUrl = document.getElementById('image').value.trim();

    if (!name || !description || !brand || !price || !imageUrl) {
        alert('Per favore, compila tutti i campi prima di continuare.');
        return;
    }

    const prodotto = {
        name,
        description,
        brand,
        imageUrl,
        price: Number(price)
    };

    console.log(prodotto);

    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o '
            },
            body: JSON.stringify(prodotto)
        });

        if (!response.ok) {
            throw new Error('Errore nella richiesta di rete');
        }


        const dati = await response.json();
        console.log(dati);
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          }).then(()=>
            window.location.href = 'create.html');
        
    } catch (error) {
        console.error('Si è verificato un errore:', error);
    }
    

    

});
