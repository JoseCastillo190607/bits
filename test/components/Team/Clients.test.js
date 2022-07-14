import { render, cleanup, fireEvent } from '@testing-library/react';
import Clients from '../../../components/Team/Clients';
import SedeClientModal from '../../../components/Team/Modals/AddRegisterModal';
import TeamContext from '../../../context/ModalContext/ModalContext';

afterEach(() => {
    cleanup();
});

const setup = () => {
    const utils = render(<Clients />);
    const input = utils.getByTestId('newCliente');
    return {
        input,
        ...utils,
    }
}

describe('Testing <Clients />', () => {
    test('should render Clients', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'new cliente' } });
        if (input.value === '') console.log('sin texto, no deberia hacer get');
        else expect(input).toMatchSnapshot();
    });
});

describe('Testing <SedeClientModal />', () => {
    test('should render modal', async () => {
        const Component = render(
            <TeamContext.Provider value={{ state: { open: true, value: 'testiando cliente', _id: 'id de testiando cliente' }, dispatch: jest.fn() }}>
                <SedeClientModal type="Cliente" func={() => { }} />
            </TeamContext.Provider>
        );
        expect(Component.getByTestId('TitleModal').textContent).toEqual("Editando Cliente");
        expect(Component.getByTestId('form-dialog-text-type')).toMatchSnapshot();
    });
});