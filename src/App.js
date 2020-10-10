import React, {useState, useEffect} from 'react';
import Formulario from "./components/Formulario"
import ListadoImagenes from "./components/ListadoImagenes"

function App() {

  //state de la app
  const[busqueda, setBusqueda] = useState("")
  const[imagenes, setImagenes] = useState([])
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotal] = useState(1)

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === "")return

      const imagenesPorPagina = 30;
      const key = "18652283-0f99fcedd4aab528008e4b113"
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${pagina}`

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits)

      //Calcular el total de páginas
      const calcularTotalpaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      console.log(calcularTotalpaginas)
      setTotal(calcularTotalpaginas)
    }
    consultarApi()

    //Mover scroll hacia arriba
    const jumbotron = document.querySelector(".jumbotron")
    jumbotron.scrollIntoView({behavior: "smooth"})
    
  }, [busqueda, pagina])

  //definir la pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = pagina - 1;

    if(nuevaPaginaActual === 0) return;

    setPagina(nuevaPaginaActual)
  }

  //definir la pagina siguente 
  const paginaSiguente = () =>{
    const nuevaPaginaActual = pagina + 1;

    if(nuevaPaginaActual > totalPaginas) return;

    setPagina(nuevaPaginaActual)
  }
 


  return (
    <div className = "container">
      <div className = "jumbotron">
        <p className = "lead text-center">Buscador de Imágenes</p>
        
        <Formulario
          setBusqueda= {setBusqueda}
        />
      </div>
        <div className = "row justify-content-center">
          <ListadoImagenes
            imagenes = {imagenes}
          />

          {(pagina === 1) ? null : (
            <button
              type = "button"
              className = "btn btn-info mr-1"
              onClick = {paginaAnterior}
            >&laquo; Anterior</button>
          )}

          {(pagina === totalPaginas) ? null : (
            <button
              type = "button"
              className = "btn btn-info"
              onClick = {paginaSiguente}
            >Siguente &raquo;</button>
          )}
        </div>
    </div>
  );
}

export default App;
