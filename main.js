const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '804ada3206mshb4a9cd23cfe496ap150c27jsn70432ff7a299',
		'X-RapidAPI-Host': 'books39.p.rapidapi.com'
	}
};

//Variables iniciales
let entradasArray = [];
let total = 0;
let productContenedor = document.querySelector('.shop-items');
let totalElement = document.querySelector('.cart-total-title');


// Peticion de productos al servidor
let res = await fetch('https://api.escuelajs.co/api/v1/products')
let data = await res.json()

let productosArray = data.slice(0,4)

// console.log(productosArray)

productosArray.forEach(product => {
    productContenedor.innerHTML += `                    
    <div class="shop-item" id="${product.id}"> 
    <span class="shop-item-title">${product.title}</span>
    <img class="shop-item-image" src="${product.images[0]}">
    <div class="shop-item-details">
        <span class="shop-item-price">$${product.price}</span>
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>
</div>`
});

// Veo cuando hace click un boton ADD
let addBtns = document.querySelectorAll('.shop-item-button')
addBtns = [...addBtns];

let cartContenedor = document.querySelector('.cart-items');

addBtns.forEach(btn=>{
    btn.addEventListener('click', event=> {
        //AGREGO PRODUCTOS AL CARRITO

        //Buscar el ID del producto
        let actualID = parseInt(event.target.parentNode.parentNode.id);
        console.log(actualID);

        //Con el ID encontrar el objeto
        let actualProducto = productosArray.find(item => item.id == actualID)

        if(actualProducto.quantity === undefined){
            actualProducto.quantity = 1;
        }

        //Preguntar si el producto que agrego ya existe
        
        let existe = false
        entradasArray.forEach(entradas => {
        if (actualID == entradas.id){
            existe = true
        }
        })

        if(existe){
            actualProducto.quantity++
        }else{
            entradasArray.push(actualProducto)
        }
        
        

        console.log(entradasArray)
        drawItems()

    //Actualizar el valor total
        getTotal()

        updateNumberOfItems()

        removeItems()
    });
});

function getTotal(){
    let sumTotal
    let total = entradasArray.reduce((sum , item)=>{
        sumTotal = sum + item.quantity*item.price
        return sumTotal
    } , 0);
    totalElement.innerText = `$${total}`
}

function drawItems(){
    cartContenedor.innerHTML = "";
    entradasArray.forEach(item => {

        
    cartContenedor.innerHTML += `
    <div class="cart-row">
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${item.images[0]}" width="100" height="100">
        <span class="cart-item-title">${item.title}</span>
    </div>
    <span class="cart-price cart-column">$${item.price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
</div>`
    });
    removeItems()
}

function updateNumberOfItems(){
    let inputNumber = document.querySelectorAll('.cart-quantity-input');
    inputNumber = [...inputNumber]
    inputNumber.forEach(item =>{
        item.addEventListener('click', event=>{
            //Conseguir el titulo 
            let actualEntradaTitle = (event.target.parentElement.parentElement.childNodes[1].innerText);
            let actualEntradaQuantity = parseInt(event.target.value);
            //Busco el objeto con el titulo
            let actualEntradaObject = entradasArray.find(item => item.title == actualEntradaTitle)
            console.log(actualEntradaObject)
            //Actualizar el numero de quantity
            actualEntradaObject.quantity = actualEntradaQuantity;
            //Actualizar precio
            getTotal()
        });
    })
    
    
}

function removeItems(){
    let removeBtns = document.querySelectorAll('.btn-danger');
    removeBtns = [...removeBtns];
    removeBtns.forEach(btn => {
        btn.addEventListener('click' , event=>{
            //Conseguir el titulo 
            let actualEntradaTitle = (event.target.parentElement.parentElement.childNodes[1].innerText);

            //Busco el objeto con el titulo
            let actualEntradaObject = entradasArray.find(item => item.title == actualEntradaTitle)

            //Remover el arreglo 
            entradasArray = entradasArray.filter(item => item != actualEntradaObject)
            
            //Actualizar el precio total
            drawItems()
            getTotal()
            updateNumberOfItems()
        });
    });
}







