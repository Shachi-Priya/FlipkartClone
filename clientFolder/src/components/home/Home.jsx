import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {Box, styled} from '@mui/material';

// components
import Navbar from "./Navbar";
import Banner from "./Banner";
import {getProducts} from "../../redux/actions/productAction";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";


const StyledBox=styled(Box)`
    padding: 10px 10px;
    background: #f2f2f2;
`;

const Home=()=>{

    const {products}=useSelector(state=>state.getProducts);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    }, [dispatch]);

    return(
        <>
            <Navbar/>
            <StyledBox>
                <Banner/>
                <MidSlide products={products} title="Deal of the Day" timer={true}/>
                <MidSection/>
                <Slide products={products} title="Discounts for You" timer={false}/>
                <Slide products={products} title="Suggesting Items" timer={false}/>
                <Slide products={products} title="Top Selection" timer={false}/>
                <Slide products={products} title="Recommended Items" timer={false}/>
                <Slide products={products} title="Trending Offers" timer={false}/>
                <Slide products={products} title="Season's top picks" timer={false}/>
                <Slide products={products} title="Top Deals on Accessories" timer={false}/>
            </StyledBox>
            
        </>
    )
}

export default Home;