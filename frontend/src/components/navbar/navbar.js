import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Categories from '../categories/categories';
import { Link } from "react-router-dom";
import "./navbar.scss";

export default class Navbar extends React.Component {
    state={
        showCategories: false,
        isUserLoggedIn: false,
    }

    componentDidMount() {
        this.setState({isUserLoggedIn: localStorage.getItem('isUserLoggedIn')});
    }

    onCategoryHover() {
        this.setState({showCategories: !this.state.showCategories});
    }

    onLogoutClicked() {
        localStorage.removeItem('token');
        localStorage.removeItem('isUserLoggedIn');
        this.setState({isUserLoggedIn: false});
    }

    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="product-categories-section" onClick={() => this.onCategoryHover()}>
                        <FontAwesomeIcon icon={faBars} />
                        <p>دسته بندی کالاها</p>
                    </div>
                    {
                        !this.props.isMain ? <Link to='/' className="back-to-main">
                                بازگشت به صفحه اصلی
                            </Link> : ''
                    }
                    <div className="buttons">
                        {
                            !this.state.isUserLoggedIn ? (
                                <div>   
                                    <Link to="/login">
                                        <button className="login-btn">ورود</button>
                                    </Link>
                                    <Link to="/signup">
                                        <button className="signup-btn">ثبت نام</button>
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link to="/profile">
                                        <button className="signup-btn">پروفایل</button>
                                    </Link>
                                    <button onClick={() => this.onLogoutClicked()} className="login-btn">خروج</button>
                                </div>
                            )
                        }
                    </div>

                </nav>
                <Categories show={this.state.showCategories}/>
            </div>
        );
    }
}