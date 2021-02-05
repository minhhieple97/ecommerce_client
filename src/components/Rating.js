import React from "react";
import StarRating from "react-star-ratings";
import { roundTowDecimal } from "../ultil/helper";
const Rating = ({ average }) => {
  return (
    <div className="text-center pt-1 pb-3">
      <span>
        <StarRating
          starDimension="20px"
          starSpacing="2px"
          starRatedColor="red"
          rating={average}
          editing={false}
        ></StarRating>{" "}
        ({roundTowDecimal(average)})
      </span>
    </div>
  );
};
export default Rating;
