import Swal from "sweetalert2";
import iconWarning from '../assets/svg/modal_warning.svg'

export const WarningAlert = ({
    title = '¡Error!',
    text = '',
    confirmButtonText = "Entendido",
    showDenyButton = false
}) => Swal.fire({
    color: '#222222',
    title: '¡Atención!',
    html: `<label> ${text} </label>`,
    
    confirmButtonText: 'Continuar',
    confirmButtonColor: '#FABB00',
    buttonsStyling: true,
    imageUrl: iconWarning,
    imageWidth: "77.46 px",
    imageHeight: "77.47 px",
    customClass: {
        title: 'Title',
        htmlContainer: 'text-color-sweetalert',
    },
    allowOutsideClick: false,
    showCloseButton: true,
    focusConfirm: false,
    focusDeny: false,
    focusCancel: false
});