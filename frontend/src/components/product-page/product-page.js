import React from "react";
import heartLogo from "../../assets/logo/Ei-heart.svg";
import ShopList from "../shop-list/shop-list";
import './product-page.scss';

export default class ProductPage extends React.Component {
    state = {
        product: {},
        minPrice: Number.MAX_SAFE_INTEGER,
        maxPrice: 0,
    };

    fetchProduct(productId) {
        fetch(`localhost/product/${productId}`)
        .then((res) => {
            if (res.ok) return res.json();
            else throw new Error("Coin Not Found");
        })
        .then((json) => {
            this.setState({ product: json });
            this.addnewItemToLocal(json);
        })
        .catch((__) => {});
    }

    setMinMaxPrices(product) {
        let minPrice = this.state.minPrice, maxPrice = this.state.maxPrice;
        for (const store of product.stores) {
            if (+(store.sellingPrice) < minPrice) {
                minPrice = +(store.sellingPrice);
            }

            if (+(store.sellingPrice) > maxPrice) {
                maxPrice = +(store.sellingPrice);
            }
        }

        this.setState({minPrice, maxPrice});
    }

    componentDidMount() {
        const productId = this.props.match.params.id;

        // this.fetchProduct();
        const mockProduct = {
            id: 15,
            name: "iPhone 13 pro max",
            img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/HA244?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1631831826000",
            productType: "لپ تاپ | لنوو",
            details: {
              "رم": "8GB",
              "دوربین": "28Mp"
            },
            stores: [
              {
                "id": 7,
                "name": "هماکالا",
                "city": "مشهد",
                "sellingPrice": "55000000",
                "link": "http://facebook.com"
              },
              {
                "id": 14,
                "name": "دیجی کالا",
                "city": "تهران",
                "sellingPrice": "53200000",
                "link": "http://google.com"
              },
              {
                "id": 13,
                "name": "دیجی کالا",
                "city": "تهران",
                "sellingPrice": "53200000",
                "link": "http://google.com"
              },
              {
                "id": 12,
                "name": "دیجی کالا",
                "city": "تهران",
                "sellingPrice": "53200000",
                "link": "http://google.com"
              },
              {
                "id": 11,
                "name": "دیجی کالا",
                "city": "تهران",
                "sellingPrice": "53200000",
                "link": "google.com"
              }
            ]
        };

        this.setState({product: mockProduct});
        this.setMinMaxPrices(mockProduct);
    }


    render() {
        return (
            <div className="product-page">
                <section className="categories-list">
                    {this.state.product.productType ? this.state.product.productType.split('|').map((item) => (
                        <a href="#">{item} {'>'} </a>
                    )) : ''}
                </section>
                <section className="header">
                    <img className="product-img" src={this.state.product.img}/>
                    <div className="name-price">
                        <h1>{this.state.product.name}</h1>
                        <div>
                            <p>از {this.state.minPrice} هزار تومان تا  {this.state.maxPrice} هزار تومان</p>
                        </div>
                    </div>
                    <img className="heart-logo" src={heartLogo}/>
                </section>
                <div className="store-details">
                    <section className="shop-list-wrapper">
                        <h2>لیست فروشگاه‌ها</h2>
                        {this.state.product.stores ? this.state.product.stores.map((store) => 
                            <ShopList key={store.id} name={store.name} sellingPrice={store.sellingPrice} 
                                city={store.city} link={store.link}/>) : ''}
                    </section>
                    <section className="details-wrapper">
                        <h2>مشخصات {this.state.product.name}</h2>
                        <ul>
                            {this.state.product.details ?
                                Object.keys(this.state.product.details).map((detail) => (
                                <li key={detail}><span className="detail-title">{detail}</span> <br/><span className="detail-content">
                                    {this.state.product.details[detail]}</span></li>
                            )) : ''}
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
}