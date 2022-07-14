import { Box } from '@material-ui/core';
import AddNewsModal from '../components/News/Modals/AddNewsModal';
import Body from '../components/News/Body';
import NewState from '../context/NewContext/NewState';
import '../components/News/News.css';
import WatchNew from '../components/News/Modals/WatchNew';

const NewsScreen = () => {
    return (
        <NewState>
            <div>
                <Box mt={3} ml={5} className="Title" mb={2}>
                    Noticias
                </Box>
                <Box p={1}>
                    <div className="calendar__container">
                        <Body />
                    </div>
                </Box>
            </div>
            <AddNewsModal />
            <WatchNew />
        </NewState>
    )
};

export default NewsScreen;
