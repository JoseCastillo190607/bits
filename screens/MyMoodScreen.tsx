import { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import '../components/MyMood/MyMood.css';
import Body from "../components/MyMood/Body";
import BodyStadisticts from "../components/MyMood/BodyStadisticts";


const MyMoodScreen = () => {
    const [open, setOpen] = useState<boolean>(false);

    const onHandleChange = () => {
        setOpen(!open);
    }
    
    return (
        <div>
            <Box mt={3} ml={5} className="Title" mb={2}>
                My Mood
            </Box>
            <Box p={1}>
                <Grid style={{ background: 'white' }}>
                    <Box display="flex" flexDirection="column" p={2}>
                        {
                            open ? <BodyStadisticts onHandleChange={onHandleChange} /> : <Body onHandleChange={onHandleChange} />
                        }
                    </Box>
                </Grid>
            </Box>
        </div>
    )
};

export default MyMoodScreen;
