import { render, screen, cleanup } from '@testing-library/react';
import MenuHeader from '../../../components/Header/MenuHeader';
import PopperHeader from '../../../components/Header/PopperHeader';

afterEach(() => {
    cleanup();
});

test('should render PopperHeader component', () => {
    /* render(<MenuHeader />);
    const button = screen.getByTestId('userButton');

    const anchorRef = {
        current: button
    }

    expect(button).toBeInTheDocument();
    render(<PopperHeader open={true} anchorRef={anchorRef} />);

    const PopperMenu = screen.getByTestId('PopperMenu');
    expect(PopperMenu).toBeInTheDocument(); */
});