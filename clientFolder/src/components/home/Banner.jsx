import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {styled} from '@mui/material';

//components
import {bannerData} from "../../constants/data";


const StyledImg=styled("img")(({theme})=>({
    width:"100%",
    height:280,
    [theme.breakpoints.down('md')]:{
      objectFit:"cover",
      height:180,
    }
}));
const Banner=()=>{

  const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  };
  return (
    
    <Carousel 
        responsive={responsive} 
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        SlidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
    >
        {
            bannerData.map(data=>(
                <StyledImg src={data.url} alt="banner" />
            ))
        }
    </Carousel>
  )
}

export default Banner; 
