import { ChangeEvent, Dispatch } from "react";
import { Types } from "../../context/CollaboratorContext/CollaboratorContext";
import {
  validateContacts,
  validateDatosPago,
  validateExpedient,
  validateInformation,
  validateSection,
  validateInformationDatosPersonales,
  validateSection2,
} from "./Fields";

export const updateData = async (
  e: ChangeEvent<{ name: string; value: unknown }>,
  state: any,
  dispatch: Dispatch<any>,
  index: number
): Promise<void> => {
  console.log("target",state.collaborator);
  if (e.target.value !== "")
  state.collaborator[e.target.name] = e.target.value;
else state.collaborator[e.target.name] = undefined;
  // switch (index) {
  //   case 0:
  //     if (e.target.value !== "")
  //       state.collaborator[e.target.name] = e.target.value;
  //     else state.collaborator[e.target.name] = undefined;
  //     break;
  //   // case 1:
  //   //     if (e.target.name === "FechaNacimiento") {
  //   //         if (e.target.value !== '') state.collaborator[e.target.name] = e.target.value;
  //   //         else state.collaborator[e.target.name] = undefined;
  //   //     } else {
  //   //         if (e.target.value !== '') state.collaborator.DatosPersonales[e.target.name] = e.target.value;
  //   //         else state.collaborator.DatosPersonales[e.target.name] = undefined;
  //   //     }
  //   //     break
  //   // case 2: // Contactos parte Beneficiario
  //   //     if (e.target.value !== '') state.collaborator.Contactos.Beneficiario[e.target.name] = e.target.value;
  //   //     else state.collaborator.Contactos.Beneficiario[e.target.name] = undefined;
  //   //     break;
  //   // case 3: // Contactos parte Contacto de Emergencia
  //   //     if (e.target.value !== '') state.collaborator.Contactos.ContactoEmergencia[e.target.name] = e.target.value;
  //   //     else state.collaborator.Contactos.ContactoEmergencia[e.target.name] = undefined;
  //   //     break;
  //   // case 4: // Contactos parte Contacto Enfermedades
  //   //     if (e.target.value !== '') state.collaborator.Contactos.Enfermedades[e.target.name] = e.target.value;
  //   //     else state.collaborator.Contactos.Enfermedades[e.target.name] = undefined;
  //   //     break;
  //   // case 5: // Contactos parte Datos de pago
  //   //     if (e.target.value !== '') state.collaborator.DatosPago[e.target.name] = e.target.value;
  //   //     else state.collaborator.DatosPago[e.target.name] = undefined;
  //   //     break;
  //   // case 6: // Expediente
  //   //     if (e.target.value !== '') state.collaborator.Archivos[e.target.name] = e.target.value;
  //   //     else state.collaborator.DatosPago[e.target.name] = undefined;
  //   //     break;
  // }
  updateCollaborator(state.collaborator, dispatch);
  // await ValidateSection(state, index, dispatch);
};

export const updateFile = async (
  files: any,
  state: any,
  dispatch: Dispatch<any>
): Promise<void> => {
  state.collaborator["Archivos"] = {};
  await updateCollaborator(state.collaborator, dispatch);
  state.collaborator["Archivos"]["CartaOferta"] = files[0];
  await updateCollaborator(state.collaborator, dispatch); 
  await ValidateSection(state, 0, dispatch);
};

const updateCollaborator = (
  collaborator: any,
  dispatch: Dispatch<any>
): void => {
  dispatch({
    type: Types.UPDATE_COLLABORATOR,
    payload: {
      collaborator,
    },
  });
};

export const ValidateSection = async (
  state: any,
  index: number,
  dispatch: Dispatch<any>
): Promise<void> => {
  let tab = "1"; // Informacion de Alta
  if (index === 1) tab = "2"; // Datos Personales
  if (index === 2 || index === 3 || index === 4) tab = "3"; // Contactos
  if (index === 5) tab = "4"; // Banco
  if (index === 6) tab = "5"; // Expediente
  await fetchingData(state.collaborator, dispatch, tab);
};

const fetchingData = async (
  user: any,
  dispatch: Dispatch<any>,
  tab: string,
  temp: Array<number> = [0, 0, 0, 0, 0]
) => {
  let steps: Array<any> = [];
  let sections: number = 3;
  let tempSections: Array<any> = [];
  switch (tab) {
    case "1":
      steps = [
        { start: 0, end: 4 },
        { start: 4, end: 11 },
        { start: 11, end: 20 },
      ];
      tempSections = await fetchindDataSections(sections, user, steps, 0);
      break;
    case "2":
      steps = [
        { start: 0, end: 7 },
        { start: 7, end: 12 },
        { start: 12, end: 16 },
      ];
      tempSections = await fetchindDataSections(sections, user, steps, 1);
      break;
    case "3":
      steps = [
        { start: 0, end: 10 },
        { start: 10, end: 15 },
        { start: 15, end: 19 },
      ];
      tempSections = await fetchindDataSections(
        sections,
        user.Contactos?.Beneficiario || {},
        steps,
        2
      ); // Seccion Contacto de Beneficiario
      tempSections[1] = (
        await fetchindDataSections(
          sections,
          user.Contactos?.ContactoEmergencia || {},
          steps,
          2
        )
      )[1]; // Seccion Contacto de Emergencia
      tempSections[2] = (
        await fetchindDataSections(
          sections,
          user.Contactos?.Enfermedades || {},
          steps,
          2
        )
      )[2]; // Seccion Contacto de Enfermedades
      break;
    case "4":
      steps = [{ start: 0, end: 4 }];
      sections = 1;
      tempSections = await fetchindDataSections2(
        sections,
        user.DatosPago || {},
        steps,
        3,
        user.Archivos || {}
      );
      break;
    case "5":
      steps = [
        { start: 0, end: 8 },
        { start: 10, end: 12 },
        { start: 8, end: 10 },
      ];
      tempSections = await fetchindDataSections(
        sections,
        user.Archivos || {},
        steps,
        4
      );
      break;
  }

  // temp[0] = await validateInformation(user, 21); // Informacion de Alta
  temp[1] = await validateInformationDatosPersonales(
    user?.DatosPersonales || {},
    16
  );
  let contacts = await validateContacts(
    user?.Contactos?.Beneficiario || {},
    15
  ); // Contactos Beneficiario
  contacts += await validateContacts(
    user?.Contactos?.ContactoEmergencia || {},
    15
  ); // Contactos Contacto de Emergencia
  temp[2] = contacts;

  temp[3] = await validateDatosPago(
    user?.DatosPago || {},
    4,
    user?.Archivos || {}
  ); // Datos de pago

  temp[4] = await validateExpedient(user?.Archivos || {}, 9); // Expediente

  dispatch({
    type: Types.SET_COLLABORATOR,
    payload: {
      progress: [...temp],
      sections: [...tempSections],
    },
  });
  return temp;
};

const fetchindDataSections = async (
  sections: number,
  user: any,
  steps: Array<any>,
  index: number
) => {
  let tempSections = [0, 0, 0, 0];
  
  for (let i = 0; i < sections; i++) {
    let section = await validateSection(
      user,
      steps[i].start,
      steps[i].end,
      index
    );

    tempSections[i] = section;
  }
  return tempSections;
};

const fetchindDataSections2 = async (
  sections: number,
  user: any,
  steps: Array<any>,
  index: number,
  archivos: any
) => {
  let tempSections = [0, 0, 0, 0];
  for (let i = 0; i < sections; i++) {
    let section = await validateSection2(
      user,
      steps[i].start,
      steps[i].end,
      index,
      archivos
    );
    tempSections[i] = section;
  }
  return tempSections;
};

const fetchingAllData = async (
  user: any,
  dispatch: Dispatch<any>,
  tab: string
) => {
  await fetchingData(user, dispatch, tab);
};

export { fetchingData, updateCollaborator, fetchingAllData };
