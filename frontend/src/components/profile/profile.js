import React from "react";
import EditProfile from "../edit-profile/edit-profile";
import UserSeenProducts from "../user-seen-products/user-seen-products";

export default class NormalUserProfile extends React.Component {
    state = {
        currUser = {}
    }
    render() {
        return (
            <div className="profile">
                <aside>
                    <ul>
                        <li>ویرایش پروفایل</li>
                        <li>لیست محبوب ها</li>
                        <li>آخرین مشاهدات</li>
                        {this.state.currUser.userType !== 'normal' ? <li>ثبت فروشگاه</li> : ''}
                    </ul>
                </aside>
                <main>
                    <EditProfile />
                    <UserSeenProducts isFavorite={true}/>
                    <UserSeenProducts isFavorite={false}/>
                </main>

            </div>
        );
    }
}