import './report-page.scss';

const ReportPage = (props) => (
    <div className="report-wrapper" style={{display: props.show ? 'flex' : 'none'}}>
            <div className="report-content">
                <div className="report-body">
                    <label htmlFor="reportType">نوع گزارش:</label>
                    <select id="reportType">
                        <option>ثبت تخلف</option>
                        <option>قیمت خارج محدوده</option>
                    </select>
                    <label htmlFor="report-content">متن گزارش</label>
                    <textarea id="report-content"></textarea>
                </div>
                <div className="buttons">
                    <button onClick={() => props.onSubmit()} className="submit-btn">ثبت گزارش</button>
                    <button onClick={() => props.onClose()} className="close-btn">بستن</button>
                </div>
            </div>
    </div>
    
);

export default ReportPage;