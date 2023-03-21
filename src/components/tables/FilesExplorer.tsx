import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Divider, Icon, IconButton, Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography } from '@mui/material';
import { Cloud, ContentCopy, ContentCut, ContentPaste, Delete, Description, Folder, MoreVert, Share, Visibility } from '@mui/icons-material';
import { useState } from 'react';

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

interface PolyNoteFile {
    id: string
    name: string
    owner: string
    isDirectory: boolean
    lastModifiedDate: Date
}

const rows: PolyNoteFile[] = [
    {
        id: "82374",
        name: "test1.polynote",
        isDirectory: false,
        lastModifiedDate: new Date(),
        owner: "Vincent Font"
    },
    {
        id: "82fe3",
        name: "test2.polynote",
        isDirectory: false,
        lastModifiedDate: new Date(),
        owner: "Vincent Font"
    },
    {
        id: "8D3Y3D",
        name: "Tests",
        isDirectory: true,
        lastModifiedDate: new Date(),
        owner: "Vincent Font"
    },
    {
        id: "8D3M38",
        name: "test4.polynote",
        isDirectory: false,
        lastModifiedDate: new Date(),
        owner: "Vincent Font"
    }
];

export default function FilesExplorer() {

    const [hover, setHover] = useState<string>("")

    const onClick = (row: PolyNoteFile) => {
        console.log(row) //TODO
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
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                <Box display="flex" justifyContent="start" height={"auto"} width="auto">
                                    <Box mr={3}>
                                        <IconButton onClick={() => onClick(row)} onMouseEnter={() => onMouseEnter(row.id)} onMouseLeave={() => onMouseLeave()}>
                                            {row.isDirectory ? <Folder /> : <Description />}
                                        </IconButton>
                                    </Box>

                                    <Typography color={row.id === hover ? "#922FDF" : "#000"} variant='h5' fontWeight={row.isDirectory ? "bold" : "none"}>{row.name}</Typography>
                                </Box>

                            </StyledTableCell>
                            <StyledTableCell align="right" style={{ color: row.id === hover ? "#922FDF" : "#000" }}>{row.owner}</StyledTableCell>
                            <StyledTableCell align="right" style={{ color: row.id === hover ? "#922FDF" : "#000" }}>{row.lastModifiedDate.toString()}</StyledTableCell>
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