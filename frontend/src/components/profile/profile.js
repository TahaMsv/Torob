import React from "react";
import EditProfile from "../edit-profile/edit-profile";
import UserSeenProducts from "../user-seen-products/user-seen-products";
import Navbar from '../navbar/navbar';
import './profile.scss';
import { Link } from "react-router-dom";
import MyReports from "../my-reports/my-reports";

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
                            {this.state.currUser.userType !== 'normal' ? <Link to="/shops" style={{textDecoration: 'none'}}> <li>ثبت فروشگاه</li> </Link> : ''}
                            {this.state.currUser.userType !== 'normal' ?
                             <li onClick={() => this.setState({tab: 4})} className={this.state.tab === 4 ? 'chosen-li':''}>
                                گزارش ها
                            </li> : ''}
                        </ul>
                    </aside>
                    <main>
                        {
                            this.state.tab === 1 ? (<EditProfile />) : 
                                this.state.tab === 2 ? (<UserSeenProducts isFavorite={true}/>) : 
                                this.state.tab === 3 ? (<UserSeenProducts isFavorite={false}/>) :
                                <MyReports />
                        }
                    </main>

                </div>
            </div>
        );
    }
}