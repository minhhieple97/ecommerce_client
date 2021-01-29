import React from 'react'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
    return (
        <div className="text-center" >
            <img src='/images/404.png' alt="page not found" />
            <p style={{ textAlign: "center" }}>
                <Link to="/">Go to Home </Link>
            </p>
        </div>
    )
}

export default NotFoundPage
