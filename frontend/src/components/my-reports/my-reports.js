import React from "react"
import './my-reports.scss';
import Table from 'react-bootstrap/Table';

export default class MyReports extends React.Component {
    state = {
        reports: [{storename: '', reports: []}]
    }

    fetchMyReports() {
        let myStores = [];
        fetch('localhost/shopowner/stores')
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error("Server error");
        })
        .then((json) => {
            myStores = json;
        })
        .catch((__) => {});

        let arr = []

        for(const store of myStores) {
            let storeReports = [];
            fetch(`localhost/report/${store['id']}`)
            .then((res) => {
                if (res.ok) return res.json();
                else throw new Error("Server error");
            })
            .then((json) => {
                storeReports = json;
                if (storeReports.length > 0)
                    arr.push({storename: store['name'], reports: storeReports});
            })
            .catch((__) => {});
        }

        this.setState({reports: arr});  
    }

    componentDidMount() {
        // this.fetchMyReports();

        const mockData = [
            {
                storename: 'دیجیکالا', 
                reports: [{userName: 'ممد', reportType: 'ثبت تخلف', content: 'ندادی کالامو!'}, 
                {userName: 'کریم', reportType: 'گران بودن محصولات', content: 'چخبرتونه'}]
            }, 
            {
                storename: 'سامان کالا', 
                reports: [{userName: 'سیما', reportType: 'ثبت تخلف', content: 'کالا خراب بودو!'}, 
                {userName: 'شهلا', reportType: 'گران بودن محصولات', content: 'بیشتر از بقیه جاهاست'}]
            }, 
        ];

        this.setState({reports: mockData});
    }
    render() {
        return (
            <div className="my-reports">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>نام فروشگاه</th><th>نام کاربر </th>  <th>نوع گزارش</th> <th>محتوا</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reports.map((report) => {
                            return report.reports.map((reportContent) => (
                                <tr>
                                    <td>{report.storename}</td>
                                    <td> {reportContent.userName}</td> 
                                    <td> {reportContent.reportType}</td> 
                                    <td> {reportContent.content}</td>
                                </tr>
                            ))
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}