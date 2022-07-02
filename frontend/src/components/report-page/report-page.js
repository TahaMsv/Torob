import React from 'react';
import './report-page.scss';
import {Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter} from 'react-bootstrap';

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
            <Modal show={this.props.show} className="report-modal" onHide={() => this.props.onClose()}>
                <ModalHeader closeButton>
                    <ModalTitle>ثبت گزارش</ModalTitle>
                </ModalHeader>

                <ModalBody>
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
                </ModalBody>

                <ModalFooter className="report-footer">
                    <button onClick={() => this.props.onSubmit(this.state)} className="submit-btn">ثبت گزارش</button>
                    <button onClick={() => this.props.onClose()} className="close-btn">بستن</button>
                </ModalFooter>
            </Modal>
        );
    }
}
