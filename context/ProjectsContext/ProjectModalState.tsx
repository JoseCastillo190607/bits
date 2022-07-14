import { useReducer } from "react";
import ProjectContext from './ProjectsContext'
import ProjectModalReducer from "./ProjectModalReducer";


const ProjectModalState = (props: any) => {
    const initialState = {
        open: false,
        value: '',
        _id: '',
        title: ''
    }

    const [state, dispatch] = useReducer(ProjectModalReducer, initialState);

    return (
        <ProjectContext.Provider value={{state, dispatch}}>
            {props.children}
        </ProjectContext.Provider>
    )

};

export default ProjectModalState; 