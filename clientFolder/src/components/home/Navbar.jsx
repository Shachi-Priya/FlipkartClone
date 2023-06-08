import React from 'react'
import {Box, styled, Typography} from '@mui/material';

import {navData} from "../../constants/data";

const StyledBox=styled(Box)(({theme})=>({
    display:"flex",
    margin:"55px 130px 0 130px",
    justifyContent:"space-between",
    overflow:"hidden",
    [theme.breakpoints.down("lg")]:{
        margin:0
    }
}));

const StyledSubBox=styled(Box)`
    padding:12px 8px;
    text-align:center;
`;

const StyledTypography=styled(Typography)`
    font-size:14px;
    font-weight:600;
    font-family:inherit;
`;

const Navbar=()=>{
  return (
      <Box style={{background:"#fff"}}>
            <StyledBox>
                {
                    navData.map(data=>(
                        <StyledSubBox>
                            <img src={data.url} alt="nav" style={{width:"64px"}}/>
                            <StyledTypography>{data.text}</StyledTypography>
                        </StyledSubBox>
                    ))
                }
            </StyledBox>
      </Box>
  )
}

export default Navbar; 
