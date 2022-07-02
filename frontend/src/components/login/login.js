import React from "react";
import './login.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        userType: 'normal',
        isWrongPassword: false,
        emailNotExists: false,
        showPassword: false,
    }

    fetchLogin() {
        fetch('http://127.0.0.1:3002/auth/login', {
            method: "POST",
            mode: 'cors',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                userType: this.state.userType
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(result => {
                return result.json();
            })
            .then((json) => {
                console.log(json);
                if (json.message === 'successful') {
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('isUserLoggedIn', true);
                    this.setState({isWrongPassword: false, emailNotExists: false});
                    window.location.href = 'http://127.0.0.1:3001/';
                } else {
                    if (json.error.message.startsWith('wrong')) {
                        this.setState({isWrongPassword: true, emailNotExists: false});
                    } else if (json.error.message.startsWith('email')) {
                        this.setState({isWrongPassword: false, emailNotExists: true});
                    }
                }
            })
            .catch((error) => {
            });
    }

    checkBoxChange(value) {
        const userType = value ? 'shopOwner' : 'normal';
        this.setState({userType});
    }

    render() {
        return (
            <div className='login'>
                <div className="login-form">
                    {this.state.isWrongPassword ? <p className="invalid">گذرواژه اشتباه است</p> : ''}
                    {this.state.emailNotExists ? <p className="invalid">ایمیل وجود ندارد</p> : ''}
                    <label htmlFor="email">ایمیل</label>
                    <input id="email" type="email" onChange={(e) => this.setState({email: e.target.value})}/>
                    <label htmlFor="password">گذرواژه</label>
                    <div className="password-wrapper">
                        <input id="password" type={this.state.showPassword ? "text" : "password"}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                        <div className="show-password">
                            <FontAwesomeIcon onClick={() => this.setState({showPassword: !this.state.showPassword})}
                                             style={{cursor: "pointer"}}
                                             icon={this.state.showPassword ? faEyeSlash : faEye}></FontAwesomeIcon>
                        </div>
                    </div>

                    <div className="checkbox-container">
                        <label htmlFor="asShop">ورود به عنوان فروشنده</label>
                        <input type="checkbox" id="asShop" onChange={(e) => this.checkBoxChange(e.target.checked)}/>
                    </div>
                    <button onClick={() => this.fetchLogin()} className="submit-btn">ورود</button>
                </div>
            </div>
        )
    }
};