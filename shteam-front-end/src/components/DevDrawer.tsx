import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import CONSTANTS from "../constants";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useNavigate } from "react-router-dom";

const DevDrawer = () => {
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
                        onClick={() => navigate('/dev/home/games')}
                    >
                        <ListItemIcon>
                            <SportsEsportsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Published Games' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default DevDrawer;