import React from 'react'
import { StarOutlined } from "@ant-design/icons";
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
const RatingModal = ({ user, handleVisible, visible, children, handleSubmitRating }) => {
    return (
        <>
            <div onClick={handleVisible} >
                <StarOutlined className="text-danger" />
                <br /> {" "}
                {user._id ? 'Leave rating' : <Link to='/login' >
                    Login to leave rating  </Link>}
            </div>
            <Modal
                title="Leave your rating"
                centered
                visible={visible}
                onOk={handleSubmitRating}
                onCancel={() => { handleVisible(false) }}
            >
                {children}
            </Modal>
        </>
    )
}

export default RatingModal
