import React, { Fragment, useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { useAlert } from "react-alert";
import {getProductDetails,newReview,} from '../../actions/productAction'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import { addItemsToCart } from "../../actions/cartAction";
import Rating from '@mui/material/Rating';
import ReviewCard from './ReviewCard';
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import  './ProductDetails.css';
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

function Productetails() {
    const { id } = useParams();
    const alert=useAlert();
    const dispatch=useDispatch();
    const {loading,product,error}=useSelector((state)=>state.productDetails)
    const { success, error: reviewError } = useSelector(
      (state) => state.newReview
    );
    const options = {
        size: "large",
        value: product.rating,
        readOnly: true,
        precision: 0.5,
      };
      const [quantity, setQuantity] = useState(1);
      const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
      const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
      };
      const increaseQuantity = () => {
        if (product.stock <= quantity) return;
    
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreaseQuantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };
      const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };
    useEffect(()=>{
        if(error)
        {
         return alert.error(error)
        }
        if (reviewError) {
          alert.error(reviewError);
        }
    
        if (success) {
          alert.success("Review Submitted Successfully");
          dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(id))
    },[dispatch,error,alert,id,reviewError,success])
  return (
      <Fragment>
     {loading?(<Box sx={{ width: '100vw',height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'
         }}>
      <CircularProgress color="inherit" style={{width:'5vmax', height:'5vmax'}} />
    </Box>):(

      <Fragment>
<MetaData title={`${product.name}--ECOMMERCE`}></MetaData>
<div className="ProductDetails">

    <div >
    <Carousel width="60%">{product.images && product.images.map((item,index)=>
        (<img className="CarouselImage"
        key={index}
        src={item.url}
        alt={`${index} Slide`}></img>))
    }</Carousel>
    </div>

    <div>
    <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
    </div>
    <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
    </div>
    <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
    </div>
</div>
<h3 className="reviewsHeading">REVIEWS</h3>
<Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
{product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
</Fragment>
     )}
      
    
    </Fragment>
  )
}

export default Productetails