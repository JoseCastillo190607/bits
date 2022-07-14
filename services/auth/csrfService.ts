import axios from "axios";

// Get and add csrf Token to headers
export const csrfService = async () => {

    // const path = `${server}/auth`;
    const csrf = await axios.get('/auth/csrf')
        .then(res => res.data)
        // .catch(() => ErrorAlert({ text: "Ocurrio un error con el servidor." }));
        .catch((err) => {
            const { error } = err.response?.data || false;

            return {
                error: error ? error : "Ocurrio un error con el servidor.",
                status: err.response?.status | 500
            };
        });

    if (csrf.csrfToken) {
        axios.defaults.headers.common['x-csrfToken'] = csrf.csrfToken;
    };

    return csrf;

};