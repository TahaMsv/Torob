const ReportPage = (props) => (
    <div>
        <label for="reportType">نوع گزارش:</label>
        <select id="reportType">
            <option>ثبت تخلف</option>
            <option>قیمت خارج محدوده</option>
        </select>
        <label for="report-content">متن گزارش</label>
        <textarea id="report-content"></textarea>
        <buttn>ثبت گزارش</buttn>
    </div>
)