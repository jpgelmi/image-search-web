import React from 'react';
const Error = ({msj}) => {
    return (
    <p className = "my-3 p-4 text-center alert alert-warning">Ops! no se encontraron imagenes de: {msj}</p>
    );
}
 
export default Error;