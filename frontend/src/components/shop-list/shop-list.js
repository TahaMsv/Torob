
import React from 'react';
import ReportPage from '../report-page/report-page';
import './shop-list.scss';

export default class ShopList extends React.Component {
    state = {
        showModal: false,
    }

    fetchCreateReport(report) {
        fetch(`http://127.0.0.1:3002/report/create`, {
            method: "POST",
            body: JSON.stringify({
                shopId: this.props.id,
                content: report.reportContent,
                type: report.reportType,
            }),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            // console.log(json);
        })
        .catch((__) => {});
    }

    onReportSubmit(report) {
        this.fetchCreateReport(report);
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
                <ReportPage show={this.state.showModal} onSubmit={(report) => this.onReportSubmit(report)} 
                    onClose={() => this.setState({showModal: false})}/>
            </div>
        )
    }
}