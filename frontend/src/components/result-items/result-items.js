import React from "react";
import FilterSide from "../filter-side/filter-side";
import ResultItem from '../result-item/result-item';
import SortBy from "../sorting-by/sorting-by";
import './result-items.scss';
import {Link} from "react-router-dom";
import Navbar from "../navbar/navbar";

export default class ResultItems extends React.Component {
    state = {
        resultItems: [],
        sortby: 'new'
    }

    constructor(props) {
        super(props);
    }

    sendSearchReq(searchValue, type, sortby) {
        const url = `http://127.0.0.1:3002/search?${searchValue ? 'value='+searchValue:''}&${type ? 'type='+type:''}&${sortby ? 'sortby='+sortby:''}`;
        fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'), 
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            this.setState({ resultItems: json });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        const search = this.props.location.search;

        const searchValue = new URLSearchParams(search).get('value');
        const type = new URLSearchParams(search).get('type');
        const sortby = new URLSearchParams(search).get('sortby');
        this.setState({sortby})
        this.sendSearchReq(searchValue, type, sortby);
        const mockValue = [
            {
                id: 3,
                name: "لنوو آیدیا پد",
                img: "https://www.notebookcheck.com/uploads/tx_nbc2/LenovoIdeaPad3-17__1__02.jpg",
                leastPrice: 200000,
                isFavorited: false
            }, {
                id: 4,
                name: 'مک بوک پرو', 
                img: "https://www.zdnet.com/a/img/resize/b40babe27312cb8e8d305c0bd230a382a3c06eff/2020/11/16/37e33024-2892-4bb7-9d21-6ac6f7544def/apple-macbook-pro-m1-2020-5.jpg?auto=webp&height=900&width=1200",
                leastPrice: 3000000,
                isFavorited: true
            }, {
                id: 5,
                name: 'هری پاتر 1',
                img: 'https://images-na.ssl-images-amazon.com/images/I/71NFcRl66bL.jpg',
                leastPrice: 34311,
                isFavorited: false
            }, {
                id: 6,
                name: 'هری پاتر 2',
                img: 'http://prodimage.images-bn.com/pimages/9780545139700_p0_v5_s1200x630.jpg',
                leastPrice: 8383,
                isFavorited: false
            }, {
                id: 7,
                name: 'هری پاتر 3',
                img: 'http://prodimage.images-bn.com/pimages/9780439785969_p0_v3_s1200x630.jpg',
                leastPrice: 12223,
                isFavorited: true
            }, 
            {
                id: 8, 
                name: 'هری پاتر 4', 
                img: 'https://images-na.ssl-images-amazon.com/images/I/91ocU8970hL.jpg',
                leastPrice: 1349,
                isFavorited: false
            }
        ];
    }

    onFavoriteChange(product) {
        const productIndex = this.state.resultItems.findIndex((item) => item.id === product);
        const newProductList = this.state.resultItems;
        newProductList[productIndex].isFavorited = !newProductList[productIndex].isFavorited;
        this.setState({resultItems: newProductList});
    }

    changeSort(sortby) {
        const search = this.props.location.search;
        const searchValue = new URLSearchParams(search).get('value');
        const type = new URLSearchParams(search).get('type');
        this.setState({sortby});
        window.location.href = `http://127.0.0.1:3001/search?${searchValue ? 'value='+searchValue:''}&${type ? 'type='+type:''}&${'sortby='+sortby}`;
        this.sendSearchReq(searchValue, type, sortby);

    }

    render() {
        return (
            <div className="result-items-container">
                <Navbar />
                <div className="result-items">
                    <aside>
                        <FilterSide />
                    </aside>
                    {
                        this.state.resultItems.length > 0 ? (
                            <main>
                                <SortBy sortby={this.state.sortby} changeSort={(sortby) => this.changeSort(sortby)}/>
                                <div className="items">
                                    {this.state.resultItems.map((item) =>(
                                        <Link key={item.id} to={`/product/${item.id}`} style={{textDecoration: "none", width: 'fit-content'}}>
                                            <ResultItem img={item.img} productTitle={item.name} price={item.leastPrice}
                                                isFavorited={item.isFavorited} onFavoriteChanged={() => this.onFavoriteChange(item.id)}/>
                                        </Link>
                                        )
                                    )}
                                </div>
                            </main>
                        ) : (
                            <main>
                                <p className="no-result">نتیجه ای یافت نشد!</p>
                            </main>
                        )
                    }
                    
                </div>
            </div>
        );
    }
}