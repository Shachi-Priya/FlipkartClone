import {useSelector} from "react-redux";
import { useState, useContext } from 'react';
import {Link} from "react-router-dom";

import {Box, Button, Typography, Badge, styled} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// components
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import Profile from "./Profile";


const StyledBox=styled(Box)(({theme})=>({
    display:"flex",
    "&>button, &>p, &>div":{
        marginRight:"40px",
        fontSize:"16px",
        alignItems:"center",
    },
    [theme.breakpoints.down("md")]:{
        display:"block"
    }
}));

const StyledLogin=styled(Button)`
    color:#2873f0;
    background:#fff;
    text-transform:none;
    padding:5px 40px;
    border-radius:2px;
    box-shadow:none;
    font-weight:600;
    height:32px;
`;
const StyledShopCartContainer=styled(Link)(({theme})=>({
    display:"flex",
    textDecoration:"none",
    color:"inherit",
    margin:"0 3% 0 auto",
    [theme.breakpoints.down("md")]:{
        display:"block"
    }
}));
    

const CustomButtons=()=>{

    const [open, setOpen]=useState(false);
    const {account, setAccount}=useContext(DataContext);
    const {cartItems}=useSelector(state=>state.cart);

    const openDialog=()=>{
        setOpen(true); 
    }

    return (
        <StyledBox>
            {
                account? 
                    <Profile account={account} setAccount={setAccount}/>
                :
                    <StyledLogin variant="contained" onClick={openDialog}>Login</StyledLogin>
            }
            
            <Typography style={{marginTop:"3px", width:"135px"}}>Become a Seller</Typography>
            <Typography style={{marginTop:"3px"}}>More</Typography>
            <StyledShopCartContainer to={"/cart"}>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
                <Typography style={{marginLeft:"10px"}}>Cart</Typography>
            </StyledShopCartContainer>   
            <LoginDialog open={open} setOpen={setOpen}/>  
        </StyledBox>
    )
}

export default CustomButtons;