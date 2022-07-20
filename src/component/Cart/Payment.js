import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder } from "../../actions/orderAction";
import {useNavigate} from 'react-router-dom';

const Payment = () => {
    const navigate=useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
   console.log("u",order)
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data:stripeapikey } = await axios.get("/payment/stripeapikey");
      console.log("tt",stripeapikey)
      if(stripeapikey)
      {  console.log("s",stripeapikey)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer sk_test_51KpWa9SEriMxkovltSm4Rw7tZBxJ5OeeQkKVe3wDb5N4VJBSORDKQ1GtkS4FfIe1XVcrVTeB74Rq6kHJ5TknBhhH00mmz8rGh3`
        },
      };
      
      const { data } = await axios.post(
        "/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      console.log("y",client_secret)

      if (!stripe || !elements) return;
    // console.log("f",)
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
   console.log("as",result)
      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log("uu",error.response)
     // console.log("oi",error.response.data.message)
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;