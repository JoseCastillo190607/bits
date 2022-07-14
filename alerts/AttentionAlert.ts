import Swal from "sweetalert2";

export const AttentionAlert = ({
    title = '¡Atención!',
    text = '',
    confirmButtonText = "Entendido",
    showDenyButton = false
}) => Swal.fire({
    icon: 'warning',
    title,
    text,
    confirmButtonText,
    showDenyButton,
    reverseButtons: true,
    denyButtonText: `Cerrar`,
    customClass: {
        confirmButton: 'buttonSave',
        denyButton: `buttonCancel`
    }
});