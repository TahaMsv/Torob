import React from "react";
import './sign-up.scss';

export default class SignUp extends React.Component {
    state={
        currentTab: 'normal',
        email: '', 
        name: '', 
        password: '',
        phone: 0,
    };

    onSubmitForm(usertype) {
        // fetch('localhost://')
    }

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
                                <input onChange={(e) => this.setState({email: e.target.value})} 
                                    id="useremail" type="email"/>

                                <label for="username">نام و نام خانوادگی</label>
                                <input onChange={(e) => this.setState({name: e.target.value})} 
                                     id="username" type="text" />

                                <label for="userpassword">گذرواژه</label>
                                <input onChange={(e) => this.setState({password: e.target.value})}
                                      id="userpassword" type="password"/>

                                <label for="userphone">شماره تلفن</label>
                                <input onChange={(e) => this.setState({phone: +(e.target.value)})} 
                                     id="userphone" type="tel" />

                                <button className="submit-btn" onClick={() => this.onSubmitForm('normal')}>
                                    ثبت نام به عنوان کاربر عادی
                                </button>
                            </div>
                        ) : (
                            <div className="signup-content">
                                <h3>عضویت در فروشندگان</h3>
                                <label for="shopemail">ایمیل سازمان</label>
                                <input onChange={(e) => this.setState({email: e.target.value})} 
                                     id="shopemail" type="email"/>

                                <label for="shopname">نام و نام خانوادگی</label>
                                <input onChange={(e) => this.setState({name: e.target.value})} 
                                     id="shopname" type="text" />

                                <label for="shoppassword">گذرواژه</label>
                                <input onChange={(e) => this.setState({password: e.target.value})} 
                                     id="shoppassword" type="password"/>

                                <label for="shopphone">شماره تلفن</label>
                                <input onChange={(e) => this.setState({phone: e.target.value})} 
                                     id="shopphone" type="tel" />

                                <button onClick={() => this.onSubmitForm('seller')} className="submit-btn">
                                    ثبت نام به عنوان فروشنده
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
};