import { EmpresasState, Empresa } from "../../interfaces/Empresa.interfaces";

type TodoAction = { type: "addEmpresa"; payload: Empresa };

export const empresaReducer = (state: EmpresasState, action: TodoAction) => {
  switch (action.type) {
    case "addEmpresa":
      return {
        ...state,
        empresas: [...state.empresa, action.payload],
      };

    default:
      return state;
  }
};
