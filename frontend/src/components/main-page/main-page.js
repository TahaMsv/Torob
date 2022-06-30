import React from "react";
import logo from '../../assets/logo/Celery_logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Navbar from "../navbar/navbar";
import './main-page.scss';

export default class MainPage extends React.Component {
    render() {
        return(
                <div className="main-page">
                    <Navbar />
                    <main>
                        <div className="title">
                            <img src={logo} alt="logo"/>
                            <div>
                                <h1>کرفس</h1>
                                <p>موتور جستجوی هوشمند خرید</p>
                            </div>
                        </div>
                        <div className="searchbar">
                            <input type="text" placeholder="نام کالا را وارد کنید"/>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </main>
                </div>
        )
    }
}