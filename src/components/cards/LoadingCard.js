import { Card, Skeleton } from 'antd'
import React from 'react'
const LoadingCard = ({ count }) => {
    const renderCard = () => {
        const totalCards = [];
        for (let index = 0; index < count; index++) {
            totalCards.push(<Card key={index} className="col m-3" >
                <Skeleton active ></Skeleton>
            </Card>)
        }
        return totalCards;
    }
    return <div className="row pb-5" >{renderCard()}</div>
}
export default LoadingCard
