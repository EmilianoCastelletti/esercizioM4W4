const name = document.getElementById('name')
const description = document.getElementById('description')
const brand = document.getElementById('brand')
const price = document.getElementById('price')
const imgurl = document.getElementById('image')
const salva = document.getElementById('salva')
const url = new URLSearchParams(location.search)
const id = url.get('id')

async function fillform() {

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o '
        }
    })
    const dati = await response.json()
    name.value = dati.name
    description.value = dati.description
    brand.value = dati.brand
    price.value = dati.price
    imgurl.value = dati.imageUrl

}

fillform()

salva.addEventListener('click', updateProduct)
async function updateProduct(e) {
    e.preventDefault()
    const product = {
        name : name.value,
        description : description.value,
        brand : brand.value,
        price : Number(price.value),
        imageUrl : imgurl.value

    }

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQ1NDBlNDY5OGY0ODAwMTVlNDZkOWQiLCJpYXQiOjE3MjUyNTE4MTIsImV4cCI6MTcyNjQ2MTQxMn0.v6YKW57Hoa8s1YraAOvCw3x6CIetCc03dlsRYWMaH_o '
        },
        body: JSON.stringify(product)
    
    })
    const dati = await response.json()
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      }).then(()=>
        window.location.href = 'edit.html')

    

}