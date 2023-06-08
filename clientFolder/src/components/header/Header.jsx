import { useState } from "react";
import {Link} from "react-router-dom";

import {AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, ListItem, styled} from '@mui/material';
import {Menu} from '@mui/icons-material';

// components
import Search from "./Search";
import CustomButtons from "./CustomButtons"


const StyledHeader=styled(AppBar)`
    background:#2873f0; 
    height:55px;
`;
const Container=styled(Link)`
    margin-left:12%; 
    line-height:0;
    text-decoration:none;
    color:inherit;
`;
const SubHeading=styled(Typography)`
    font-size:10px;
    font-style:italic;
`;
const PlusImage=styled("img")({
    width:"10px",
    height:"10px",
    marginLeft:"4px"
});
const CustomButtonwrapper=styled(Box)(({theme})=>({
    margin:"0 5% 0 auto",
    [theme.breakpoints.down("md")]:{
        display:"none"
    } 
}));

const MenuButton=styled(IconButton)(({theme})=>({
    display:"none",
    [theme.breakpoints.down("md")]:{
        display:"block",
    }
}))

const Header=()=>{

    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    
    const [open, setOpen]=useState(false);

    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }

    const list=()=>{
        return(
            <Box style={{width:200}} onClick={handleClose}>
                <List>
                    <ListItem button>
                        <CustomButtons/>
                    </ListItem>
                </List>
            </Box>
        )
    }

    return(
        <StyledHeader>
            <Toolbar style={{minHeight:'55px'}}>
                <MenuButton color="inherit" onClick={handleOpen}>
                    <Menu/>
                </MenuButton>
                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                <Container to={'/'}>
                    <img src={logoURL} alt="logo" style={{width:"75px"}}/>
                    <Box style={{display:"flex"}}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{color:"FFE500"}}>Plus</Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt="sub-logo"/>
                    </Box>
                </Container>
                <Search/>
                <CustomButtonwrapper>
                    <CustomButtons/>
                </CustomButtonwrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;