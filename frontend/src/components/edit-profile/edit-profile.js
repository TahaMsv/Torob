import React from "react";
import './edit-profile.scss';

export default class EditProfile extends React.Component {
    state={
        currUser: {}
    }

    fetchCurrUser() {
        fetch(`http://127.0.0.1:3002/user/getuserdetails`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            const currUser = json;
            this.setState({currUser});
        })
        .catch((__) => {});
    }

    componentDidMount() {
        this.fetchCurrUser();
    }
    render() {
        return (
            <div className="edit-profile">
                <div>
                    <section className="normal-section">
                        <label htmlFor="username">تغییر نام و نام خانوادگی</label>
                        <input value={this.state.currUser.username} id="username" type="text" placeholder={this.state.currUser.username}/>
                    </section>
                    <section className="normal-section">
                        <label htmlFor="userphone">تغییر شماره تلفن</label>
                        <input value={this.state.currUser.phone} id="userphone" type="number" placeholder={this.state.currUser.phone}/>
                    </section>
                    <section className="normal-section">
                        <label htmlFor="useremail">تغییر ایمیل</label>
                        <input value={this.state.currUser.email} id="useremail" type="email" placeholder={this.state.currUser.email}/>
                    </section>
                    <section>
                        <p>تغییر گذرواژه</p>
                        <div className="passwords">
                            <section>
                            <label htmlFor="userOldpassword">گذرواژه قدیمی</label>
                            <input id="userOldpassword" type="password"/>
                            </section>
                            <section>
                            <label htmlFor="userNewpassword">گذرواژه جدید</label>
                            <input id="userNewpassword" type="password"/>
                            </section>
                        </div>
                    </section>
                </div>
                <section style={{textAlign: 'left', marginBottom: '4em'}}>
                    <button>ثبت تغییرات</button>
                </section>
            </div>
        );
    }
}