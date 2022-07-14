import { useEffect, useState, useContext, useReducer } from 'react';
import { getHistorialPuesto } from '../../services/PuestoService';


const HistorialPuesto = (props:any) =>{
    const [historial, setHistorial] = useState()

    function ListaHistorial (){
        const[historial, setHistorial] = useState<any[]>([])


        useEffect(() => {
            initData()
        }, []);
    
        const initData = async () => {
    
            const arrelgoHistorial = await getHistorialPuesto(props.idPuesto);
            setHistorial(arrelgoHistorial);
            
        };

        const sidebar =(
            <div className='ContenedorPrincipalHistorial'>
            <div className="ContenedorHistorial">
                <div className='ContenedorTituloHistorial'>
                    <span>Historial del puesto</span>
                </div>
                <div className='ContenedorSubtituloHistorial'>
                    <div className='ContenedorSubtituloHistorialFecha'>
                        <span>Fecha</span>
                    </div> 
                    <div className='ContenedorSubtituloHistorialDescripcion'>
                        <span>Descripción del hito</span>
                    </div> 
                </div>
            <ul className='UlListaHistorial'>
                {historial?.map((lis:any)=>
                    <li className='listaHistorial'>
                        <div className='ContenedorSubtituloHistorialLista'>
                            <div className='ContenedorSubtituloHistorialFechaLista'>
                                <span>{lis.Fecha}</span>
                            </div> 
                            <div className='ContenedorSubtituloHistorialDescripcionLista'>
                                <span>{lis.Descripcion}</span>
                            </div>
                        </div>  
                    </li>
                )}
            </ul>   
            </div> 
            </div>
        );

        return(
            <div>{sidebar}</div>
        ) 
    }

    return(
        <div>
            <ListaHistorial />
        </div>
    )
} 
export default HistorialPuesto