import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PrivateRouter from '../../routers/PrivateRouter';

describe('Testing <PrivateRouter />', () => {

    const props = {};

    test('Should render something if user is authenticate', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter
                    isLoggedIn={true}
                    component={() => <h1>Ok</h1>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(true);
    })

    test('Should block if user is not authenticate', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRouter
                    isLoggedIn={false}
                    component={() => <h1>Ok</h1>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(false);
    })
})
