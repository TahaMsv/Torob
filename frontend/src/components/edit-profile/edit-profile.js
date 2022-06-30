import React from "react";

export default class EditProfile extends React.Component {
    state={
        currUser = {}
    }
    render() {
        return (
            <div className="edit-profile">
                <lablel for="username">تغییر نام و نام خانوادگی</lablel>
                <input id="username" type="text" placeholder={this.state.currUser.name}/>
                <label for="userphone">تغییر شماره تلفن</label>
                <input id="userphone" type="number" placeholder={this.state.currUser.phone}/>
                <label for="useremail">تغییر ایمیل</label>
                <input id="useremail" type="email" placeholder={this.state.currUser.email}/>

                <p>تغییر گذرواژه</p>
                <label for="userOldpassword">گذرواژه قدیمی</label>
                <input id="userOldpassword" type="password"/>
                <label for="userNewpassword">گذرواژه جدید</label>
                <input id="userNewpassword" type="password"/>

                <button>ثبت تغییرات</button>
            </div>
        );
    }
}