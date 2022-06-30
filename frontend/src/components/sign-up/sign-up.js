import React from "react";
import './sign-up.scss';

export default class SignUp extends React.Component {
    state={
        currentTab: 'normal',
    };

    render() {
        return (
            <div className="signup">
                <div className='signup-form'>
                    <div className="signup-buttons">
                        <button onClick={() => this.setState({currentTab:'normal'})} className={this.state.currentTab === 'normal' ? 'chosen-btn' : ''}>
                            کاربران عادی
                        </button>
                        <button onClick={() => this.setState({currentTab:'seller'})} className={this.state.currentTab === 'seller' ? 'chosen-btn' : ''}>
                            فروشندگان
                        </button>
                    </div>
                    {
                        this.state.currentTab === 'normal' ? (
                            <div className="signup-content">
                                <h3>عضویت در کاربران عادی</h3>
                                <label for="useremail">ایمیل</label>
                                <input id="useremail" type="email"/>

                                <label for="username">نام و نام خانوادگی</label>
                                <input id="username" type="text" />

                                <label for="userpassword">گذرواژه</label>
                                <input id="userpassword" type="password"/>

                                <label for="userphone">شماره تلفن</label>
                                <input id="userphone" type="tel" />

                                <button className="submit-btn">ثبت نام به عنوان کاربر عادی</button>
                            </div>
                        ) : (
                            <div className="signup-content">
                                <h3>عضویت در فروشندگان</h3>
                                <label for="shopemail">ایمیل سازمان</label>
                                <input id="shopemail" type="email"/>

                                <label for="shopname">نام و نام خانوادگی</label>
                                <input id="shopname" type="text" />

                                <label for="shoppassword">گذرواژه</label>
                                <input id="shoppassword" type="password"/>

                                <label for="shopphone">شماره تلفن</label>
                                <input id="shopphone" type="tel" />

                                <button className="submit-btn">ثبت نام به عنوان فروشنده</button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
};