import Swal from "sweetalert2";


export const LoadingAlert = () => Swal.fire({
    title: 'Cargando Datos...',
    // timer: 700,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
    }
});