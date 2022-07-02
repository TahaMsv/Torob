import React from "react"
import './my-reports.scss';
import Table from 'react-bootstrap/Table';

export default class MyReports extends React.Component {
    state = {
        reports: [{storename: '', reports: []}]
    }

    async fetchMyReports() {
        let myStores = [];
        const res = await fetch('http://127.0.0.1:3002/shopowner/stores', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        myStores = await res.json();
        // console.log(myStores);
        let arr = [];

        for(const store of myStores) {
            let storeReports = [];
            storeReports = await fetch(`http://127.0.0.1:3002/report/${store['id']}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
            .then((res) => {
                return res.json();
            });
            if (storeReports.length > 0)
                arr.push({storename: store['name'], reports: storeReports});
        }

        console.log(arr);

        this.setState({reports: arr}, () => {
            // console.log(this.state.reports);
        });  
    }

    async componentDidMount() {
        await this.fetchMyReports();
        console.log(this.state.reports);
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

        // this.setState({reports: mockData});
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