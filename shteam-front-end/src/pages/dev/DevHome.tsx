import { Box } from "@mui/system";
import PrivatePage from "../../components/PrivatePage";
import DevAppBar from "../../components/DevAppBar";
import DevDrawer from "../../components/DevDrawer";

type DevHomeConfig = {
    appBarTitle: string,
    element: JSX.Element
}

const DevHome = ({appBarTitle, element}: DevHomeConfig) => {
    return (
        <PrivatePage path='/dev/home' userType='dev'>
            <Box display='flex'>
                <DevDrawer />
                <DevAppBar title={appBarTitle} />
                {element}
            </Box>
        </PrivatePage>
    );
}

export default DevHome;