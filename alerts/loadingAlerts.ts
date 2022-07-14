import Swal from "sweetalert2";
export const LoadingAlert = ({ title = 'Creando al candidato...' }) => Swal.fire({
    title,
    didOpen: () => {
        Swal.showLoading()
    }
});

export const LoadingUser = () => Swal.fire({
    title: 'Cargando Datos...',
    timer: 700,
    timerProgressBar: true,
    didOpen: () => {
        Swal.showLoading()
    }
});

export const LoadingFile = () => Swal.fire({
    title: 'Subiendo archivo...',
    didOpen: () => {
        Swal.showLoading()
    }
});