const hamburguesas = [
{nombre:"Cheesse burguer",precio:8000,ingredientes:"2 medallones de carne, cheddar",imagen:"img/burga1.jpg"},
{nombre:"Bacon cheesse",precio:8500,ingredientes:"2 medallones de carne, cheddar, bacon",imagen:"img/burga2.jpg"},
{nombre:"Cuarto extreme",precio:9000,ingredientes:"2 medallones de carne, cheddar, bacon, salsa cuarto",imagen:"img/burga3.jpg"},
{nombre:"Cuarto caramel",precio:9500,ingredientes:"2 medallones de carne, cheddar, bacon, cebolla caramelizada,salsa cuato",imagen:"img/burga2.jpg"},
{nombre:"Caramel burguer",precio:8500,ingredientes:"2 medallones de carne, cheddar, bacon, cebolla caramelizada",imagen:"img/burga2.jpg"},

]

const bebidas = [
{nombre:"Coca cola botella",precio:5500,ingredientes:"coca cola de 2.5L", imagen:"img/coca.jpeg"},
{nombre:"Levite",precio:2200,ingredientes:"Levite de naranja de 500cc ", imagen:"img/levite.jpg"},
{nombre:"Coca cola lata",precio:2200,ingredientes:"coca cola de lata de 354cc", imagen:"img/lata.jpg"},
]

const promos = [
{nombre:"Luna llena",precio:8800,ingredientes:"Cheesse burguer y una lata de coca de 354cc", imagen:"img/burga3.jpg"},
{nombre:"Galaxia",precio:19800,ingredientes:" 2 Cheesse burguer y 2 latas de coca de 354cc", imagen:"img/burga3.jpg"},
{nombre:"Eclipce",precio:11800,ingredientes:" cuarto caramel con papas y una lata de coca de 354cc", imagen:"img/burga3.jpg"},
{nombre:"Cometa",precio:23800,ingredientes:" cuarto extreme , caramel burguer con papas  y botella de coca de 2.5L", imagen:"img/burga3.jpg"},
{nombre:"Cometa 2",precio:18500,ingredientes:" cuarto extreme y bacon cheesse con papas ", imagen:"img/burga3.jpg"},
{nombre:"Super nova",precio:34800,ingredientes:"2 cuarto carmel triples con papas grandes ", imagen:"img/burga3.jpg"},
{nombre:"Constelacion",precio:28500,ingredientes:"3 cuarto extreme con papas", imagen:"img/burga3.jpg"},
{nombre:"Universo",precio:33000,ingredientes:"2 cuarto extreme y una cheesse burguer con papas y botella de coca de 2,5L", imagen:"img/burga3.jpg"},
{nombre:"Mercurio",precio:27500,ingredientes:"cuarto extreme, bacon cheesse y cheesse burguer con papas", imagen:"img/burga3.jpg"},
{nombre:"Explocion estelar",precio:44000,ingredientes:"2 cuarto extreme, 2 melt burguer con papas y botella de coca de 2.5L", imagen:"img/burga3.jpg"},
{nombre:"Impacto cosmico",precio:35800,ingredientes:"2 bacon cheese y 2 cheesse burguer con papas", imagen:"img/burga3.jpg"},
]

const carrito = {}

function crearCatalogo(lista,contenedor){

const div = document.getElementById(contenedor)

lista.forEach((item,i)=>{

div.innerHTML += `

<div class="card">

<img src="${item.imagen}">

<h3>${item.nombre}</h3>

<div class="precio">$${item.precio}</div>

<button class="detalles" onclick="verIngredientes('${item.nombre}','${item.ingredientes}','${item.imagen}')">
📋 Ver ingredientes
</button>

<button class="agregar" onclick="agregarCarrito('${item.nombre}',${item.precio})">
Agregar
</button>

</div>

`

})
setTimeout(()=>{

document.querySelectorAll(".card").forEach(card=>{
observer.observe(card)
})

},100)  
}

crearCatalogo(hamburguesas,"catalogo")
crearCatalogo(bebidas,"bebida")
crearCatalogo(promos,"promo")


function agregarCarrito(nombre,precio){

if(carrito[nombre]){

carrito[nombre].cantidad++

}else{

carrito[nombre]={precio:precio,cantidad:1}

}

actualizarCarrito()

const boton=document.querySelector(".botonCarrito")

boton.classList.add("animacion-carrito")

setTimeout(()=>{
boton.classList.remove("animacion-carrito")
},400)


}


function actualizarCarrito(){

let lista=document.getElementById("listaCarrito")

lista.innerHTML=""

let total=0
let contador=0

for(let item in carrito){

let datos=carrito[item]

lista.innerHTML+=`<li>${item} x${datos.cantidad}</li>`

total+=datos.precio*datos.cantidad
contador+=datos.cantidad

}

document.getElementById("total").innerText=total
document.getElementById("contador").innerText=contador

}


function vaciarCarrito(){

for(let item in carrito){

delete carrito[item]

}

actualizarCarrito()

}


function abrirCarrito(){

document.getElementById("modalCarrito").classList.add("activo")

}

function cerrarCarrito(){

document.getElementById("modalCarrito").classList.remove("activo")

}



function verIngredientes(nombre,texto,imagen){

document.getElementById("modalTitulo").innerText=nombre
document.getElementById("modalTexto").innerText=texto
document.getElementById("modalImagen").src=imagen

document.getElementById("modalIngredientes").classList.add("activo")


}


function cerrarIngredientes(){

document.getElementById("modalIngredientes").classList.remove("activo")


}


function enviarPedido(){

let mensaje="Hola quiero pedir:%0A"

let total=0

for(let item in carrito){

let datos=carrito[item]

mensaje+=`${item} x${datos.cantidad} - $${datos.precio*datos.cantidad}%0A`

total+=datos.precio*datos.cantidad

}

mensaje+=`%0ATotal: $${total}`

let telefono="1169332249"

window.open(`https://wa.me/${telefono}?text=${mensaje}`)

}
const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible")

}

})

})

document.querySelectorAll(".card").forEach(card=>{

observer.observe(card)

})

