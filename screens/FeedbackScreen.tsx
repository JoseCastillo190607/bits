import { Box, Grid } from "@material-ui/core";
import Body from "../components/Feedback/Body";
import '../components/Feedback/Feedback.css';

const FeedbackScreen = () => {
    return (
        <Box>
            <Box mt={3} ml={5} className="Title" mb={2}>
                Feedback
            </Box>
            <Box p={1}>
                <Grid style={{ background: 'white' }}>
                    <Body />
                </Grid>
            </Box>
        </Box>
    )
};

export default FeedbackScreen;
