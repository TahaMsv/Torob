import React from "react";
import './login.scss';

export default class Login extends React.Component {
    state = {
        email: '', 
        password: '', 
        userType: 'normal',
        isWrongPassword: false,
        emailNotExists: false
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
            if (json.message === 'successful') {
                localStorage.setItem('token', json.token);
                localStorage.setItem('isUserLoggedIn', true);
                this.setState({isWrongPassword: false, emailNotExists: false});
                window.location.href = 'http://127.0.0.1:3000/';
            } else {
                if (json.error.message.startsWith('wrong')) {
                    this.setState({isWrongPassword: true, emailNotExists: false});
                }  else if (json.error.message.startsWith('email')) {
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
                    <input id="password" type="password" onChange={(e) => this.setState({password: e.target.value})}/>

                    <div className="checkbox-container">
                        <label htmlFor="asShop" >ورود به عنوان فروشنده</label>
                        <input type="checkbox" id="asShop" onChange={(e) => this.checkBoxChange(e.target.checked)}/>
                    </div>
                    <button onClick={() => this.fetchLogin()} className="submit-btn">ورود</button>
                </div>
            </div>
        )
    }
};