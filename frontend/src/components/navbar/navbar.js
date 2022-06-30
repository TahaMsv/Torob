import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Categories from '../categories/categories';

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div>
                    <FontAwesomeIcon icon={faBars} />
                    <p>دسته بندی کالاها</p>
                </div>
                <Categories />
                <button>ورود</button>
                <button>ثبت نام</button>
            </nav>
        );
    }
}