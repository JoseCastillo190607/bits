import {ChangeEvent,useEffect,useState  } from 'react';
import OrganigramaModalState from "../context/OrganigramaContext/OrganigramaModalState";

import { Box, Grid} from "@material-ui/core";
import Body from "../components/Organigrama/Body"
import '../components/Organigrama/Organigrama.css'

const OrganigramaScreen = () =>{

    useEffect(()=>{
      console.log('render!')
  },[])

  const [tab, setTab] = useState(0);
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
      setTab(newValue)
      localStorage.setItem('currentPill', String(newValue));
  };

  useEffect(() => {
      let pill = localStorage.getItem('currentPill');
      if (pill) setTab(Number(pill));
      else setTab(0);
  }, [tab]);

    return(
        <div>
        <div className="tituloBoton">
            <Box mt={3} ml={5} className="Title">
                Organigrama
            </Box>
        </div>
        <div className="contenedor2">
              <OrganigramaModalState>
                <Body />
              </OrganigramaModalState>
        </div>
      </div>
    )
}

export default OrganigramaScreen;