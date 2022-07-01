import React from "react";
import logo from '../../assets/logo/Celery_logo.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Navbar from "../navbar/navbar";
import './main-page.scss';
import { Link } from "react-router-dom";

export default class MainPage extends React.Component {
    state={
        searchbarValue: '',
    }
 
    render() {
        return(
                <div className="main-page">
                    <Navbar isMain={true}/>
                    <main>
                        <div className="title">
                            <img src={logo} alt="logo"/>
                            <div>
                                <h1>کرفس</h1>
                                <p>موتور جستجوی هوشمند خرید</p>
                            </div>
                        </div>
                        <div className="searchbar">
                            <input type="text" placeholder="نام کالا را وارد کنید" 
                                onChange={(e) => this.setState({searchbarValue: e.target.value})}/>
                            <Link to={`/search?value=${this.state.searchbarValue}`}>
                                <FontAwesomeIcon color='black' icon={faSearch} />
                            </Link>
                        </div>
                    </main>
                </div>
        )
    }
}