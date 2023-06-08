import {useState, useEffect} from "react";

import { Box, Typography, styled } from '@mui/material';


const Header=styled(Box)`
    padding:15px 24px;
    background:#fff; 
    border-bottom:1px solid #f0f0f0;
`;


const Heading=styled(Typography)`
    color:#878787;
`;

const Container=styled(Box)`
    padding:15px 24px;
    background:#fff; 
    &>p{
        margin-bottom:20px;
        font-size:14px;
    }
    &>h6{
        margin-bottom:20px;
    }
`;

const Price=styled(Box)`
    float:right;
`;

const Discount=styled(Box)`
    color:green;
    font-weight:500;
`;

const TotalBalance=({cartItems})=>{

    const [price, setPrice]=useState(0);
    const [discount, setDiscount]=useState(0);

    useEffect(()=>{
        totalAmount();
    }, [cartItems]);

    const totalAmount=()=>{
        let price=0, discount=0;
        cartItems.map(item=>{
            price+=item.price.mrp;
            discount+=(item.price.mrp-item.price.cost);
        });
        setPrice(price);
        setDiscount(discount);
    }

    return(
        <Box>
            <Header>
                <Heading>PRICE DETAIL</Heading>
            </Header>
            <Container>
                <Typography>
                    Price ({cartItems?.length} item)
                    <Price components="span">₹{price}</Price>
                </Typography>
                <Typography>
                    Discount
                    <Price components="span">-₹{discount}</Price>
                </Typography>
                <Typography>
                    Delivery
                    <Price components="span">₹40</Price>
                </Typography>
                <Typography variant="h6">
                    Total Amount
                    <Price components="span">₹{price-discount+40}</Price>
                </Typography>
                <Discount>You will save on this ₹{discount-40} order</Discount>
            </Container>
        </Box>
    )
}

export default TotalBalance;