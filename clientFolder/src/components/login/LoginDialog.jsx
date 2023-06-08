import { useState, useContext } from 'react';

import {Dialog, Box, TextField, Typography, Button, styled} from '@mui/material';

//components
import { authenticateSignup, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const StyledBox=styled(Box)`
    height:64.5vh;
    width:82.5vh;   
`;
// height:70vh;
// width:90vh;

const StyledBoxImg=styled(Box)`
    background: #2873f0 
        url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) 
        center 85% no-repeat;
    height:83.05%;
    width:30%;
    padding:45px 35px;
    &>p, &>h5{
        color:#fff;
        font-weight:600;
    }
`;
// height:84.41%;
// width:28%;

const StyledRightBox=styled(Box)`
    display:flex;
    flex-direction:column;
    padding: 25px 35px;
    flex:1;
    &>div, &>button, &>p{
        margin-top:20px;
    }
`;

const StyledLoginButton=styled(Button)`
    text-transform:none;
    background: #fb641b;
    color:#fff;
    height:48px;
    border-radius:2px;
`;

const StyledOTPButton=styled(Button)`
    text-transform:none;
    background: #fff;
    color:#2873f0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0px rgb(0 0 0/ 20%)
`;

const StyledTypo=styled(Typography)`
    font-size:12px;
    color:#878787;
`;

const StyledCreateAccTypo=styled(Typography)`
    font-size:14px;
    text-align:center;
    color:#2873f0;
    font-weight:600;
    cursor:pointer
`;

const StyledError=styled(Typography)`
    font-size:16px;
    line-height:0;
    color:#ff6161;
    font-weight:600;
    margin-top:10px;
`;

const accountInitValues={
    login:{
        view:"login",
        heading:"Login",
        subHeading:"Get access to your Orders, Wishlist and Recommendations"
    },
    signup:{
        view:"signup",
        heading:"Looks like you're new here!",
        subHeading:"Sign up with your mobile number to get started"
    }
}

const signupInitValues={
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    phone:""
}

const loginInitValues={
    username:"",
    password:""
}

const LoginDialog=({open, setOpen})=>{

    const [account, toggleAccount]=useState(accountInitValues.login);
    const [signup, setSignup]=useState(signupInitValues);
    const [login, setLogin]=useState(loginInitValues);
    const [error, setError]=useState(false);

    const {setAccount}=useContext(DataContext);

    const toggleSignup=()=>{
        toggleAccount(accountInitValues.signup);
    }

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value}); // variable as a key so, under square braket
    }

    const handleClose=()=>{
        setOpen(false);
        toggleAccount(accountInitValues.login);
        setError(false);
    }
    
    const signupUser=async()=>{
        let response=await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(signup.firstname);
    }

    const onValueChange=(e)=>{
        setLogin({...login, [e.target.name]:e.target.value});
    }
    
    const loginUser=async()=>{
        let response=await authenticateLogin(login);
        if(response.status===200) {
           handleClose();
           setAccount(response.data.data.firstname);
        }else{
            setError(true);
        }
    }

    return(
        <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxWidth:"unset"}}}>
            <StyledBox>
                <Box style={{display:"flex", height:"100%"}}>
                    <StyledBoxImg>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{marginTop: '20px'}}>{account.subHeading}</Typography>
                    </StyledBoxImg>
                    {account.view==="login" ?
                        <StyledRightBox>
                            <TextField variant="standard" onChange={onValueChange} name="username" label="Enter Username" />
                            {error && <StyledError>Please enter valid username or password</StyledError>}
                            <TextField variant="standard" onChange={onValueChange} name="password" label="Enter Password" />
                            <StyledTypo>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</StyledTypo>
                            <StyledLoginButton onClick={loginUser}>Login</StyledLoginButton>
                            <Typography style={{textAlign:"center"}}>OR</Typography>
                            <StyledOTPButton>Request OTP</StyledOTPButton>
                            <StyledCreateAccTypo onClick={toggleSignup}>New to Flipkart? Create an account</StyledCreateAccTypo>
                        </StyledRightBox>
                        :
                        <StyledRightBox>
                            <TextField variant="standard" name="firstname" onChange={onInputChange} label="Enter Firstname" />
                            <TextField variant="standard" name="lastname" onChange={onInputChange} label="Enter Lastname" />
                            <TextField variant="standard" name="username" onChange={onInputChange} label="Enter Username" />
                            <TextField variant="standard" name="email" onChange={onInputChange} label="Enter Email" />
                            <TextField variant="standard" name="password" onChange={onInputChange} label="Enter Password" />
                            <TextField variant="standard" name="phone" onChange={onInputChange} label="Enter Phone" />
                            <StyledLoginButton onClick={signupUser}>Continue</StyledLoginButton>
                        </StyledRightBox>
                    }
                </Box>    
            </StyledBox>
        </Dialog>
    )
}

export default LoginDialog;