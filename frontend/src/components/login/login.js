import React from "react";

export default class Login extends React.Component {
    render() {
        return (
            <div className="login">
                <label for="email">ایمیل</label>
                <input id="email" type="email" />
                <label for="password">گذرواژه</label>
                <input id="password" type="password"/>

                <label for="asShop" >ورود به عنوان فروشنده</label>
                <input type="checkbox" id="asShop"/>

                <button>ورود</button>
            </div>
        )
    }
};