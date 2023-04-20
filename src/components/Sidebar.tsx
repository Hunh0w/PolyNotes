import * as React from 'react';
import { styled, useTheme, Theme, CSSObject, alpha } from '@mui/material/styles';
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
import {ButtonBase, Modal} from "@mui/material";
import NestedList from "./NestedList";
import {
    Restore,
    Article,
    Delete,
    Folder,
    Share,
    Star, AccountTree, Timer, TimerOutlined,
} from "@mui/icons-material";
import ProfileMenu from "./ProfileMenu";
import { getProfileInfos } from "../utils/auth-manager";
import CreatePageModal from "./modals/CreatePageModal";
import {ReactNode, useContext, useState} from "react";
import {UserContext} from "./auth/AuthChecker";
import {PolyFolder} from "./files/impl/PolyFolder";
import {PolyFileBase} from "./files/PolyFileBase";
import {useNavigate} from "react-router-dom";

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



function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface Props {
    children?: React.ReactNode
}

export default function Sidebar(props: Props) {
    const theme = useTheme();

    const [open, setOpen] = React.useState(true);
    const [ selectedFile, setSelectedFile ] = useState<PolyFileBase | null>(null);

    const navigate = useNavigate();

    const { files, shared } = useContext(UserContext);


    const profileInfos = getProfileInfos();
    if (!profileInfos) return <></>
    const firstletters = profileInfos.given_name.charAt(0).toUpperCase() + profileInfos.family_name.charAt(0).toUpperCase();
    const nickname = profileInfos.nickname;
    const userName = capitalize(profileInfos.family_name) + " " + capitalize(profileInfos.given_name);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                        <img src={"/img/polybunny.png"} width={60} alt={"polytech do bunny"} style={{cursor: "pointer"}} onClick={() => navigate("/home")} />
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <span style={{ "color": "purple" }}>Poly</span><span style={{ "color": "black" }}>Notes</span>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search sx={{ flexGrow: 1 }}>
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
                            userName={userName}
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
                <Box sx={{ "height": "70px", "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <CreatePageModal sidebarOpen={open} selectedFile={selectedFile} />
                </Box>
                <List>
                    <FileComponent drawerState={open} folder={null} level={0} setSelectedFile={setSelectedFile} selectedFile={selectedFile} />

                    <SharedFilesComponent drawerState={open} folder={null} level={0} />
                </List>
                <Divider />
                <List>
                    <ListItemButton sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TimerOutlined />
                        </ListItemIcon>
                        {open &&
                            <ListItemText primary={"Time Tracking"} />
                        }
                    </ListItemButton>
                </List>
                <Divider />
                <List>
                    <ListItemButton sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Restore />
                        </ListItemIcon>
                        {open &&
                            <ListItemText primary={"Recent"} />
                        }
                    </ListItemButton>
                    <ListItemButton sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Star />
                        </ListItemIcon>
                        {open &&
                            <ListItemText primary={"Stared"} />
                        }
                    </ListItemButton>
                    <ListItemButton sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <ListItemIcon sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Delete />
                        </ListItemIcon>
                        {open &&
                            <ListItemText primary={"Trash"} />
                        }
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

function SharedFilesComponent(props: {drawerState?: boolean, folder: PolyFolder | null, level: number}) {
    const { shared } = useContext(UserContext);
    const navigate = useNavigate();

    const id = props.folder ? props.folder.id : null;
    const name = props.folder ? props.folder.name : "Shared";

    const filesInFolder = shared.filter((file) => file.parentId === id);

    const style: React.CSSProperties = {
        marginLeft: props.level*10
    }

    return <NestedList disabled={!props.drawerState} icon={props.folder === null ? <Share /> : <Folder />} text={name} style={style}>
        {filesInFolder.map((file, index) => {
            if(file.isDirectory) return <SharedFilesComponent drawerState={props.drawerState} key={index} folder={file as PolyFolder} level={props.level+1} />
            return <ListItemButton sx={{ pl: 3 }} key={index} style={style} onClick={() => navigate("/page/"+file.id)}>
                <ListItemIcon>
                    {file.isDirectory ? <Folder /> : <Article />}
                </ListItemIcon>
                <ListItemText primary={file.name} />
            </ListItemButton>
        })}
    </NestedList>
}


function FileComponent(props: {drawerState?: boolean, folder: PolyFolder | null, level: number, setSelectedFile: (file: PolyFileBase | null) => void, selectedFile: PolyFileBase | null}) {
    const { files } = useContext(UserContext);
    const navigate = useNavigate();

    const id = props.folder ? props.folder.id : null;
    const name = props.folder ? props.folder.name : "My Workspace";

    const filesInFolder = files.filter((file) => file.parentId === id);

    const style: React.CSSProperties = {
        marginLeft: props.level*10
    }

    let boxStyle = {};

    if(props.selectedFile === null && props.selectedFile === props.folder && props.folder){
        boxStyle = {
            ...boxStyle,
            color: "#924ac4"
        }
    }else if(props.selectedFile && props.folder && props.selectedFile.id === props.folder.id){
        boxStyle = {
            ...boxStyle,
            color: "#924ac4"
        }
    }

    const onClick = () => {
        props.setSelectedFile(props.folder);
    }

    return <NestedList disabled={!props.drawerState} icon={props.folder === null ? <AccountTree /> : <Folder />} text={name} style={style} onClick={onClick} boxStyle={boxStyle}>
            {filesInFolder.map((file, index) => {
                if(file.isDirectory) return <FileComponent drawerState={props.drawerState} selectedFile={props.selectedFile} setSelectedFile={props.setSelectedFile} key={index} folder={file as PolyFolder} level={props.level+1} />
                return <ListItemButton sx={{ pl: 3 }} key={index} style={style} onClick={() => navigate("/page/"+file.id)}>
                    <ListItemIcon>
                        {file.isDirectory ? <Folder /> : <Article />}
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
                </ListItemButton>
            })}
    </NestedList>
}