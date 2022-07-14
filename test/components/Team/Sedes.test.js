import { render, cleanup, fireEvent } from '@testing-library/react';
import Sedes from '../../../components/Team/Sedes';
import SedeClientModal from '../../../components/Team/Modals/AddRegisterModal';
import TeamContext from '../../../context/ModalContext/ModalContext';

afterEach(() => {
    cleanup();
});

const setup = () => {
    const utils = render(<Sedes />);
    const input = utils.getByTestId('newSede');
    return {
        input,
        ...utils,
    }
}

describe('Testing <Sedes />', () => {
    test('should render Sedes', () => {
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'new sede' } });
        if (input.value === '') console.log('sin texto, no deberia hacer get');
        else expect(input).toMatchSnapshot();
    });
});

describe('Testing <SedeClientModal />', () => {
    test('should render modal', async () => {
        const Component = render(
            <TeamContext.Provider value={{ state: { open: true, value: 'testiando sede', _id: 'id de testiando sede' }, dispatch: jest.fn() }}>
                <SedeClientModal type="Sede" func={() => { }} />
            </TeamContext.Provider>
        );
        expect(Component.getByTestId('TitleModal').textContent).toEqual("Editando Sede");
        expect(Component.getByTestId('form-dialog-text-type')).toMatchSnapshot();
    });
});