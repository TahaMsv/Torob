
import React from 'react';
import ReportPage from '../report-page/report-page';
import './shop-list.scss';

export default class ShopList extends React.Component {
    state = {
        showModal: false,
    }

    onReportSubmit() {
        this.setState({showModal: false});
    }

    render() {
        return (
            <div className="shop-list">
                <div className="title-city">
                    <div className="shop-title">{this.props.name}</div>
                    <p className="shop-city">{this.props.city}</p>
                </div>
                <div className="price-buy">
                    <p>{this.props.sellingPrice} تومان</p>
                    <button className="buy-btn"><a href={this.props.link}>خرید اینترنتی</a></button>
                </div>
                <div className="report-add-btn" onClick={() => this.setState({showModal: true})}>
                    <p >ثبت گزارش</p>
                </div>
                <ReportPage show={this.state.showModal} onSubmit={() => this.onReportSubmit()} 
                    onClose={() => this.setState({showModal: false})}/>
            </div>
        )
    }
}