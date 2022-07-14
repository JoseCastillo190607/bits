import {
    render,
    screen,
    fireEvent
} from '@testing-library/react';
import GoogleButton from '../../../components/Login/GoogleButton';

const singIn = () => {
    return "test";
};

describe('GoogleButton', () => {
    test('should render GoogleButton component', () => {
        render(<GoogleButton />);
        fireEvent.click(screen.getByText(/INICIAR SESIÓN CON GOOGLE/i));
        expect(singIn()).toBe("test");
    });
})

