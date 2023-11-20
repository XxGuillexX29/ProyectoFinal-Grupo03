import { useState } from 'react';
import './style.css';
import Producto from '../Producto/index';

const Comparador = () => {
  const [listaDeProductos, setListaDeProductos] = useState([]);
  const [productosMasBaratos, setProductosMasBaratos] = useState([]);

  const agregarProducto = (nuevoProducto) => {
    const { nombre, precio, distribuidor, categoria } = nuevoProducto;
    setListaDeProductos([...listaDeProductos, { nombre, precio, distribuidor, categoria }]);
  };

  const filtroMenorPrecio = () => {
    const productosMasBaratos = {};

    if (listaDeProductos.length > 0) {
      listaDeProductos.forEach((producto) => { // Por cada producto en listaDeProductos
        const { nombre, precio, categoria, distribuidor } = producto;
        const nombreNormalizado = nombre.toLowerCase();

        if (!productosMasBaratos[nombreNormalizado] || // Si no existe un producto con ese nombre
          precio < productosMasBaratos[nombreNormalizado].precio // O el precio es menor al producto existente
        ) {
          productosMasBaratos[nombreNormalizado] = { nombre, precio, categoria, distribuidor }; // Agrega a la lista el producto
        }
      });

      const nuevosProductosMasBaratos = Object.values(productosMasBaratos); // Agrega el objeto a una lista nueva.
      setProductosMasBaratos(nuevosProductosMasBaratos); // Actualiza la lista con los nuevos productos.
    } else {
      alert('No hay productos cargados');
    }
  };

  return (
    <section className="comparator-container">
      <h1 className="comparator-title">Comparador</h1>

      <div className="general-container">
        <section className="add-product-container">
          <h2 className="comparator-sub-title">Agregar un Producto</h2>
          <Producto onSubmit={agregarProducto} filtro={filtroMenorPrecio} />
        </section>
      </div>

      <section className="all-products-container">
        <h2 className="comparator-sub-title">Productos</h2>
        <div id="product-list" className="prod-comparator-container">
          {listaDeProductos.map((producto, index) => (
            <div key={index} className="product-container">
              <p>Producto: {producto.nombre}</p>
              <p>Precio: {producto.precio} pesos</p>
              <p>Categoria: {producto.categoria}</p>
              <p>Distribuidor: {producto.distribuidor || ''}</p>
            </div>
          ))}
        </div>

        <div id="cheaper-products-list">
          <h2 className="comparator-sub-title">Productos más baratos</h2>
          <div className="prod-comparator-container">
            {productosMasBaratos.map((producto, index) => (
              <div key={index} className="product-container">
                <p>Producto: {producto.nombre}</p>
                <p>Precio: {producto.precio} pesos</p>
                <p>Categoria: {producto.categoria}</p>
                <p>Distribuidor: {producto.distribuidor || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Comparador;