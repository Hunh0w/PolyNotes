import * as React from 'react';
import {styled, useTheme, Theme, CSSObject, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import {ButtonBase} from "@mui/material";
import NestedList from "./NestedList";
import {
    Restore,
    Article,
    Delete,
    Folder,
    Share,
    Star,
} from "@mui/icons-material";
import ProfileMenu from "./ProfileMenu";
import {getProfileInfos} from "../utils/auth-manager";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    height: "64px",
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
    backgroundColor: "white",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    color: "black",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    display: "flex"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),

    },
}));

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    width: '80%',
    height: '70%',
    borderRadius: "5px",
    fontSize: "17pt",
    color: "white",
    backgroundColor: "#ff58ed",
    border: "2px solid black"
}));

function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Props {
    children?: React.ReactNode
}

export default function Sidebar(props: Props) {
    const theme = useTheme();

    const [open, setOpen] = React.useState(true);

    const [workspacesOpen, setWorkspacesOpen] = React.useState(true);
    const [sharedOpen, setSharedOpen] = React.useState(true);

    const profileInfos = getProfileInfos();
    if(!profileInfos) return <></>
    const firstletters = profileInfos.given_name.charAt(0).toUpperCase() + profileInfos.family_name.charAt(0).toUpperCase();
    const nickname = capitalize(profileInfos.family_name) + " " + capitalize(profileInfos.given_name);

    const toggleWorkspacesOpen = () => {
        if(!open && !workspacesOpen) return;
        setWorkspacesOpen(!workspacesOpen);
    };

    const toggleSharedOpen = () => {
        if(!open && !sharedOpen) return;
        setSharedOpen(!sharedOpen);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        if(workspacesOpen) toggleWorkspacesOpen();
        if(sharedOpen) toggleSharedOpen();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="default"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box>
                        <img src={"/img/polybunny.png"} width={60} alt={"polytech do bunny"} />
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <span style={{"color": "purple"}}>Poly</span><span style={{"color": "black"}}>Notes</span>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search sx={{ flexGrow: 1}}>
                        <SearchIconWrapper>
                            <SearchIcon color={"secondary"} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <ProfileMenu
                            letters={firstletters}
                            nickname={nickname}
                            color={"#a200ca"} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Box sx={{"height": "70px", "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
                    <StyledButton>
                        {open ? "+ Create" : "+"}
                    </StyledButton>
                </Box>
                <List>
                    <NestedList icon={<Folder />} text={"Workspaces"} open={workspacesOpen} toggleOpen={toggleWorkspacesOpen}>
                        {["1", "2", "3", "4"].map((value, index) => (
                            <ListItemButton sx={{ pl: 4 }} key={index}>
                                <ListItemIcon>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary={"document "+value} />
                            </ListItemButton>
                        ))}
                    </NestedList>
                    <NestedList icon={<Share />} text={"Shared with Me"} open={sharedOpen} toggleOpen={toggleSharedOpen}>
                        {["5", "6", "7", "8"].map((value, index) => (
                            <ListItemButton sx={{ pl: 4 }} key={index}>
                                <ListItemIcon>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary={"document "+value} />
                            </ListItemButton>
                        ))}
                    </NestedList>
                </List>
                <Divider />
                <List>
                    <ListItemButton sx={{ pl: (open?4:2) }}>
                        <ListItemIcon>
                            <Restore />
                        </ListItemIcon>
                        <ListItemText primary={"Recent"} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: (open?4:2) }}>
                        <ListItemIcon>
                            <Star />
                        </ListItemIcon>
                        <ListItemText primary={"Stared"} />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: (open?4:2) }}>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                        <ListItemText primary={"Trash"} />
                    </ListItemButton>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {props.children}
            </Box>
        </Box>
    );
}