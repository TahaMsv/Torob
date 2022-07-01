import React from "react";
import EditProfile from "../edit-profile/edit-profile";
import UserSeenProducts from "../user-seen-products/user-seen-products";
import Navbar from '../navbar/navbar';  
import './profile.scss';
import { Link } from "react-router-dom";
import MyReports from "../my-reports/my-reports";
import MyShops from "../my-shops/my-shops";

export default class NormalUserProfile extends React.Component {
    state = {
        currUser: {},
        tab: 1
    }

    getMainComponent() {
        switch (this.state.tab) {
            case 1:
                 return (<EditProfile/>)
            case 2:
            case 3:
                return (<UserSeenProducts isFavorite ={this.state.tab === 2}/>)
            case 4:
                return (<MyReports/>)
            case 5:
                return (<MyShops/>)
            default:
                break;
        }
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
                            {this.state.currUser.userType !== 'normal' ?
                             <li onClick={() => this.setState({tab: 4})} className={this.state.tab === 4 ? 'chosen-li':''}>
                                گزارش ها
                            </li> : ''}
                            {this.state.currUser.userType !== 'normal' ? 
                            <li onClick={() => this.setState({tab: 5})} className={this.state.tab === 5 ? 'chosen-li':''}>
                                ثبت فروشگاه
                            </li> : ''}
                        </ul>
                    </aside>
                    <main>
                        {
                           this.getMainComponent()
                        }
                    </main>

                </div>
            </div>
        );
    }
}