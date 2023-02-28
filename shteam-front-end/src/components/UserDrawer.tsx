import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import CONSTANTS from "../constants";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StoreIcon from '@mui/icons-material/Store';
import { useNavigate } from "react-router-dom";

const UserDrawer = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: CONSTANTS.DRAWER.WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: CONSTANTS.DRAWER.WIDTH,
                    boxSizing: 'border-box',
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <ListItem key={0} disablePadding>
                    <Box margin='5px' marginRight='14px'>
                        <img src={CONSTANTS.SHTEAM_LOGO_COLORED} width={60} />
                    </Box>
                    <Typography
                        variant="h4"
                        fontFamily='Tajawal'
                    >
                        Shteam<sup>©</sup>
                    </Typography>
                </ListItem>
                <Divider />
                <ListItem key={1} disablePadding>
                    <ListItemButton
                        onClick={() => navigate('/user/home/library')}
                    >
                        <ListItemIcon>
                            <SportsEsportsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Library' />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem key={2} disablePadding>
                    <ListItemButton
                        onClick={() => navigate('/user/home/store')}
                    >
                        <ListItemIcon>
                            <StoreIcon />
                        </ListItemIcon>
                        <ListItemText primary='Store' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default UserDrawer;