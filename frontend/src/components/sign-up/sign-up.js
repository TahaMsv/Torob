import React from "react";

export default class SignUp extends React.Component {
    render() {
        return (
            <div className="signup">
                <div>
                    <button>کاربران عادی</button>
                    <button>فروشندگان</button>
                </div>

                <div>
                    <h3>عضویت در بخش کاربران عادی</h3>
                    <label for="useremail">ایمیل</label>
                    <input id="useremail" type="email"/>

                    <label for="username">نام و نام خانوادگی</label>
                    <input id="username" type="text" />

                    <label for="userpassword">گذرواژه</label>
                    <input id="userpassword" type="password"/>

                    <label for="userphone">شماره تلفن</label>
                    <input id="userphone" type="tel" />

                    <button>ثبت نام</button>
                </div>

                <div>
                    <h3>عضویت در فروشندگان</h3>
                    <label for="shopemail">ایمیل سازمان</label>
                    <input id="shopemail" type="email"/>

                    <label for="shopname">نام و نام خانوادگی</label>
                    <input id="shopname" type="text" />

                    <label for="shoppassword">گذرواژه</label>
                    <input id="shoppassword" type="password"/>

                    <label for="shopphone">شماره تلفن</label>
                    <input id="shopphone" type="tel" />

                    <button>ثبت نام به عنوان فروشنده</button>
                </div>
            </div>
        )
    }
};