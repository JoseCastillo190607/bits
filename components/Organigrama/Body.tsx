import ListaOrganigrama from './ListaOrganigrama';
import OrganigramaModalState from '../../context/OrganigramaContext/OrganigramaModalState';
import './Organigrama.css'

const Body = () =>{
    return(
    <>
    <OrganigramaModalState>
        <ListaOrganigrama />
    </OrganigramaModalState>
    </>
    )
}


export default Body;