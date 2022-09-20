let productos = [
    {
    nombre: "Gold Trend",
    año: "2011",
    precio: "1800000"
},
{
    nombre: "Suran",
    año: "2013",
    precio: "2000000"
},
{
    nombre: "Clio",
    año: "2005",
    precio: "1200000"
},
    {
    nombre: "Cruze",
    año: "2018",
    precio: "2500000"
},
    {
    nombre: "Sandero",
    año: "2019",
    precio: "2300000"
}
]

function primerMensaje() {
    let mensaje = 'Que auto te gustaria comprar?'
    let count = 1

    for (let producto of productos) {
        mensaje += `\n${count}. ${producto.nombre} - ${producto.año} - $ ${producto.precio}`
        count++ 
    }

    mensaje += `\n${count}. Salir`

    return mensaje 
}

function cantidad (producto){
    return prompt(`Cuantos autos de ${producto.nombre} queres comprar?`)
}

function subtotal (cantidad, producto){
    alert(`Compraste ${cantidad} autos de ${producto.nombre} por $ ${cantidad * producto.precio}`)
    return cantidad * producto.precio
}

function calcularTotal (arr){
    return arr.reduce((acc, el) => acc + el, 0)
}

let opcion = 0
let total = []

do {
    opcion = parseInt(prompt(primerMensaje()))

    if (opcion == productos.length + 1){

        alert(`Su total fue de $ ${calcularTotal(total)}. \Nos vemos la proxima.`)
        break
    }

    total.push(subtotal(cantidad(productos[opcion - 1]) , productos[opcion - 1])) 

} while (true)
