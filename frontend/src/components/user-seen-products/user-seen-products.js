import React from "react";
import ResultItem from '../result-item/result-item';
import './user-seen-products.scss';

export default class UserSeenProducts extends React.Component {
    state = {
        products: []
    };

    fetchData() {
        const url = this.props.isFavortie ? 'localhost/normaluser/favorites' : 'localhost/normaluser/latest';
        fetch(url)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error("Server error");
        })
        .then((json) => {
            this.setState({ products: json });
        })
        .catch((__) => {});
    }

    componentDidMount() {
        // this.fetchData();
        const mockData = [
            {
                id: 3,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                dateAdded: "1401/2/31"
            }, {
                id: 4,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                dateAdded: "1401/2/31"
            } , {
                id: 5,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                dateAdded: "1401/2/31"
            }, {
                id: 6,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                dateAdded: "1401/2/31"
            } , {
                id: 7,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                dateAdded: "1401/2/31"
            }
        ];
        this.setState({products: mockData});
    }

    render() {
        return (
            <div className="user-seen-products">
                <h2>{this.props.isFavorite ? "لیست محبوب ها" : "آخرین بازدیدها"}</h2>
                <div className="items">
                    {this.state.products.length > 0 ? this.state.products.map((product) => (
                        <ResultItem img={product.img} productTitle={product.name}
                            price={product.price} />
                    )) : ''}
                </div>
            </div>
        )
    }
}