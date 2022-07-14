import { useState } from "react"

export const useToggle = (initState: boolean = true) => {

    const [value, setValue] = useState(initState);

    const onToggle = () => setValue(prevState => !prevState);

    return [value, onToggle] as const
};
