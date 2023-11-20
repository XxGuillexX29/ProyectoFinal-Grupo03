import React, { useState } from 'react';
import './style.css';

const Producto = ({ nombre, precio, distribuidor, categoria, onSubmit, filtro }) => {
    const [producto, setProducto] = useState({
        nombre: nombre || '',
        precio: precio || '',
        distribuidor: distribuidor || '',
        categoria: categoria || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { nombre, precio, distribuidor, categoria } = producto;

        if (nombre && precio && distribuidor && categoria) { // Se crea el producto solo si cumple todos los requisitos
            onSubmit({ nombre, precio, distribuidor, categoria });
            setProducto({ nombre: '', precio: '', distribuidor: '', categoria: '' });
        } else {
            alert('Por favor, complete todos los campos.');
        }
    };

    return (
        <form className='comparator-form-container' onSubmit={handleSubmit}>
            <input type="text" className="filter-input" name="nombre" placeholder="Nombre del producto" value={producto.nombre} onChange={handleInputChange} required />
            <input type="number" className="filter-input" name="precio" placeholder="Precio del producto" value={producto.precio} onChange={handleInputChange} required />
            <select className="filter-input" name="distribuidor" value={producto.distribuidor} onChange={handleInputChange} required>
                <option value="" disabled>Distribuidor</option>
                <option value="Comodin">Comodin</option>
                <option value="Carrefour">Carrefour</option>
                <option value="Chango Mas">Chango Mas</option>
                <option value="Vea">Vea</option>
                <option value="Jaguar">Jaguar</option>
            </select>
            <select className="filter-input" name="categoria" value={producto.categoria} onChange={handleInputChange} required>
                <option value="" disabled>Categoria</option>
                <option value="Lacteos">Lacteos</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Pastas y cereales">Pastas y cereales</option>
                <option value="Carnes / producto animal">Carnes / producto animal</option>
                <option value="Frutas y verduras">Frutas y verduras</option>
                <option value="Golocinas">Golocinas</option>
                <option value="Higiene">Higiene</option>
                <option value="Hogar">Hogar</option>
            </select>
            <div className='page-buttons'>
                <button className="page-button" type="submit">Agregar</button>
                <button className="page-button" onClick={filtro}>Ver más baratos</button>
            </div>
        </form>
    );
};

export default Producto;