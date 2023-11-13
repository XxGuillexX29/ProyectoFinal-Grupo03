const listaDeProductos = [];

let tituloDeLista = null;

// Plantillas para mostrar diferentes tipos de listas (General o Baratos)
function mostrarEnHTML(id, tituloSection, listaDeProductos) {
    const lista = document.getElementById(id);

    // Si ya hay un título en la lista, no lo agregamos nuevamente
    if (!tituloDeLista) {
        const titulo = document.createElement('h2');
        titulo.textContent = tituloSection;
        titulo.classList.add('sub-title');
        lista.parentNode.insertBefore(titulo, lista);
        tituloDeLista = titulo;
    } else {
        tituloDeLista.textContent = tituloSection;
    };

    lista.innerHTML = '';

    listaDeProductos.forEach(producto => {
        const contenedorDeProducto = document.createElement('div');
        contenedorDeProducto.className = 'product-container';

        const nombre = document.createElement('p');
        nombre.textContent = `Producto: ${producto.nombre}`;

        const precio = document.createElement('p');
        precio.textContent = `Precio: ${producto.precio} pesos`;

        const categoria = document.createElement('p');
        categoria.textContent = `Categoria: ${producto.categoria}`;

        const distribuidor = document.createElement('p');
        distribuidor.textContent = `Distribuidor: ${producto.distribuidor || ''}`;

        contenedorDeProducto.appendChild(nombre);
        contenedorDeProducto.appendChild(precio);
        contenedorDeProducto.appendChild(categoria);
        contenedorDeProducto.appendChild(distribuidor);

        lista.appendChild(contenedorDeProducto);
    });
};

// Funcion para agregar un producto nuevo teniendo como oblicación de llenar todos los campos
function agregarProducto() {
    const nombre = document.getElementById('name').value;
    const precio = parseFloat(document.getElementById('price').value);
    let distribuidor = document.getElementById('market');
    let categoria = document.getElementById('categorie');

    if (nombre && precio && distribuidor && categoria && distribuidor.selectedIndex > 0 && categoria.selectedIndex > 0) {
        const distribuidorSel = distribuidor.options[distribuidor.selectedIndex].text;
        const categoriaSel = categoria.options[categoria.selectedIndex].text;

        const nuevoProducto = {
            "nombre": nombre,
            "precio": precio,
            "distribuidor": distribuidorSel,
            "categoria": categoriaSel
        };
        listaDeProductos.push(nuevoProducto);

        document.getElementById('product-form').reset();
        alert("¡Producto agregado correctamente!");
    } else {
        alert("Por favor, complete todos los campos.");
    };
};

// Filtro que devuelve los productos más baratos
function filtroMenorPrecio() {
    ocultarListaDeProductos('product-list');

    // Crea un objeto para almacenar el producto más barato por nombre
    const productosMasBaratosPorNombre = [];

    if (listaDeProductos.length > 0) {
        listaDeProductos.forEach(producto => {
            const nombre = producto.nombre;
            const precio = producto.precio;
            const categoria = producto.categoria;
            const distribuidor = producto.distribuidor;

            // Si es la primera vez que encontramos este nombre o si el precio es más bajo,
            // actualiza el producto más barato por nombre
            if (!productosMasBaratosPorNombre[nombre] || precio < productosMasBaratosPorNombre[nombre].precio) {
                productosMasBaratosPorNombre[nombre] = { nombre, precio, categoria, distribuidor };
            };
        });

        // Convierte el objeto en un array de productos
        const productosMasBaratos = Object.values(productosMasBaratosPorNombre);

        mostrarEnHTML('product-list', 'Productos más baratos', productosMasBaratos);
        alert(`Los productos más económicos:`);
    } else {
        alert('No hay productos carcados');
    };

    listaVisible = true;
};

// Cambiar las listas para mejor visualización del usuario
let listaVisible = true;

function mostrarListaDeProductos() {
    if (listaDeProductos.length > 0) {
        ocultarListaDeProductos('product-list');

        mostrarEnHTML('product-list', 'Lista de Productos', listaDeProductos);
    } else {
        alert('No hay productos carcados');
    };

    listaVisible = true;
};

function ocultarListaDeProductos(id) {
    const lista = document.getElementById(id);

    if (lista) {
        lista.innerHTML = '';
    };
};