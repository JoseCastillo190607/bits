import Swal from "sweetalert2";

export const DeleteAlert = (title: string) => Swal.fire({
    title,
    showDenyButton: true,
    confirmButtonText: `Eliminar`,
    denyButtonText: `Cerrar`,
    confirmButtonColor: '#ea5455',
    denyButtonColor: "#eee",
    denyButtonAriaLabel: '#000',
    reverseButtons: true,
    customClass: {
        denyButton: 'denyButton',
    }
}).then((result) => {
    if (result.isConfirmed) {
        return true;
    };
});