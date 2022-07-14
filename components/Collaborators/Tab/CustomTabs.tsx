import { withStyles } from '@material-ui/core/styles';
import { Tabs } from '@material-ui/core';

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

const CustomTabs = withStyles(({
    root: {
        // borderBottom: "2.5px solid #d8d8d8",
    },
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        // width: "10%",
        '& > span': {
            width: "900%",
            backgroundColor: '#2186c6',
            borderRadius: "2px",
        },

    },

}))((props: StyledTabsProps) => <Tabs
    {...props}
    TabIndicatorProps={{
        children: <span className="lineapapu" />,
        style: {
            height: "4px",
            // backgroundColor: "red",
            // width: "10px",
        }
    }}
    variant="standard"
/>);

export default CustomTabs;
