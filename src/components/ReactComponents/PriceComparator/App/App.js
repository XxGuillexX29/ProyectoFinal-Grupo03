import { useState } from 'react';
import './style.css';
import Producto from '../Producto/index';

function App() {
  const prodObj = { nombre: '', precio: 0,active: true};
  const distribuidorOptions = ['comodin', 'chango mas', 'carrefour', 'vea'];
  const catOptions = ['lacteos', 'bebidas', 'mercaderia', 'higiene'];

  const [producto, setProducto] = useState(prodObj);
  const [productos, setProductos] = useState([]);
  const[productosBaratos,setproductosBaratos]=useState([]);
  const [filter, setFilter] = useState('all');

 
  const saveProducto = () => {
    if (producto.nombre.trim() !== ''&&producto.precio.trim() !== '' ) {
      setProductos([...productos, producto]);
      setProducto({ nombre: '', precio: '', distribuidor: '',categoria:'' });
    } else {
      alert('Please, complete the fields.');
    }
  };

  const filteredProd = productos.filter((item) => {
    if (filter === 'active') {
      return item.active;
    }else{
      
    return true;
}});

const nueva = () => {
   const duplicados = productos.filter((objeto, index, array) => {
    // Comprobar si el índice actual es diferente al índice del primer objeto con el mismo nombre
    return array.findIndex((otro) => otro.nombre === objeto.nombre) !== index;
  });
  console.log('Objetos duplicados:', duplicados);

  productos.map((item,index)=>{       
      const obj=duplicados.find(producto=>producto.nombre===item.nombre);    
         if(obj != null){//si la busqueda dio algo, obj tiene algo 
               const busq=productosBaratos.find(pro=>pro.nombre===obj.nombre)//por segunda vez
               if(busq==null){
                      // alert('obj encontrado: '+obj.precio);
                      // alert('objeto a comparar con el encontrado: '+item.precio);
                      if(item.precio < obj.precio){
                       // alert('el menor precio es item '+item.precio);
                         setproductosBaratos([...productosBaratos, item]);
                        productosBaratos.push(item);      
                      }else if(item.precio > obj.precio){
                         setproductosBaratos([...productosBaratos, obj]);
                         productosBaratos.push(obj);
                        //alert('el menor precio es obj '+obj.precio);
                      }   
                      //console.log('lista repetidos: ',productosBaratos);
                // }else{
                //         if(obj.precio!== busq.precio && obj.precio>busq.precio){
                //             //eliminar
                //             setproductosBaratos([...productosBaratos, busq]);
                //             productosBaratos.push(busq); 
                //         }
                }
         }else{
            alert('No hay productos repetidos');
         }
       });
};
     
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setProducto({ ...producto, [name]: name === 'importance' ? value : value });
};

  return (
    <div className="App">
      <h1 className="app-title">PRODUCTOS</h1>
      <header className="App-header">
        <div className='prod-creator-container'>
          <section className='prod-inputs-container'>
            <h2 className='subtitle'>NUEVO PRODUCTO</h2>
            <input type="text" className="input" name="nombre" value={producto.nombre} onChange={handleInputChange} placeholder='nombre' />
            <input type="number" className="input" name="precio" value={producto.precio} onChange={handleInputChange} placeholder='precio'/>
            <select  className="input" name='distribuidor' value={producto.distribuidor} onChange={handleInputChange}>
              {distribuidorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select  className="input" name='categoria' value={producto.categoria} onChange={handleInputChange}>
              {catOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button className="add-note-button" onClick={saveProducto}>AGREGAR PRODUCTO</button>
          </section>

          <section className='buttons-container'>
            <button onClick={nueva}>PRODUCTOS MAS BARATOS</button>
            {/* <button onClick={() => setFilter('all')}>Show All</button> */}
          </section>
        </div>
      </header>

      <div className="notes-container">
        {filteredProd.map((item, index) => (
          <Producto key={index} nombre={item.nombre} precio={item.precio} distribuidor={item.distribuidor} categoria={item.categoria}
          />
        ))}    
      </div>

      <h2 className='subtitle'>PRODUCTOS MAS BARATOS</h2>
      <div className="notes-container">
        {productosBaratos.map((item, index) => (
          <Producto key={index} nombre={item.nombre} precio={item.precio} distribuidor={item.distribuidor} categoria={item.categoria}
          />
        ))}
      </div>

    </div>
  );
};

export default App;