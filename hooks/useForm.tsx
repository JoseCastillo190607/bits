import { useState } from "react"

export const useForm = <T extends Object>(form: T) => {

    const [state, setState] = useState(form);

    const onChange = (value: string, campo: keyof T) => {
        setState({
            ...state,
            [campo]: value
        })
    };

    const reset = () => setState(form)

    return {
        ...state,
        formulario: state,
        onChange,
        setForm: setState,
        reset
    }
}