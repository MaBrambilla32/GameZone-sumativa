import { useEffect, useState } from "react";
import "./App.css";
import productosData from "./productos.json";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);

  // carga los productos al iniciar la aplicacion
  useEffect(() => {
    setTimeout(() => {
      setProductos(productosData);
      setCargando(false);
    }, 800);
  }, []);

  // agrega un producto al carrito
  const agregarAlCarrito = (producto) => {
    if (!carrito.some((item) => item.id === producto.id)) {
      setCarrito([...carrito, producto]);
    }
  };

  // elimina un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((producto) => producto.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>GameZone - Tienda de Videojuegos</h1>
        <p>
          Encuentra videojuegos, consolas y accesorios para disfrutar tu
          experiencia gamer.
        </p>
      </header>

      <nav>
        <a href="#productos">Productos</a>
        <a href="#carrito">Carrito ({carrito.length})</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <main>
        <section id="productos">
          <h2>Productos destacados</h2>

          {cargando ? (
            <p className="mensaje">Cargando productos...</p>
          ) : (
            <div className="lista-productos">
              {productos.map((producto) => {
                const estaEnCarrito = carrito.some(
                  (item) => item.id === producto.id
                );

                return (
                  <article className="producto" key={producto.id}>
                    <img src={producto.imagen} alt={producto.nombre} />

                    <h3>{producto.nombre}</h3>

                    <p>{producto.descripcion}</p>

                    <strong>
                      ${producto.precio.toLocaleString("es-CL")}
                    </strong>

                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      disabled={estaEnCarrito}
                    >
                      {estaEnCarrito ? "En el carrito" : "Agregar al carrito"}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="carrito" className="carrito">
          <h2>Carrito de compras</h2>

          {carrito.length === 0 ? (
            <p className="mensaje">Tu carrito esta vacio.</p>
          ) : (
            <div>
              {carrito.map((producto) => (
                <div className="item-carrito" key={producto.id}>
                  <div className="info-carrito">
                    <img src={producto.imagen} alt={producto.nombre} />

                    <span>
                      {producto.nombre} - $
                      {producto.precio.toLocaleString("es-CL")}
                    </span>
                  </div>

                  <button onClick={() => eliminarDelCarrito(producto.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer id="contacto">
        <h2>Contacto</h2>
        <p>Direccion: Avenida Gamer 123, Santiago, Chile.</p>
        <p>Email: contacto@gamezone.cl</p>
      </footer>
    </div>
  );
}

export default App;