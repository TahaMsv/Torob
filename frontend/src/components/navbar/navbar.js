import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Categories from '../categories/categories';
import { Link } from "react-router-dom";
import "./navbar.scss";

export default class Navbar extends React.Component {
    state={
        showCategories: false,
        isUserLoggedIn: true,
    }

    onCategoryHover() {
        this.setState({showCategories: !this.state.showCategories});
    }
    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="product-categories-section" onClick={() => this.onCategoryHover()}>
                        <FontAwesomeIcon icon={faBars} />
                        <p>دسته بندی کالاها</p>
                    </div>
                    
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
                                <Link to="/profile">
                                    <button className="signup-btn">پروفایل</button>
                                </Link>
                            )
                        }
                    </div>

                </nav>
                <Categories show={this.state.showCategories}/>
            </div>
        );
    }
}