import styles from "../../styles/MiEmpresa/InformacionGeneral.module.css";
import { useState, useContext, useEffect } from "react";
import { useFormik } from "formik"
import CrearEmpresa from "./Modals/CrearEmpresa"
import EmpresaContext from "../../context/Empresa/EmpresaContext"
import { openCreateEmpresaModal, openCreateSedeModal, openCreateProject } from "../../context/Empresa/Actions"
import CrearSede from "./Modals/CrearSede"
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_COMPANY, UPDATE_COMPANY, GET_ALL_SEDE, GET_ALL_PROJECT, GET_ALL_ENTERPRISE  } from "../../Querys/querys";
import moment from "moment";
import { postLogoCompanyAWS } from "../../services/candidateService";
import { SuccessfulAlert } from "../../alerts/successAlerts";
import { ErrorAlert } from "../../alerts/errorAlert";
import { Update } from "@material-ui/icons"
import MenuListaSedes from "./Modals/subMenus/Menus/MenuListaSede"
import EditaSede from "./Modals/EditaSede"
import EliminaSede from "./Modals/EliminaSede"
import CrearProyecto from "./Modals/CrearProyecto"
import EditaProject from "./Modals/EditaProjects"
import MenuListaProyectos from "./Modals/subMenus/Menus/MenuListProject"
import MenuListEmpresa from "./Modals/subMenus/Menus/MenuListEmpresa"
import EliminaProject from "./Modals/EliminaProject"
import EditaEmpresa from "./Modals/EditaEmpresa"

const InformacionGeneral = (props: any) => {
  const { state, dispatch } = useContext(EmpresaContext);
  const [editaCompania, setEditaCompania] = useState(false);
  const [botonActivo, setbotonActivo] = useState(false);
  const [company, setCompany] = useState<any>({});
  const [logo, setLogo] = useState<any>("");
  const [logoPreview, setLogoPreview] = useState<any>("");
  const [companyName, setCompanyName] = useState<any>("");
  const [fundationDate, setFundationDate] = useState<any>("");

  const { data: resultCompany } = useQuery(GET_ALL_COMPANY);
  const myCompany = resultCompany?.GET_ALL_COMPANY;

  const [updateCompany] = useMutation(UPDATE_COMPANY, {
    refetchQueries: [{ query: GET_ALL_COMPANY }],
  });

  useEffect(() => {
    if (myCompany) {
      console.log("myCompany", myCompany);
      setCompany(myCompany[0]);
      setCompanyName(myCompany[0].Name);
      setFundationDate(moment(myCompany[0].fundationDate).format("YYYY-MM-DD"));
      setLogoPreview(myCompany[0].logo);
    }
  }, [myCompany]);

  const handleUploadImage = (e: any) => {
    const file = e.target.files[0];
    // get a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setLogo(file);
  };

  const handleSubmit = async () => {
    let remove_file = false;
    if (logo) {
      remove_file = true;
    }

    let result = await postLogoCompanyAWS(
      logo,
      company.id,
      "LOGO_COMPANY",
      "LOGO_COMPANY",
      remove_file
    );

    debugger;
    const { data } = await updateCompany({
      variables: {
        updateCompanyId: company.id,
        input: {
          Name: companyName,
          logo: result.logo,
          fundationDate: fundationDate,
        },
      },
    });

    if (data) {
      setEditaCompania(false);
      SuccessfulAlert({ text: "Compa????a actualizada exitosamente!" });
    }else{
      ErrorAlert({ text: "Error al actualizar la compa????a!" });
    }
  };

  const abreCrearEmpresa = () => {
    openCreateEmpresaModal({createEmpresa: true}, dispatch)
  }
  
    const abreCrearSede = () =>{
    openCreateSedeModal({createSede: true}, dispatch)
  }

  const abreCrearProject = () =>{
    openCreateProject({createProject: true}, dispatch)
  }
  
    const {data: dataSede} = useQuery(GET_ALL_SEDE);
  const allSedes = dataSede?.GET_ALL_SEDE
  const {data: dataProyecto} = useQuery(GET_ALL_PROJECT)
  const allProyectos = dataProyecto?.GET_ALL_PROJECT 
  const {data: dataEmpresa} = useQuery(GET_ALL_ENTERPRISE)
  const allEmpresas = dataEmpresa?.GET_ALL_ENTERPRISE

  console.log('allEmpresas', allEmpresas)

  return(
    <>
    <div className={styles.contenedorPrincipal}>
      <div className={`${styles.contenedorCompania} ${styles.flex}`}>
        <div className={styles.contenedorInternoCompania}>
          <div className={`${styles.columnaCompania} ${styles.flex}`}>
            <div className={styles.contenedorLogoCompania}>
                {editaCompania === true ? (
                  <div className={styles.imageUpload}>
                    <label>
                      <input
                        type="file"
                        onChange={(e) => handleUploadImage(e)}
                      />
                      <img
                        src={logoPreview ? logoPreview : ""}
                        style={{
                          width: "68px",
                          height: "59px",
                          borderRadius: "15%",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <img
                    src={company?.logo ? company.logo : ""}
                    className={styles.logoCompania}
                    style={{
                      width: "68px",
                      height: "59px",
                      borderRadius: "15%",
                    }}
                  />
                )}
              </div>
            {editaCompania === true ? (
                <div className={styles.contenedorNombreCompania}>
                  <div className={styles.titulonombreCompania}>Nombre</div>
                  <div className={styles.contenedorInput}>
                    <input
                      className={styles.inputCompania}
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.contenedorNombreCompania}>
                  <div className={styles.titulonombreCompania}>Nombre</div>
                  <div className={styles.nombreCompania}>{company?.Name}</div>
                </div>
              )}
            </div>
        <div className={styles.columnaCompania}>
              {editaCompania === true ? (
                <div>
                  <div className={styles.titulonombreCompania}>
                    Fecha de fundaci??n
                  </div>
                  <div>
                    <input
                      type="date"
                      className={styles.inputFechaCompania}
                      value={fundationDate}
                      onChange={(e) => setFundationDate(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.titulonombreCompania}>
                    Fecha de fundaci??n
                  </div>
                  <div className={styles.nombreCompania}>
                    {company?.fundationDate
                      ? moment(company?.fundationDate).format("DD MMMM YYYY")
                      : ""}
                  </div>
                </div>
              )}
            </div>
          <div className={`${styles.columnaCompania} ${styles.flexAI}`}>
              {editaCompania === true ? (
                <button
                  className={styles.botonEditarCompania}
                  onClick={() => handleSubmit()}
                >
                  <div className={styles.iconoBotonEditar}></div>
                  Guardar
                </button>
              ) : (
                <button
                  className={styles.botonEditarCompania}
                  onClick={() => setEditaCompania(!editaCompania)}
                >
                  <div className={styles.iconoBotonEditar}></div>
                  Editar Informaci??n
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.contenedorHeaderMisEmpresas}>
          <div className={styles.tituloMisEmpresas}>Mis Empresas</div>
          <div>
            <button
              className={styles.botonAgregarEmpresa}
              onClick={() => abreCrearEmpresa()}
            >
              <div className={styles.iconoAgegarEmpresa}></div>
              <div className={styles.textoBotonAgregarEmpresa}>
                Agregar empresa
              </div>            </button>
          </div>
        </div>
      <div className={styles.contenedorEmpresas}>
        {allEmpresas?.map((empresa:any)=>(
          <div className={styles.empresa}>
            <div className={styles.lineaIzquierda}></div>
              <div className={styles.datosEmpresa}>
                <div className={styles.contenedorTituloEmpresa}>
                  <div className={styles.tituloEmpresa}>  
                    {empresa.name}
                  </div>
                  <div>
                    <MenuListEmpresa id={empresa.id}/>
                  </div>
                </div>
                <div className={styles.subtituloEmpresa}>
                  Raz&oacute;n social
                </div>
                    <div className={styles.datoEmpresa}>
                      {empresa.id}
                    </div>
                    <div className={styles.subtituloEmpresa}>
                      RFC
                    </div>
                    <div className={styles.datoEmpresa}>
                      {empresa.taxRegime}
                    </div>
                    <div className={styles.subtituloEmpresa}>
                      Cuenta bancaria
                    </div>
                    <div className={styles.datoEmpresa}>
                      {empresa.bankaccount}
                    </div>
                  </div>
                </div>
          ) 
        )}

      </div>
    </div>
    <div className={styles.contenedorSedes}>
      <div>
        <button 
          className={`${styles.botonSedesProyectos} ${botonActivo === true ?  styles.botonActivo : styles.botonInactivo}`}
          onClick={()=> setbotonActivo(!botonActivo)}
          >
          Sedes
        </button>
        <button 
          className={`${styles.botonSedesProyectos} ${botonActivo === false ?  styles.botonActivo : styles.botonInactivo}`}
          onClick={()=> setbotonActivo(!botonActivo)}
        >
          &Aacute;reas o proyectos
        </button>
      </div>
    </div>
    <div className={styles.contenedorTitulosSedes}>
      {(botonActivo === true)?
        <div className={styles.tituloSedesProyectos}>
          Sedes
        </div>
        :
        <div className={styles.tituloSedesProyectos}>
          Proyectos
        </div>
      }
        <div className={styles.contenedorBotonAgregarSede}>
          {(botonActivo === true)?
            <button 
              className={styles.botonAgregarSede}
              onClick={()=> abreCrearSede()}
              >
              <div className={styles.iconoAgregarSede}></div>
              <div>
                Agregar sede
              </div>
            </button>
          :
          <button 
            className={styles.botonAgregarProyecto}
            onClick={() => abreCrearProject()}
            >
            <div className={styles.iconoAgregarSede}></div>
            <div>
              Agregar &Aacute;reas o proyectos
            </div>
          </button>
          }
        </div>
      </div>
      {(botonActivo === true)?
      
      <div className={styles.contenedorTabla}>
      <table className={styles.tablaSedes}>
        <thead>
          <tr className={styles.tituloTabla}>
            <td className={styles.primerColumnaSedes}>Nombre de la Sede</td>
            <td className={styles.segundaColumnaSedes}>Opciones</td>
          </tr>
        </thead>
        <tbody>
          {allSedes?.map((sede:any)=>(
          <tr className={styles.datosTabla}>
            <td className={styles.primerColumnaSedes}>{sede.sedeName}</td>
            <td><MenuListaSedes id={sede.id} nombre={sede.sedeName}/></td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
    :
      <div className={styles.contenedorTabla}>
        <table className={styles.tablaSedes}>
          <thead>
            <tr className={styles.tituloTabla}>
              <td className={styles.primerColumnaAreas}>Nombre del &aacute;rea o proyecto</td>
              <td className={styles.segundaColumnaAreas}>Cliente</td>
              <td className={styles.terceraColumnaAreas}>Opciones</td>
            </tr>
          </thead>
          <tbody>
            {allProyectos?.map((proyecto:any) =>(
              <tr className={styles.datosTabla}>
              <td className={styles.primerColumnaAreas}>{proyecto.proyectName}</td>
              <td className={styles.segundaColumnaAreas}>{proyecto.client}</td>
              <td className={styles.terceraColumnaAreas}><MenuListaProyectos id={proyecto.id} nombre={proyecto.proyectName} cliente={proyecto.client}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }
    <CrearEmpresa />
    <CrearSede />
    <EditaSede />
    <EliminaSede />
    <CrearProyecto />
    <EditaProject />
    <EliminaProject />
    <EditaEmpresa />
    </>
  )
}

export default InformacionGeneral 