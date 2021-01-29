
import { Button } from 'antd';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase';
import { validateEmail } from '../../ultil/validation';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    if (user) {
        return <Redirect to="/" ></Redirect>
    }
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const flagEmail = validateEmail(email);
            if (!flagEmail) {
                throw new Error('Your email address is not valid, please try again.')
            }
            const config = {
                url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
                handleCodeInApp: true,
            };
            await auth.sendPasswordResetEmail(email, config);
            setEmail('');
            setLoading(false);
            toast.success('Check your email for password reset link.')
        } catch (e) {
            let message = '';
            switch (e.code) {
                case 'auth/user-not-found':
                    message = 'There are no accounts matching this email, please try again.'
                    break
                default:
                    message = e.message
                    break;
            }
            setLoading(false);
            toast.error(message)
        }
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            <form  >
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    disabled={loading}
                    autoFocus
                />
                <br />
                <Button loading={loading} type="danger" onClick={handleSubmit} className="mb-3" block shape="round" size="large" disabled={!email || loading}  >
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword
