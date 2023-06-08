import { useState } from 'react';

import {Box, Typography, styled, Menu, MenuItem} from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const StyledMenu=styled(Menu)`
    margin-top:5px;
`;

const StyledLogout=styled(Typography)`
    font-size:14px;
    margin-left:20px;
`;

const Profile=({account, setAccount})=>{

    const [open, setOpen]=useState(false);

    const handleClick=(event)=>{
        setOpen(event.currentTarget);
    }

    const handleClose=(event)=>{
        setOpen(false);
    }

    const logoutUser=()=>{
        setAccount('');
    }

    return(
        <>
            <Box onClick={handleClick}>
                <Typography style={{marginTop:2, cursor:"pointer"}}>{account}</Typography>
            </Box>

            <StyledMenu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={()=>{handleClose(); logoutUser();}}>
                    <PowerSettingsNewIcon color="primary" fontSize="small"/>
                    <StyledLogout>Logout</StyledLogout>
                </MenuItem>
            </StyledMenu>
        </>
    )
}

export default Profile;