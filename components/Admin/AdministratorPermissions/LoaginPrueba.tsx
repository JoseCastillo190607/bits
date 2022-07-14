import './loadingcss.css'

const LoadingPrueba  = () =>{
    return(
        <div className='Contenedor'>
            <div className='Hijo'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <div>Cargando Datos...</div>
            </div>
        </div>
    )
}

export default LoadingPrueba