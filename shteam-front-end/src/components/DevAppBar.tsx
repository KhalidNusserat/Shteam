import { AppBar, Avatar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import CONSTANTS from "../constants";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import API from "../api/API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getDevInfo } from "../store/dev/devInfoSlice";
import { useNavigate } from "react-router-dom";

const DevAppBar = ({ title }: { title: string }) => {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
    const devname = useAppSelector(state => state.devInfo.devname);
    const image = useAppSelector(state => state.devInfo.image);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAvatarButton = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorElement(null);
    }

    useEffect(() => {
        dispatch(getDevInfo());
    }, []);

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${CONSTANTS.DRAWER.WIDTH}px)`,
                ml: `${CONSTANTS.DRAWER.WIDTH}px`
            }}
            variant="outlined"
        >
            <Toolbar>
                <Box flexGrow={1}>
                    <Typography variant="h4" fontFamily='Tajawal'>
                        {title}
                    </Typography>
                </Box>
                <Button onClick={handleAvatarButton}>
                    <Box marginRight='10px'>
                        <Typography variant="body1">
                            {devname}
                        </Typography>
                    </Box>
                    <Avatar
                        src={image!}
                    >
                    </Avatar>
                    <KeyboardArrowDownIcon />
                </Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElement}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElement)}
                    onClose={handleClose}
                >
                    <MenuItem
                        onClick={() => {
                            navigate('/dev/home/settings');
                            setAnchorElement(null);
                        }}
                    >
                        <Box marginRight='5px'>
                            <ManageAccountsIcon />
                        </Box>
                        Developer Account Settings
                    </MenuItem>
                    <MenuItem
                        onClick={e => {
                            API.logout();
                            document.location.reload();
                        }}
                    >
                        <Box marginRight='5px'>
                            <LogoutIcon />
                        </Box>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default DevAppBar;