import { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: 'black',
        color: 'white',
        maxWidth: 220,
    },
}))(Tooltip);

const ProjectsField = (props: any) => {
    return (
        <div>
            {props.projects != undefined ? props.projects.split(',')[0] : ""}
            {props.projects != undefined ?
            <HtmlTooltip
                title={
                    <Fragment>
                        <ul className="projects__list">
                            {
                                props.projects != undefined ? (
                                    props.projects.split(',').map((project: string) => (
                                        <li key={project}>{project}</li>
                                    ))
                                ) : null
                            }
                        </ul>
                    </Fragment>
                }
            >
                <span>
                    {
                        props.projects != undefined ? (
                            props.projects.split(',').length - 1 > 0 ? (
                                <span className="more__projects">{`+${props.projects.split(',').length - 1}`}</span>
                            ) : null
                        ) : null
                    }
                </span>
            </HtmlTooltip>: null}
        </div>
    );
}

export default ProjectsField;