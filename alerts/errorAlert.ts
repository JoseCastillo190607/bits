import Swal from "sweetalert2";

export const ErrorAlert = ({
    title = '¡Error!',
    text = ''
}) => Swal.fire({
    icon: 'error',
    title,
    text,
    customClass: {
        confirmButton: 'confirmButton',
    }
});