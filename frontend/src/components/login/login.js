import React from "react";
import './login.scss';

export default class Login extends React.Component {
    render() {
        return (
            <div className='login'>
                <div className="login-form">
                    <label for="email">ایمیل</label>
                    <input id="email" type="email" />
                    <label for="password">گذرواژه</label>
                    <input id="password" type="password"/>

                    <div className="checkbox-container">
                        <label for="asShop" >ورود به عنوان فروشنده</label>
                        <input type="checkbox" id="asShop"/>
                    </div>
                    <button className="submit-btn">ورود</button>
                </div>
            </div>
        )
    }
};