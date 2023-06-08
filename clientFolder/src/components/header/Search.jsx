import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

import {InputBase, Box, List, ListItem, styled} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// components
import { getProducts } from '../../redux/actions/productAction';


const StyledBox=styled(Box)`
    background: #fff; 
    width:38%; 
    border-radius:2px; 
    margin-left:10px;
    display:flex
`;
const StyledInput=styled(InputBase)`
    padding-left:20px; 
    width:100%;
    font-size:unset;
`;
const StyledIconWrapper=styled(Box)`
    margin-left: auto;
    padding: 5px;
    display: flex;
    color: #2873f0;
`;

const ListWrapper=styled(List)`
    position:absolute;
    background:#fff;
    color:#000;
    margin-top:36px;
`;

const Search=()=>{
    const [text, setText]=useState("");

    const {products}=useSelector(state=>state.getProducts);

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const getText=(text)=>{
        setText(text);
    }

    return(
        <StyledBox>
            <StyledInput 
                placeholder="Search for products, brands and more"
                onChange={(e)=>getText(e.target.value)}
                value={text}
            />
            <StyledIconWrapper>
                <SearchIcon/>
            </StyledIconWrapper>
            {
                text &&
                <ListWrapper>
                    {
                        products.filter(product=>
                            product.title.longTitle.toLowerCase().includes(text.toLowerCase()))
                            .map(product=>(
                                <ListItem>
                                    <Link 
                                        to={`product/${product.id}`} 
                                        onClick={()=>setText("")}
                                        style={{textDecoration:"none", color:"inherit"}}
                                    >
                                        {product.title.longTitle}
                                    </Link>
                                </ListItem>
                            ))
                    }  
                </ListWrapper>
            }
        </StyledBox>
    )
}

export default Search;