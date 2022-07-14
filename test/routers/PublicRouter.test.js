import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import PublicRouter from '../../routers/PublicRouter';

describe('Testing <PublicRouter />', () => {

    const props = {};

    test('Should block if user is not authenticate', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicRouter
                    isLoggedIn={false}
                    component={() => <h1>Ok</h1>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(true);
    })

    test('Should render something if user is authenticate', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicRouter
                    isLoggedIn={true}
                    component={() => <h1>Ok</h1>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find('h1').exists()).toBe(false);
    })
})
