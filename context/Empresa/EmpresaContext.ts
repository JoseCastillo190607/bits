import { createContext,Dispatch } from "react"

type initialStateType  ={
  _id: string,
  createEmpresa: boolean,
  updateEmpresa: boolean,
  createSede: boolean,
  updateSede: boolean,
  nombreSede: string,
  deleteSede: boolean,
  createProject: boolean,
  updateProject: boolean,
  deleteProject: boolean,
  nombreProject: string,
  clienteProject: string,
  tabUno: boolean,
  tabDos: boolean,
  tabTres: boolean,
  identidadLegal:{
    nombre: string,
    razonSocial: string,
    logo: any,
    rfc: string,
    regimenFiscal: string,
    direccion: string,
    estado: string,
    codigoPostal: string
  },
  informacionBancaria:{
    cuentaBancaria: String,
    cuentaSTP: String
    cuentaClabeSTP: string
  },
  certificadoLlaves:{
    imss: any,
    sello: any,
    password: any
  },
  registroPatronal: any,
  primaRiesgo: any
}

type ModalPartial = {
  state: initialStateType,
  dispatch: Dispatch<any>
}

export const initialState ={
  _id: '',
  createEmpresa: false,
  updateEmpresa: false,
  createSede: false,
  updateSede: false,
  nombreSede: '',
  deleteSede: false,
  createProject: false,
  updateProject: false,
  deleteProject: false,
  nombreProject: '',
  clienteProject: '',
  tabUno: false,
  tabDos: false, 
  tabTres: false,
  identidadLegal:{
    nombre: '',
    razonSocial: '',
    logo: '',
    rfc: '',
    regimenFiscal: '',
    direccion: '',
    estado: '',
    codigoPostal:''
  },
  informacionBancaria:{
    cuentaBancaria: '',
    cuentaSTP: '',
    cuentaClabeSTP: ''
  },
  certificadoLlaves:{
    imss: '',
    sello: '',
    password: ''
  },
  registroPatronal:[],
  primaRiesgo:[]
}

export enum Types{
  CREATE_EMPRESA = "CREATE_EMPRESA",
  CLEAR_EMPRESA = "CLEAR_EMPRESA",
  UPDATE_TAB_UNO = "UPDATE_TAB_UNO",
  UPDATE_TAB_DOS = "UPDATE_TAB_DOS" ,
  UPDATE_TAB_TRES = "UPDATE_TAB_TRES",
  UPDATE_REGISTRO_PATRONAL = "UPDATE_REGISTRO_PATRONAL",
  CREATE_SEDE = "CREATE_SEDE",
  UPDATE_SEDE = "UPDATE_SEDE",
  DELETE_SEDE = "DELETE_SEDE",
  CREATE_PROJECT = "CREATE_PROJECT",
  UPDATE_PROJECT = "UPDATE_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  UPDATE_EMPRESA = "UPDATE_EMPRESA"
}

const ModalInitialState ={
  state: initialState,
  dispatch:() => null
}

const EmpresaContext = createContext<ModalPartial>(ModalInitialState)
export default EmpresaContext