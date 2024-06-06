let header = document.querySelector("#header");

let body = document.querySelector("#body");
let h4Envio = document.createElement("h4");
h4Envio.classList.add("envio");
h4Envio.innerText = "🚛Envio Gratis a partir de $60.000";
header.appendChild(h4Envio);

let navbar = document.createElement("nav");
navbar.classList.add("nav");
navbar.innerHTML = `
    <ul class= "barra">
        <div class="logo">
            <a href="index.html"><img src="./Imagenes/Imagenes/Logo MYN blanco negro-19.jpg" alt="Logo"></a>
        </div>
        <li class="barraItems">
            <a href ="./pages/zapatillas.html" class="barraLinks">Remeras</a>
        </li>
        <li class="barraItems">
            <a href="./pages/zapatillas.html" class="barraLinks">Buzos</a>
        </li>
        <li class="barraItems">
            <a href="./pages/zapatillas.html" class="barraLinks">Camperas</a>
        </li>
        <li class="barraItems">
            <a href="./pages/zapatillas.html" class="barraLinks">Zapatillas</a>
        </li>
    </ul>
`;
header.appendChild(navbar);

let h5Titulo = document.createElement("h5");
h5Titulo.innerText = "Productos Destacados";
header.append(h5Titulo);

let productos = [
    {
        art: "1",
        nombre:"Remera OverZide",
        descripcion: "Algodon, Holgadas",
        precio: 1500,
        imagen: 'https://picsum.photos/200/300'

    },
    {
        art: "2",
        nombre:"Pantalon Sett",
        descripcion: "Tela sett, Chupin",
        precio: 6250,
        imagen: 'https://picsum.photos/200/300'
    },
    {
        art: "3",
        nombre:"Buzo Cuello redondo",
        descripcion: "Algodon doble frisa, Talles reales",
        precio: 18000,
        imagen: 'https://picsum.photos/200/300'
    },
    {
        art: "4",
        nombre:"Zapatillas Nacionales",
        descripcion: "Cuero ecologico, Horma chica",
        precio: 2500,
        imagen: "./imagenes/imagenes/Tricolor.jpg"
    },
];

function mostrarProductos() {
    let contenedor = document.querySelector('#productos');
    let productosHTML = '';
  
    for (const product of productos) {
      productosHTML += `
        <div class="seccion1" id=${product.art}>
          <img src=${product.imagen} alt=${product.descripcion}>
          <div class="contenedorProducto">
            <h3>${product.nombre}</h3>
            <p>${product.descripcion}</p>
            <p>$${product.precio}</p>
            <button class="agregar-carrito" data-id=${product.art}>Agregar</button>
          </div>
        </div>
        `;
    }
    contenedor.innerHTML = productosHTML;

    document.querySelectorAll('.agregar-carrito').forEach(btn => {
      btn.addEventListener('click', () => {
        const productoID = btn.getAttribute('data-id');
        agregarAlCarrito(productoID);
      });
    });
}
function agregarAlCarrito(productoArt) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const products = productos.find(product => product.art === productoArt);
    const productosEnCarrito = carrito.find(p => p.art === productoArt);
  
    if (productosEnCarrito) {
      productosEnCarrito.cantidad += 1;
      productosEnCarrito.total = productosEnCarrito.cantidad * productosEnCarrito.precio;
    } else {
      carrito.push({
        art: productoArt,
        nombre: products.nombre,
        precio: products.precio,
        cantidad: 1,
        total: products.precio
      });
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let contenedorCarrito = document.querySelector('#contenedor-carrito');
    let footer = document.querySelector('#total');
    let carritoHTML = '';
  
    for (const p of carrito) {
      carritoHTML += `
        <div class="card-carrito" id=${p.art}>
          <h3>${p.nombre}</h3>
          <p>$${p.precio}</p>
          <p>Cantidad: ${p.cantidad}</p>
          <p>Total: $${p.total}</p>
          <button class="eliminar-carrito" data-id=${p.art}>Eliminar</button>
        </div>
      `;
    }
  
    contenedorCarrito.innerHTML = carritoHTML;
  
    document.querySelectorAll('.eliminar-carrito').forEach(btn => {
      btn.addEventListener('click', () => {
        let btnDelete = btn.getAttribute('data-id');
        eliminarDelCarrito(btnDelete);
      });
    });
  
    let totalCarrito = carrito.reduce((acc, p) => acc + p.total, 0);
  
    footer.innerHTML = `Total: $${totalCarrito}`
}

function eliminarDelCarrito(deleteArt) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(p => p.art === deleteArt);

    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad -= 1;
        productoEnCarrito.total = productoEnCarrito.cantidad * productoEnCarrito.precio;
    } else {
        carrito = carrito.filter(p => p.art !== deleteArt);
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
  
mostrarProductos();




