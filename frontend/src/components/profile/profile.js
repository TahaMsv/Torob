import React from "react";
import EditProfile from "../edit-profile/edit-profile";
import UserSeenProducts from "../user-seen-products/user-seen-products";
import Navbar from '../navbar/navbar';
import './profile.scss';

export default class NormalUserProfile extends React.Component {
    state = {
        currUser: {},
        tab: 1
    }
    render() {
        return (
            <div className="profile-container">
                <Navbar />
                <div className="profile full-height">
                    <aside>
                        <ul>
                            <li onClick={() => this.setState({tab: 1})} className={this.state.tab === 1 ? 'chosen-li':''}>
                                ویرایش پروفایل
                            </li>
                            <li onClick={() => this.setState({tab: 2})} className={this.state.tab === 2 ? 'chosen-li':''}>
                                لیست محبوب ها
                            </li>
                            <li onClick={() => this.setState({tab: 3})} className={this.state.tab === 3 ? 'chosen-li':''}>
                                آخرین مشاهدات
                            </li>
                            {this.state.currUser.userType !== 'normal' ? <li>ثبت فروشگاه</li> : ''}
                        </ul>
                    </aside>
                    <main>
                        {
                            this.state.tab === 1 ? (<EditProfile />) : 
                                this.state.tab === 2 ? (<UserSeenProducts isFavorite={true}/>) : 
                                (<UserSeenProducts isFavorite={false}/>)
                        }
                    </main>

                </div>
            </div>
        );
    }
}