import React, { Fragment, useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import MetaData from '../layout/MetaData'
import ProductCard from '../Home/ProductCard'
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useParams } from 'react-router-dom';
import {clearErrors,getProduct} from '../../actions/productAction';
import './Products.css'

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
function Products() {
    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 35000]);
  const [category, setCategory] = useState("");

  const [rating, setrating] = useState(0);
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
      } = useSelector((state) => state.products);
      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
    
      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      let count = filteredProductsCount;
      useEffect(()=>{
          if(error)
          { 
         alert.error(error)
          }
          if(!error){
          dispatch(getProduct(keyword, currentPage, price, category, rating));}
      },[dispatch, keyword, currentPage, price, category,rating,error,alert])
  return (
    <Fragment>

        {loading?(<Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
         }}>
      <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
    </Box>):(<Fragment><MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
          {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}</div>
               <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="continuous-slider"
              min={0}
              max={35000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">rating Above</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setrating(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>
            {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
              </Fragment>)}
    </Fragment>
  )
}

export default Products