import React, {useState} from 'react';
import Error from "./Error"

const Formulario = ({setBusqueda}) => {

    const [termino, setTermino] = useState("")
    const [error, setError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        //validar
        if(termino.trim() === ""){
            setError(true)
            return;
        }
        setError(false);

        //Enviar el termino de busqueda hacia el componente principal
        setBusqueda(termino)

    }

    return ( 
        <form
            onSubmit = {buscarImagenes}
        >
            <div className = "row" >
                <div className = "form-group col-md-8">
                    <input
                        type = "text"
                        className = "form-control form-control-lg"
                        placeholder = "Busca una imagen..."
                        onChange = { e => setTermino(e.target.value)}
                    />
                </div>
                <div className = "form-group col-md-4">
                    <input
                        type = "submit"
                        className = "btn btn-lg btn-danger btn-block"
                        value = "Buscar"
                    />
                </div>
            </div>
            {error ? <Error msj = "Agrega un termino de búsqueda"/> : null}
        </form>
     );
}
 
export default Formulario;