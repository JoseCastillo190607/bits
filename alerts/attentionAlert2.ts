import Swal from "sweetalert2";
import iconListo from '../../src/assets/svg/Atencion.svg'

export const AttentionAlert2 = ({title = '¡Atención!',text = '',confirmButtonText = 'Entendido'}) => Swal.fire({
    color: '#222222',
    title: title,
    html: `<label> ${text} </label>`,
    
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#FABB00',
    buttonsStyling: true,
    imageUrl: iconListo,
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