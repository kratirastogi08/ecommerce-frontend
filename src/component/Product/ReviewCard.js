import Rating from '@mui/material/Rating';
import React from "react";
import { MdAccountCircle } from "react-icons/md";


const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
     <MdAccountCircle></MdAccountCircle>
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;