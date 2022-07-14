import './Organigrama.css'

const ImagenColaborador = (props: any) =>{
    let PrimeraLetra = props.Nombre?.charAt(0)
    let SegundaLetra = props.Apellido?.charAt(0)


    return(
        <div className="circulo_secundario colorBlue_secundario">
            <span className='textoCirculo'>{PrimeraLetra}{SegundaLetra}</span>
        </div>
    )
}

export default ImagenColaborador