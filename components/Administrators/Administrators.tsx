import { useContext, useEffect, useState } from "react";
import { CreateAdministrators } from "./Modals/createAdministrators";
import { UpdateAdministrators } from "./Modals/updateAdministrators";
import { createAdministratorsModal } from "../../context/AdministratorsContext/Actions";
import { DeleteAdministrators } from "./Modals/deleteAdministrators";
import { getAllAdmins } from "../../services/adminService";
import AdministratorsContext from "../../context/AdministratorsContext/AdministratorsContext";
import { MenuAdministrators } from "./MenuListAdministrators";
import styles from "./Administrators.module.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export const Administrators = (props: TabPanelProps) => {
  const { state, dispatch } = useContext(AdministratorsContext);
  const [adminList, setAdminList] = useState([]);

  const createModal = (id: string, createModal: boolean) => {
    createAdministratorsModal({ id, createModal }, dispatch);
  };

  const getAdmins = async (): Promise<void> => {
    const admins = await getAllAdmins();
    setAdminList(admins.data);
  };

  useEffect(() => {
    getAdmins();
    return () => {
      getAdmins();
    };
  }, [state._id]);

  console.log("HOLAAAAAA", state);
  return (
    <div className={styles.contenedorPrincipal}>
      <div className={styles.flex}>
        <div className={styles.textoTitulo}>Administradores</div>
        <div>
          <button
            className={`${styles.botonAgregar} ${styles.flex}`}
            onClick={() => createModal("1", true)}
          >
            <img
              className={styles.iconoBoton}
              src={`/assets/svg/icono-addPerson.svg`}
            />
            <div>
              <span className={styles.textoBoton}>Agregar administrador</span>
            </div>
          </button>
        </div>
      </div>
      <div className={styles.contenedorTabla}>
        <div className={`${styles.contenedorTituloTabla} ${styles.flex}`}>
          <div className={styles.columnaUnoTabla}>
            <span>Nombre</span>
          </div>
          <div className={styles.columnaDosTabla}>
            <span>Opciones</span>
          </div>
        </div>
        <div>
          <ul>
            {adminList.map((lis: any) => (
              <li className={`${styles.filaContenidoTabla} ${styles.flex}`}>
                <div className={styles.columnaUnoFlex}>
                  <img
                    src={lis.img ? lis.img : "/assets/svg/user-avatar.svg"}
                    alt="img"
                    className={styles.imagenColaborador}
                  />
                  <div className={styles.contenedorDatos}>
                    <div className={styles.nombreAdmin}>
                      <span>{lis.FullName}</span>
                    </div>
                    <div className={styles.correoAdmin}>
                      <span>{lis.Usuario}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <MenuAdministrators _id={lis.Usuario} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CreateAdministrators />
      <UpdateAdministrators />
      <DeleteAdministrators />
    </div>
  );
};
