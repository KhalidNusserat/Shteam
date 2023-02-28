import { Box } from "@mui/material";
import UserDrawer from "../../components/UserDrawer";
import PrivatePage from "../../components/PrivatePage";
import UserAppBar from "../../components/UserAppBar";

type UserHomeConfig = {
    appBarTitle: string,
    element: JSX.Element
}

const UserHome = ({appBarTitle, element}: UserHomeConfig) => {
    return (
        <PrivatePage path='/user/home' userType='user'>
            <Box display='flex'>
                <UserDrawer />
                <UserAppBar title={appBarTitle} />
                {element}
            </Box>
        </PrivatePage>
    );
}

export default UserHome;