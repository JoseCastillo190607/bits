import axios from 'axios';
import { useReducer } from 'react';
import { AppRouter } from './routers/AppRouter';
import { AdminContext } from './context/AdminContext/AdminContext';
import { adminReducer } from './context/AdminContext/adminReducer';
import { server } from './global/server';
import AdminPermisosContex from './context/AdminContext/AdminPermisosContext/AdminPermisosState'
import IncidenciasContext from './context/IncidenciasContext/IncidenciasState'
import PayrollProcessContext from './context/PayrollProcess/PayrollProcessState'
import SettlementProcessContext from './context/PayrollProcess/SettlementProcessState'
import EmpresaContext from './context/Empresa/EmpresaState';
import EventualProcessState from './context/PayrollProcess/EventualProcessState'

axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;

function App() {
  const [adminState, adminDispatch] = useReducer(adminReducer, { loading: true });

  return (
    <AdminContext.Provider value={{
      adminState,
      adminDispatch
    }}>
      <EmpresaContext>
        <EventualProcessState>
          <SettlementProcessContext>
            <IncidenciasContext>
              <AdminPermisosContex>
                <PayrollProcessContext>
                  <AppRouter />
                </PayrollProcessContext>
              </AdminPermisosContex>
            </IncidenciasContext>
          </SettlementProcessContext>
        </EventualProcessState>
        </EmpresaContext> 
      </AdminContext.Provider>

  );
}

export default App;
