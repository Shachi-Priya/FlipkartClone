import {useSelector} from "react-redux";
import { Box, Typography, Grid, Button, styled } from '@mui/material';

//components
import CartItem from "./CartItem";
import TotalBalance from "./TotalBalance";
import EmptyCart from "./EmptyCart";
// import { payUsingPaytm } from "../../service/api";
// import { post } from "../../utils/paytm";


const Container=styled(Grid)(({theme})=>({
    padding:"30px 135px",
    [theme.breakpoints.down("md")]:{
        padding: "15px 0px"
    }
}));

const Header=styled(Box)`
    padding:15px 24px;
    background:#fff;
`;

const ButtonWrapper=styled(Box)`
    padding:16px 22px;
    background:#fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top:1px solid #f0f0f0
`;

const StyledButton=styled(Button)`
    display:flex;
    margin-left:auto;
    background:#fb641b;
    color:#fff;
    width:250px;
    height:51px;
    border-radius:2px;
`;

const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down("sm")]:{
        marginBottom:15
    }
}));

const Cart=()=>{
    const {cartItems}=useSelector(state=>state.cart);

    const buyNow=async()=>{
        await alert("Order Placed Successfully");
        window.location.href = 'https://flipkart-klone.netlify.app';
        // let response=await payUsingPaytm({amount:500, email:"shachi4621@gmail.com"});
        // let information={
        //     action:"https://securegw-stage.paytm.in/order/process",
        //     params:response
        // }
        // post(information);
    }


    return (
        <>
            {
                cartItems.length?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My Cart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item=>(
                                    <CartItem item={item}/>
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton onClick={()=>buyNow()} >Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalBalance cartItems={cartItems}/>
                        </Grid>
                    </Container>
                :
                    <EmptyCart/>
            }
        </>
    )
}

export default Cart;