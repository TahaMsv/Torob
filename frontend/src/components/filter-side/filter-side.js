import React from "react";
import './filter-side.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

export default class FilterSide extends React.Component {
    state = {
        showPriceFilter: false,
        showTypeFilter: false,
        minPrice: 0,
        maxPrice: 9999999,
    }
    render() {
        return (
            <div className="filter-side">
                <ul>
                    <li>
                        <h2 onClick={() => this.setState({showPriceFilter: !this.state.showPriceFilter})}>
                            قیمت <FontAwesomeIcon icon={faAngleDown}/>
                        </h2>
                        {this.state.showPriceFilter ? (
                            <div className="price-filter">
                                <div>
                                    <label htmlFor="from">از</label>
                                    <input onChange={(e) => this.setState({minPrice: e.target.value})}
                                         id="from" type="number"/>
                                    <label htmlFor="to">تا</label>
                                    <input onChange={(e) => this.setState({maxPrice: e.target.value})}
                                        id="to" type="number"/>
                                </div>
                                <button onClick={() => this.props.submitPrice(this.state.minPrice, this.state.maxPrice)}>
                                    اعمال فیلتر قیمت
                                </button>
                            </div>
                        ) : ''}
                    </li>
                    <li>
                        <h2>زیردسته <FontAwesomeIcon icon={faAngleDown}/></h2>
                        <div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}