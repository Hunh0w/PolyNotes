import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, CircularProgress, Divider, Icon, IconButton, Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@mui/material';
import { Cloud, ContentCopy, ContentCut, ContentPaste, Delete, Description, Folder, MoreVert, Share, Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { PolyFileBase } from '../files/PolyFileBase';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/conf';
import { PolyFolder } from '../files/impl/PolyFolder';
import { PolyFile } from '../files/impl/PolyFile';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#333",
        color: "#A75AE3",
        fontSize: "15pt",
        fontWeight: "bold"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function FilesExplorer(props: { files: PolyFileBase[] }) {

    return <FilesExplorerUI files={props.files} />
}

interface APIResponse {
    error?: string
    isLoaded: boolean
    files?: PolyFileBase[]
}

function FilesExplorerService() {

    const [response, setResponse] = useState<APIResponse>({ isLoaded: false });
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    if (!token) {
        navigate("/login");
        return <></>
    }

    if (response.error) {
        <Box width={"100%"} height={"100%"} display={"flex"} justifyContent="center" alignItems="center">
            <Typography>Erreur: {response.error}</Typography>
        </Box>
    }

    if (!response.isLoaded)
        return <Box width={"100%"} height={"100%"} display={"flex"} justifyContent="center" alignItems="center" mt={5}>
            <CircularProgress color="secondary" size={80} />
        </Box>

    const polyFiles = response.files as PolyFileBase[]
    return <FilesExplorerUI files={polyFiles} />
}

function FilesExplorerUI(props: { files: PolyFileBase[] }) {

    const [hover, setHover] = useState<string>("")

    const onClick = (file: PolyFileBase) => {
        console.log(file) //TODO
    }

    const onMouseEnter = (id: string) => {
        setHover(id)
    }

    const onMouseLeave = () => {
        setHover("")
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>File Name</StyledTableCell>
                        <StyledTableCell align="right">Owner</StyledTableCell>
                        <StyledTableCell align="right">Last Modified</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.files.map((file) => (
                        <StyledTableRow key={file.name}>
                            <StyledTableCell component="th" scope="row">
                                <Box display="flex" justifyContent="start" height={"auto"} width="auto">
                                    <Box mr={3}>
                                        <IconButton onClick={() => onClick(file)} onMouseEnter={() => onMouseEnter(file.id)} onMouseLeave={() => onMouseLeave()}>
                                            {file.isDirectory ? <Folder /> : <Description />}
                                        </IconButton>
                                    </Box>

                                    <Typography color={file.id === hover ? "#922FDF" : "#000"} variant='h5' fontWeight={file.isDirectory ? "bold" : "none"}>{file.name}</Typography>
                                </Box>

                            </StyledTableCell>
                            <StyledTableCell align="right" style={{ color: file.id === hover ? "#922FDF" : "#000" }}>{file.ownerId}</StyledTableCell>
                            <StyledTableCell align="right" style={{ color: file.id === hover ? "#922FDF" : "#000" }}>{file.lastModified}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ActionsMenu />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function ActionsMenu(props: {}) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Box>
        <IconButton
            aria-controls={open ? 'actions-button' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'actions-button',
            }}>
            <MenuItem>
                <ListItemIcon>
                    <Visibility fontSize="small" />
                </ListItemIcon>
                <ListItemText>Show</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Share fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Menu>
    </Box>
}