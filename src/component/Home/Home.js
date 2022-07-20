
import React, { Fragment, useEffect,useState } from 'react'
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
   const { loading, error, products } = useSelector((state) => state.products);
   
     useEffect(() => {
        if (error) {
         return alert.error(error);
          //dispatch(clearErrors());
        }
        dispatch(getProduct());
      }, [dispatch,error]);
  return (
      <Fragment>
          {loading ?(
    <Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
         }}>
      <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
    </Box>):(
    <Fragment>
        <MetaData title="ECOMMERCE" />
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products && products.map((product)=>{
                return(<ProductCard key={product._id} product={product}></ProductCard>)
            })}
          </div>
    </Fragment>)}
    </Fragment>
  )
}

export default Home