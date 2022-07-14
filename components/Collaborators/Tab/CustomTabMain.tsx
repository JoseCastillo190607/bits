import {
    withStyles,
} from '@material-ui/core/styles';
import { Tab } from '@material-ui/core';

interface StyledTabProps {
    label: string;
    value: number;
};

const CustomTab = withStyles(({
    root: {
        textTransform: 'none',
        minWidth: 170,
        fontSize: "18px",
        color: "",
        borderBottom: "2.5px solid #d8d8d8",
        // textDecoration: "underline",
        '&:hover': {
            color: '#093c5d',
            opacity: 1,
        },
        '&$selected': {
            color: '#093c5d',
            // width: "",
        },
        '&:focus': {
            color: '#093c5d',
        },
    },
    selected: {
        fontWeight:"bold"
    },
    wrapper: {
        alignItems: "flex-start",
        marginLeft: 0,
    },
}))((props: StyledTabProps) =>  <Tab disableRipple {...props} value={props.value}/>);

export default CustomTab;
