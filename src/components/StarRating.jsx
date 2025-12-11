import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // full star
      stars.push(<FaStar key={i} style={{ color: "red" }} />);
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(<FaStarHalfAlt key={i} style={{ color: "red" }} />);
    } else {
      // empty star
      stars.push(<FaRegStar key={i} style={{ color: "red" }} />);
    }
  }

  return <div className="d-flex align-items-center gap-1">{stars}</div>;
};

export default StarRating
