import React from 'react';
import './report-page.scss';

export default class ReportPage extends React.Component {
    state = {
        reportContent: '', 
        reportType: 'ثبت تخلف'
    }

    setSelectValue(reportType) {
        this.setState({reportType})
    }

    render() {
        return (
            <div className="report-wrapper" style={{display: this.props.show ? 'flex' : 'none'}}>
                <div className="report-content">
                    <div className="report-body">
                        <label htmlFor="reportType">نوع گزارش:</label>
                        <select on={(e) => this.setSelectValue(e.target.value)} id="reportType">
                            <option value="ثبت تخلف">ثبت تخلف</option>
                            <option value="قیمت خارج محدوده">قیمت خارج محدوده</option>
                        </select>
                        <label htmlFor="report-content">متن گزارش</label>
                        <textarea onChange={(e) => this.setState({reportContent: e.target.value})} 
                        id="report-content" placeholder="متن گزارش">
                        </textarea>
                    </div>
                    <div className="buttons">
                        <button onClick={() => this.props.onSubmit(this.state)} className="submit-btn">ثبت گزارش</button>
                        <button onClick={() => this.props.onClose()} className="close-btn">بستن</button>
                    </div>
                </div>
        </div>
        );
    }
}
