import React from "react";
import './sign-up.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export default class SignUp extends React.Component {
    state={
        currentTab: 'normal',
        email: '', 
        name: '', 
        password: '',
        phone: 0,
        emailAlreadyExistsErr: false,
        emptyFieldErr: false,
    };

    fetchSignUp(userType) {
        fetch('http://127.0.0.1:3002/auth/signup', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                phone: this.state.phone,
                password: this.state.password,
                userType,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(result => {
            return result.json();
        })
        .then((json) => {
            if (json.message === 'successful') {
                localStorage.setItem('token', json.token);
                localStorage.setItem('isUserLoggedIn', true);
                this.setState({emailAlreadyExistsErr: false, emptyFieldErr: false});
                window.location.href = 'http://127.0.0.1:3001/';
            } else {
                if (json.error.message.startsWith('Email')) {
                    this.setState({emailAlreadyExistsErr: true, emptyFieldErr: false});
                } else if (json.error.message.startsWith('Name')) {
                    this.setState({emptyFieldErr: true, emailAlreadyExistsErr: false});
                }
            }
        })
        .catch((error) => {
        });
    }

    onSubmitForm(usertype) {
        this.fetchSignUp(usertype);
    }

    onMailChange(email) {
        this.setState({email});
    }

    validateEmail(email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email));
    }

    validatePassword(password) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(password);
    }

    resetValues () {
        this.setState({email: '', password: '', name: '', phone: 0});
    }

    onChangeTab(currentTab) {
        this.setState({currentTab});
        this.resetValues();
    }
 
    render() {
        return (
            <div className="signup">
                <div className='signup-form'>
                    <div className="signup-buttons">
                        <button onClick={() => this.onChangeTab('normal')} className={this.state.currentTab === 'normal' ? 'chosen-btn' : ''}>
                            کاربران عادی
                        </button>
                        <button onClick={() => this.onChangeTab('seller')} className={this.state.currentTab === 'seller' ? 'chosen-btn' : ''}>
                            فروشندگان
                        </button>
                    </div>
                    {
                        this.state.currentTab === 'normal' ? (
                            <div className="signup-content">

                                <h3>عضویت در کاربران عادی</h3>
                                {this.state.emailAlreadyExistsErr ? <p className='invalid'>کاربری با این ایمیل قبلا ثبت نام شده</p> : ''}
                                {this.state.emptyFieldErr ? <p className='invalid'>یکی از ورودی ها خالی است</p> : ''}

                                <label for="useremail">ایمیل</label>
                                <input onChange={(e) => this.onMailChange(e.target.value)} 
                                    id="useremail" type="email"/>
                                {!this.validateEmail(this.state.email) && this.state.email !== ''
                                 ? <p className="invalid">ایمیل نامعتبر</p> 
                                : ''}

                                <label for="username">نام و نام خانوادگی</label>
                                <input onChange={(e) => this.setState({name: e.target.value})} 
                                     id="username" type="text" />

                                <label for="userpassword">گذرواژه</label>
                                <input onChange={(e) => this.setState({password: e.target.value})}
                                      id="userpassword" type="password"/>
                                {!this.validatePassword(this.state.password) && this.state.password !== ''
                                 ? <p className="invalid">گذرواژه نامعتبر</p> 
                                : ''}

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
                                <input onChange={(e) => this.onMailChange(e.target.value)} 
                                     id="shopemail" type="email"/>
                                {!this.validateEmail(this.state.email) && this.state.email !== ''? 
                                    <p className="invalid">ایمیل نامعتبر</p> 
                                : ''}

                                <label for="shopname">نام و نام خانوادگی</label>
                                <input onChange={(e) => this.setState({name: e.target.value})} 
                                     id="shopname" type="text" />

                                <label for="shoppassword">گذرواژه</label>
                                <input onChange={(e) => this.setState({password: e.target.value})} 
                                     id="shoppassword" type="password"/>
                                
                                {!this.validatePassword(this.state.password) && this.state.password !== ''
                                 ? <p className="invalid">گذرواژه نامعتبر</p> 
                                : ''}

                                <label for="shopphone">شماره تلفن</label>
                                <input onChange={(e) => this.setState({phone: e.target.value})} 
                                     id="shopphone" type="tel" />

                                <button onClick={() => this.onSubmitForm('shopOwner')} className="submit-btn">
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