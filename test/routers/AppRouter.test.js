import { mount } from 'enzyme';
import { AdminContext } from '../../context/AdminContext/AdminContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Testing <AppRouter />', () => {

    let adminContext = {
        dispatch: jest.fn(),
        adminState: {
            logged: false
        }
    }

    // Congigure Context
    test('Snapshot when admin is not authenticated', () => {
        /*
                const wrapper = mount(
                    <AdminContext.Provider value={adminContext}>
                        <AppRouter />
                    </AdminContext.Provider>
                );
                expect(wrapper).toMatchSnapshot(); */
    });
    /*
        test('Show button google when admin is not authenticated', () => {
    
            // adminContext.adminState.logged = false
    
            const wrapper = mount(
                <AdminContext.Provider value={adminContext}>
                    <AppRouter />
                </AdminContext.Provider>
            );
            const element = wrapper.find('#GoogleButton').exists();
    
            expect(element).toBe(true);
        });
    
        test('Snapshot when admin is authenticated', () => {
    
            adminContext.adminState.logged = true
            adminContext.adminState.Nombre = "Jonathan Hernández"
    
            const wrapper = mount(
                <AdminContext.Provider value={adminContext}>
                    <AppRouter />
                </AdminContext.Provider>
            );
            expect(wrapper).toMatchSnapshot();
        });
    
        test('Show dashboard when admin is authenticated', () => {
    
            const wrapper = mount(
                <AdminContext.Provider value={adminContext}>
                    <AppRouter />
                </AdminContext.Provider>
            );
            const element = wrapper.find('.nameAdmin').text()
    
            expect(element).toBe('Jonathan Hernández');
        });
        */

});

