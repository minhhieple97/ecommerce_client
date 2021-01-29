import React from 'react'
import StarRating from 'react-star-ratings'
import { showAverage } from '../ultil/helper'
const Ratings = ({ p }) => {
    return (
        <div className="text-center pt-1 pb-3" >
            <span>
                <StarRating starDimension="20px" starSpacing="2px" starRatedColor="red" rating={showAverage(p)} editing={false}  >

                </StarRating> ({p.ratings.length})
            </span>
        </div>
    )
}
export default Ratings
