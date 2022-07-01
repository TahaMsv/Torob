import React from "react";
import './edit-profile.scss';

export default class EditProfile extends React.Component {
    state={
        username: '',
        phone: '', 
        password: '', 
        email: '',
        newPassword: '',
        oldPassword: '',
        wrongOldPassword: false,
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
            this.setState({email: currUser.email, password: currUser.password,
                username: currUser.username, phone: currUser.phone});
        })
        .catch((__) => {});
    }

    fetchEditProfile() {
        fetch(`http://127.0.0.1:3002/user/update`, {
            method: "PUT",
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.username,
                password: this.state.oldPassword === '' ? this.state.password : this.state.newPassword,
                phone: this.state.phone,
            }),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            console.log(json);
        })
        .catch((__) => {});
    }

    componentDidMount() {
        this.fetchCurrUser();
    }

    onChangeOldPass(oldPassValue) {
        this.setState({oldPassword: oldPassValue});
        if (oldPassValue !== '' && oldPassValue !== this.state.password) {
            this.setState({wrongOldPassword: true})
        } else {
            this.setState({wrongOldPassword: false});
        }
    }

    onSubmitForm() {
        if (!this.state.wrongOldPassword || this.state.newPassword === '') {
            this.fetchEditProfile();
        }
    }

    render() {
        return (
            <div className="edit-profile">
                <div>
                    <section className="normal-section">
                        <label htmlFor="username">تغییر نام و نام خانوادگی</label>
                        <input value={this.state.username} id="username" type="text" 
                        onChange={(e) => this.setState({username: e.target.value})}/>
                    </section>
                    <section className="normal-section">
                        <label htmlFor="userphone">تغییر شماره تلفن</label>
                        <input value={this.state.phone} id="userphone" type="text"
                         onChange={(e) => this.setState({phone: e.target.value})}/>
                    </section>
                    <section className="normal-section">
                        <label htmlFor="useremail">تغییر ایمیل</label>
                        <input value={this.state.email} id="useremail" type="email"
                         onChange={(e) => this.setState({email: e.target.value})}/>
                    </section>
                    <section>
                        <p>تغییر گذرواژه</p>
                        <div className="passwords">
                            <section>
                                <label htmlFor="userOldpassword">گذرواژه قدیمی</label>
                                <input onChange={(e) => this.onChangeOldPass(e.target.value)} 
                                    id="userOldpassword" type="password" />
                            </section>
                            <section>
                                <label htmlFor="userNewpassword">گذرواژه جدید</label>
                                <input id="userNewpassword" type="password"
                                    onChange={(e) => this.setState({newPassword: e.target.value})}/>
                            </section>
                            
                        </div>
                        {this.state.wrongOldPassword ?
                             <p className="invalid">رمز با رمز قدیمی مطابقت ندارد</p> : ''}

                    </section>
                </div>
                <section style={{textAlign: 'left', marginBottom: '4em'}}>
                    <button onClick={() => this.onSubmitForm()}>ثبت تغییرات</button>
                </section>
            </div>
        );
    }
}