import {
    Avatar,
    Box,
    ClickAwayListener,
    Divider,
    Grow,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper, Tooltip, Typography
} from "@mui/material";
import {green} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {Logout, Person, Person2, PersonAdd, Settings} from "@mui/icons-material";
import MoreIcon from "@mui/icons-material/MoreVert";


export default function ProfileMenu(props: {}){
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Tooltip title={"Profile Menu"} >
                <IconButton
                    onClick={handleClick}
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <Avatar sx={{ bgcolor: green[500], display: { xs: 'none', md: 'flex' } }}>VF</Avatar>
                    <MoreIcon sx={{ display: { xs: 'flex', md: 'none' }, color: "black" }} />
                </IconButton>
            </Tooltip>
        </Box>
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", px: 3}}>
                    <Typography variant={"h5"} fontWeight={"bold"}>
                        Font Vincent
                    </Typography>
                </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Person fontSize={"small"} />
                </ListItemIcon>
                My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    </>
}