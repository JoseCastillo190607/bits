import { useContext} from 'react'
import AdminPermisosContext from '../../../context/AdminContext/AdminPermisosContext/AdminPermisosContext';
import IOSSwitch from './Switch';
import BpCheckbox from './BpCheckbox'
import Accordion from '@material-ui/core';
import AccordionSummary from '@material-ui/core';
import AccordionDetails from '@material-ui/core';
import {Box} from '@material-ui/core'



const BaseAccordion = () =>{

    const {state} = useContext(AdminPermisosContext)

    return (
        <div className="contenedor_Permisos">
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Estructura de equipo
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                    <IOSSwitch 
                        NombreCampo={'EstructuraEquipo.Ver'}
                        Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Ver}
                        Modulo={'EstructuraEquipo'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Sedes</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                                <BpCheckbox
                                    NombreCampo={'EstructuraEquipo.Sedes.Ver'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Sedes?.Ver}    
                                    Modulo={'EstructuraEquipo'}
                                />
                                    <span className=''>Ver</span>
                                <BpCheckbox 
                                    NombreCampo={'EstructuraEquipo.Sedes.Editar'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Sedes?.Editar}
                                    Modulo={'EstructuraEquipo'}
                                />
                                    <span className=''>Editar</span>
                                    <BpCheckbox 
                                    NombreCampo={'EstructuraEquipo.Sedes.Eliminar'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Sedes?.Eliminar}
                                    Modulo={'EstructuraEquipo'}
                                /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Clientes</span>
                            </div>
                        </Box>
                        <Box>
                        <div>
                            <BpCheckbox
                                NombreCampo={'EstructuraEquipo.Clientes.Ver'}
                                Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Clientes?.Ver}    
                                Modulo={'EstructuraEquipo'}
                            />
                                <span className=''>Ver</span>
                            <BpCheckbox 
                                NombreCampo={'EstructuraEquipo.Clientes.Editar'}
                                Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Clientes?.Editar}
                                Modulo={'EstructuraEquipo'}
                            />
                                <span className=''>Editar</span>
                                <BpCheckbox 
                                NombreCampo={'EstructuraEquipo.Clientes.Eliminar'}
                                Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Clientes?.Eliminar}
                                Modulo={'EstructuraEquipo'}
                            /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>                
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Proyectos</span>
                            </div>
                        </Box>
                        <Box>
                        <div>
                                <BpCheckbox
                                    NombreCampo={'EstructuraEquipo.Proyectos.Ver'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Proyectos?.Ver}    
                                    Modulo={'EstructuraEquipo'}
                                />
                                    <span className=''>Ver</span>
                                <BpCheckbox 
                                    NombreCampo={'EstructuraEquipo.Proyectos.Editar'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Proyectos?.Editar}
                                    Modulo={'EstructuraEquipo'}
                                />
                                    <span className=''>Editar</span>
                                    <BpCheckbox 
                                    NombreCampo={'EstructuraEquipo.Proyectos.Eliminar'}
                                    Value={state.Permisos?.Permisos?.Modulos?.EstructuraEquipo?.Proyectos?.Eliminar}
                                    Modulo={'EstructuraEquipo'}
                                /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Colaboradores
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                        <IOSSwitch 
                            NombreCampo={'Colaboradores.Acceso'}
                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Acceso}
                            Modulo={'Colaboradores'}/> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Accordion className='contenedor SegundoNivel'>
                        <Box className="flex">
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='lista_Permisos flex SegundoNivel'
                            >
                                <span className='DashBoardElements'>
                                    <Box className='Arrow inline'>
                                        <span className='svgFlechaUp'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                            </svg>
                                        </span>
                                    </Box>
                                    <span className='titulosDashboard'>
                                        Nuevo Ingreso
                                    </span>
                                </span>                                           
                            </AccordionSummary>
                            <Box className="switch">
                                <IOSSwitch
                                    NombreCampo={'Colaboradores.NuevoIngreso.Acceso'}
                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Acceso}
                                    Modulo={'Colaboradores'}/>
                            </Box>
                        </Box>
                        <AccordionDetails>
                            <Box className=" contenedor lista_Permisos TercerNivel flex">
                                <Box className='radiosElements'>
                                    <div>
                                        <span className=''>Acciones</span>
                                    </div>
                                </Box>
                                <Box>
                                    <div>
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.NuevoIngreso.Agregar'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Agregar}
                                        Modulo={'Colaboradores'}
                                    />
                                    <span className=''>Agregar</span>
                                        
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.NuevoIngreso.Convertir'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Convertir}
                                        Modulo={'Colaboradores'}/><span className=''>Convertir</span>
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.NuevoIngreso.Declinar'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Declinar}
                                        Modulo={'Colaboradores'}/>
                                    <span className=''>Declinar</span>
                                    </div>
                                </Box>  
                            </Box>
                            <Box>
                                <Accordion className='contenedor TercerNivel'>
                                    <Box className="flex">
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className='lista_Permisos flex TercerNivel'
                                        >
                                            <span className='DashBoardElements'>
                                                <Box className='Arrow inline'>
                                                    <span className='svgFlechaUp'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                        </svg>
                                                    </span>
                                                </Box>
                                                <span className='titulosDashboard'>
                                                    Menus
                                                </span>
                                            </span>                                           
                                        </AccordionSummary>
                                            <Box className="switch">
                                            <IOSSwitch
                                                NombreCampo={'Colaboradores.NuevoIngreso.Ver.Acceso'}
                                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Acceso}
                                                Modulo={'Colaboradores'}/>
                                            </Box>
                                    </Box>
                                    <AccordionDetails>
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                        <span className='titulosDashboard'>
                                                            Informaci???n Alta
                                                        </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n Personal</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                        <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.InformacionPersonal.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.InformacionPersonal?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.InformacionPersonal.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.InformacionPersonal?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
        
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Ingreso</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosIngreso.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosIngreso?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosIngreso.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosIngreso?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Contrataci???n</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosContratacion.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosContratacion?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.InformacionAlta.DatosContratacion.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosContratacion?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>                                            
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Personales
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Domicilio</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosDomicilio.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosDomicilio?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosDomicilio.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosDomicilio?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosPersonales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosPersonales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosPersonales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Identidad</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosIdentidad.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosIdentidad?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosPersonales.DatosIdentidad.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosPersonales?.DatosIdentidad?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>     
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Salud Emergencias
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Beneficiario</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Beneficiario.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.Beneficiario?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.Beneficiario.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.Beneficiario?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                    </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Contacto Emergencia</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.ContactoEmergencia.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.ContactoEmergencia?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.ContactoEmergencia.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.ContactoEmergencia?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n M???dica</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.InformacionMedica.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.InformacionMedica?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.SaludEmergencias.InformacionMedica.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.SaludEmergencias?.InformacionMedica?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Para Pago
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosParaPago.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosParaPago?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Bancarios</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosParaPago.DatosBancarios.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosParaPago?.DatosBancarios?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.DatosParaPago.DatosBancarios.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.DatosParaPago?.DatosBancarios?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>       
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                               Expediente
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosPersonales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosPersonales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosPersonales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Opcionales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosOpcionales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosOpcionales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.DocumentosOpcionales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.DocumentosOpcionales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Oferta Laboral</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.OfertaLaboral.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.OfertaLaboral?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.NuevoIngreso.Ver.Expediente.OfertaLaboral.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.Expediente?.OfertaLaboral?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>                                         
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='contenedor SegundoNivel'>
                        <Box className="flex">
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='lista_Permisos flex SegundoNivel'
                            >
                                <span className='DashBoardElements'>
                                    <Box className='Arrow inline'>
                                        <span className='svgFlechaUp'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                            </svg>
                                        </span>
                                    </Box>
                                    <span className='titulosDashboard'>
                                        Colaboradores
                                    </span>
                                </span>                                           
                            </AccordionSummary>
                            <Box className="switch">
                                <IOSSwitch
                                    NombreCampo={'Colaboradores.Colaboradores.Acceso'}
                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Acceso}
                                    Modulo={'Colaboradores'}/>
                            </Box>
                        </Box>
                        <AccordionDetails>
                            <Box className=" contenedor lista_Permisos TercerNivel flex">
                                <Box className='radiosElements'>
                                    <div>
                                        <span className=''>Acciones</span>
                                    </div>
                                </Box>
                                <Box>
                                    <div>
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.Colaboradores.Agregar'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Agregar}
                                        Modulo={'Colaboradores'}
                                    />
                                    <span className=''>Agregar</span>
                                        
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.Colaboradores.Inactivar'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Inactivar}
                                        Modulo={'Colaboradores'}/><span className=''>Inactivar</span>
                                    </div>
                                </Box>  
                            </Box>
                            <Box>
                                <Accordion className='contenedor TercerNivel'>
                                    <Box className="flex">
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className='lista_Permisos flex TercerNivel'
                                        >
                                            <span className='DashBoardElements'>
                                                <Box className='Arrow inline'>
                                                    <span className='svgFlechaUp'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                        </svg>
                                                    </span>
                                                </Box>
                                                <span className='titulosDashboard'>
                                                    Menus
                                                </span>
                                            </span>                                           
                                        </AccordionSummary>
                                            <Box className="switch">
                                            <IOSSwitch
                                                NombreCampo={'Colaboradores.Colaboradores.Ver.Acceso'}
                                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Acceso}
                                                Modulo={'Colaboradores'}/>
                                            </Box>
                                    </Box>
                                    <AccordionDetails>
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                        <span className='titulosDashboard'>
                                                            Informaci???n Alta
                                                        </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n Personal</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                        <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.InformacionPersonal.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.InformacionPersonal?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.InformacionPersonal.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.InformacionAlta?.InformacionPersonal?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Ingreso</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.DatosIngreso.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosIngreso?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.DatosIngreso.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosIngreso?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Contrataci???n</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.DatosContratacion.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosContratacion?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.InformacionAlta.DatosContratacion.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.NuevoIngreso?.Ver?.InformacionAlta?.DatosContratacion?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>                                            
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Personales
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Domicilio</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosDomicilio.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosDomicilio?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosDomicilio.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosDomicilio?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosPersonales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosPersonales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosPersonales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Identidad</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosIdentidad.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosIdentidad?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosPersonales.DatosIdentidad.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosPersonales?.DatosIdentidad?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>     
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Salud Emergencias
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Beneficiario</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.Beneficiario.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.Beneficiario?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.Beneficiario.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.Beneficiario?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Contacto Emergencia</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.ContactoEmergencia.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.ContactoEmergencia?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.ContactoEmergencia.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.ContactoEmergencia?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n M???dica</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.InformacionMedica.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.InformacionMedica?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.SaludEmergencias.InformacionMedica.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.SaludEmergencias?.InformacionMedica?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Para Pago
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Colaboradores.Ver.DatosParaPago.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosParaPago?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Bancarios</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosParaPago.DatosBancarios.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosParaPago?.DatosBancarios?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.DatosParaPago.DatosBancarios.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.DatosParaPago?.DatosBancarios?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>       
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                               Expediente
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.DocumentosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosPersonales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.DocumentosPersonales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosPersonales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Opcionales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.DocumentosOpcionales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosOpcionales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.DocumentosOpcionales.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.DocumentosOpcionales?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Oferta Laboral</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.OfertaLaboral.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.OfertaLaboral?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Colaboradores.Ver.Expediente.OfertaLaboral.Editar'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Colaboradores?.Ver?.Expediente?.OfertaLaboral?.Editar}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Editar</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>                                         
                                    </AccordionDetails>
                                </Accordion>
                            </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='contenedor SegundoNivel'>
                    <Box className="flex">
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className='lista_Permisos flex SegundoNivel'
                        >
                            <span className='DashBoardElements'>
                                <Box className='Arrow inline'>
                                    <span className='svgFlechaUp'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                        </svg>
                                    </span>
                                </Box>
                                <span className='titulosDashboard'>
                                    Declinados
                                </span>
                            </span>                                           
                        </AccordionSummary>
                            <Box className="switch">
                            <IOSSwitch
                                    NombreCampo={'Colaboradores.Declinados.Ver'}
                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Declinados?.Ver}
                                    Modulo={'Colaboradores'}/>
                        </Box>
                    </Box>
                </Accordion>
                <Accordion className='contenedor SegundoNivel'>
                        <Box className="flex">
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='lista_Permisos flex SegundoNivel'
                            >
                                <span className='DashBoardElements'>
                                    <Box className='Arrow inline'>
                                        <span className='svgFlechaUp'>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                            </svg>
                                        </span>
                                    </Box>
                                    <span className='titulosDashboard'>
                                        Inactivos
                                    </span>
                                </span>                                           
                            </AccordionSummary>
                            <Box className="switch">
                                <IOSSwitch
                                    NombreCampo={'Colaboradores.Inactivos.Acceso'}
                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Acceso}
                                    Modulo={'Colaboradores'}/>
                            </Box>
                        </Box>
                        <AccordionDetails>
                            <Box className=" contenedor lista_Permisos TercerNivel flex">
                                <Box className='radiosElements'>
                                    <div>
                                        <span className=''>Acciones</span>
                                    </div>
                                </Box>
                                <Box>
                                    <div>
                                    <BpCheckbox 
                                        NombreCampo={'Colaboradores.Inactivos.Activar'}
                                        Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Activar}
                                        Modulo={'Colaboradores'}
                                    />
                                    <span className=''>Activar</span>
                                    </div>
                                </Box>  
                            </Box>
                            <Box>
                                <Accordion className='contenedor TercerNivel'>
                                    <Box className="flex">
                                        <AccordionSummary
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            className='lista_Permisos flex TercerNivel'
                                        >
                                            <span className='DashBoardElements'>
                                                <Box className='Arrow inline'>
                                                    <span className='svgFlechaUp'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                        </svg>
                                                    </span>
                                                </Box>
                                                <span className='titulosDashboard'>
                                                    Menus
                                                </span>
                                            </span>                                           
                                        </AccordionSummary>
                                            <Box className="switch">
                                            <IOSSwitch
                                                NombreCampo={'Colaboradores.Inactivos.Ver.Acceso'}
                                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.Acceso}
                                                Modulo={'Colaboradores'}/>
                                            </Box>
                                    </Box>
                                    <AccordionDetails>
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                        <span className='titulosDashboard'>
                                                            Informaci???n Alta
                                                        </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Inactivos.Ver.InformacionAlta.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n Personal</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                        <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.InformacionAlta.InformacionPersonal.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.InformacionPersonal?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Ingreso</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.InformacionAlta.DatosIngreso.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.DatosIngreso?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Contrataci???n</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.InformacionAlta.DatosContratacion.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.InformacionAlta?.DatosContratacion?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>                                            
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Personales
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Inactivos.Ver.DatosPersonales.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.Acceso}
                                                    Modulo={'Colaboradores'}/>
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Domicilio</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.DatosPersonales.DatosDomicilio.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosDomicilio?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.DatosPersonales.DatosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosDomicilio?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Identidad</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.DatosPersonales.DatosIdentidad.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosPersonales?.DatosIdentidad?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>

                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>     
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Salud Emergencias
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Inactivos.Ver.SaludEmergencias.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Beneficiario</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.SaludEmergencias.Beneficiario.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.Beneficiario?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Contacto Emergencia</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.SaludEmergencias.ContactoEmergencia.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.ContactoEmergencia?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Informaci???n M???dica</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.SaludEmergencias.InformacionMedica.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.SaludEmergencias?.InformacionMedica?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>  
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                                Datos Para Pago
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Inactivos.Ver.DatosParaPago.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosParaPago?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Datos Bancarios</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.DatosParaPago.DatosBancarios.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.DatosParaPago?.DatosBancarios?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>       
                                        <Accordion className='contenedor CuartoNivel'>
                                            <Box className="flex">
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    className='lista_Permisos flex CuartoNivel'
                                                >
                                                    <span className='DashBoardElements'>
                                                        <Box className='Arrow inline'>
                                                            <span className='svgFlechaUp'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                                                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                                                </svg>
                                                            </span>
                                                        </Box>
                                                            <span className='titulosDashboard'>
                                                               Expediente
                                                            </span>
                                                    </span>                                           
                                                </AccordionSummary>
                                                <Box className="switch">
                                                <IOSSwitch
                                                    NombreCampo={'Colaboradores.Inactivos.Ver.Expediente.Acceso'}
                                                    Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.Acceso}
                                                    Modulo={'Colaboradores'}/> 
                                                </Box>
                                            </Box>
                                            <AccordionDetails>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Personales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.Expediente.DocumentosPersonales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.DocumentosPersonales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Documentos Opcionales</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.Expediente.DocumentosOpcionales.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.DocumentosOpcionales?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                                <Box className=" contenedor lista_Permisos QuintoNivel flex">
                                                    <Box className='radiosElements'>
                                                        <div>
                                                            <span className=''>Oferta Laboral</span>
                                                        </div>
                                                    </Box>
                                                    <Box>
                                                    <div>
                                                        <BpCheckbox 
                                                            NombreCampo={'Colaboradores.Inactivos.Ver.Expediente.OfertaLaboral.Ver'}
                                                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Inactivos?.Ver?.Expediente?.OfertaLaboral?.Ver}
                                                            Modulo={'Colaboradores'}
                                                        /><span className=''>Ver</span>
                                                        </div>
                                                    </Box>  
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>          
                                                                       
                                    </AccordionDetails>
                                </Accordion>
                                
                            </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion className='contenedor SegundoNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex SegundoNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Administradores
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                    <IOSSwitch 
                            NombreCampo={'Colaboradores.Administradores.Acceder'}
                            Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Administradores?.Acceder}
                            Modulo={'Colaboradores'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos TercerNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Acciones</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                            <BpCheckbox 
                                NombreCampo={'Colaboradores.Administradores.Agregar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Administradores?.Agregar}
                                Modulo={'Colaboradores'}
                            /><span className=''>Agregar</span>
                            <BpCheckbox 
                                NombreCampo={'Colaboradores.Administradores.Editar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Administradores?.Editar}
                                Modulo={'Colaboradores'}
                            /><span className=''>Editar</span>
                            <BpCheckbox 
                                NombreCampo={'Colaboradores.Administradores.Eliminar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Colaboradores?.Administradores?.Eliminar}
                                Modulo={'Colaboradores'}
                            /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            </AccordionDetails>

        </Accordion>
        <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                My Mood
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                    <IOSSwitch 
                        NombreCampo={'MyMood.Ver'}
                        Value={state.Permisos?.Permisos?.Modulos?.MyMood?.Ver}
                        Modulo={'MyMood'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Acciones</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                            <BpCheckbox 
                                NombreCampo={'MyMood.Estadisticas'}
                                Value={state.Permisos?.Permisos?.Modulos?.MyMood?.Estadisticas}
                                Modulo={'MyMood'}
                            /><span className=''>Estad???sticas</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Notificaciones
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                        <IOSSwitch 
                            NombreCampo={'Notificaciones.Ver'}
                            Value={state.Permisos?.Permisos?.Modulos?.Notificaciones?.Ver}
                            Modulo={'Notificaciones'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Acciones</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                            <BpCheckbox 
                                NombreCampo={'Notificaciones.Agregar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Notificaciones?.Agregar}
                                Modulo={'Notificaciones'}
                            /><span className=''>Agregar</span>
                            <BpCheckbox 
                                NombreCampo={'Notificaciones.Reenviar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Notificaciones?.Reenviar}
                                Modulo={'Notificaciones'}
                            /><span className=''>Reenviar</span>
                            <BpCheckbox 
                                NombreCampo={'Notificaciones.Eliminar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Notificaciones?.Eliminar}
                                Modulo={'Notificaciones'}
                            /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Noticias
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                    <IOSSwitch 
                            NombreCampo={'Noticias.Ver'}
                            Value={state.Permisos?.Permisos?.Modulos?.Noticias?.Ver}
                            Modulo={'Noticias'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Acciones</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                            <BpCheckbox 
                                NombreCampo={'Noticias.Agregar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Noticias?.Agregar}
                                Modulo={'Noticias'}
                            /><span className=''>Agregar</span>
                                                            <BpCheckbox 
                                NombreCampo={'Noticias.VistaPrevia'}
                                Value={state.Permisos?.Permisos?.Modulos?.Noticias?.VistaPrevia}
                                Modulo={'Noticias'}
                            /><span className=''>Vista Previa</span>
                            <BpCheckbox 
                                NombreCampo={'Noticias.Editar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Noticias?.Editar}
                                Modulo={'Noticias'}
                            /><span className=''>Editar</span>
                            <BpCheckbox 
                                NombreCampo={'Noticias.Eliminar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Noticias?.Eliminar}
                                Modulo={'Noticias'}
                            /><span className=''>Eliminar</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                Calendario
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                    <IOSSwitch 
                            NombreCampo={'Calendario.Ver'}
                            Value={state.Permisos?.Permisos?.Modulos?.Calendario?.Ver}
                            Modulo={'Calendario'}
                        /> 
                    </Box>
                </Box>
                <AccordionDetails>
                    <Box className="lista_Permisos SegundoNivel flex">
                        <Box className='radiosElements'>
                            <div>
                                <span className=''>Acciones</span>
                            </div>
                        </Box>
                        <Box>
                            <div>
                            <BpCheckbox 
                                NombreCampo={'Calendario.Agregar'}
                                Value={state.Permisos?.Permisos?.Modulos?.Calendario?.Agregar}
                                Modulo={'Calendario'}
                            /><span className=''>Agregar</span>
                            </div>
                        </Box>  
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion className='contenedor PrimerNivel'>
                <Box className="flex">
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='lista_Permisos flex PrimerNivel'
                    >
                        <span className='DashBoardElements'>
                            <Box className='Arrow inline'>
                                <span className='svgFlechaUp'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                                    </svg>
                                </span>
                            </Box>
                            <span className='titulosDashboard'>
                                FeedBack
                            </span>
                        </span>                                           
                    </AccordionSummary>
                    <Box className="switch">
                        <IOSSwitch 
                            NombreCampo={'FeedBack.Ver'}
                            Value={state.Permisos?.Permisos?.Modulos?.FeedBack?.Ver}
                            Modulo={'Feedback'}
                        /> 
                    </Box>
                </Box>
            </Accordion>
      </div>
    );
}
export default BaseAccordion