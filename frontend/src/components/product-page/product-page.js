import React from "react";
import heartLogo from "../../assets/logo/Ei-heart.svg";
import ShopList from "../shop-list/shop-list";

export default class ProductPage extends React.Component {
    state = {
        product = {},
        minPrice = 0,
        maxPrice = 0,
    };


    render() {
        return (
            <div className="product-page">
                <section>
                    {this.state.product.productType.split('|').map((item) => (
                        <a href="#">{item}</a>
                    ))}
                </section>
                <section>
                    <img src={this.state.product.img}/>
                    <h1>{this.state.product.name}</h1>
                    <div>
                        <p>از {this.state.minPrice} تا هزار تومان {this.state.maxPrice} هزار تومان</p>
                    </div>
                    <img src={heartLogo}/>
                </section>
                <section>
                    <h2>لیست فروشگاه‌ها</h2>
                    {this.state.product.stores.map((store) => 
                        <ShopList name={store.name} sellingPrice={store.sellingPrice} 
                            city={store.city} link={store.link}/>)}
                </section>
                <section>
                    <h2>مشخصات {this.state.product.name}</h2>
                    <ul>
                        {Object.keys(this.state.product.details).map((detail) => (
                            <li><span>{detail}:</span> <span>{this.state.product.details[detail]}</span></li>
                        ))}
                    </ul>
                </section>
            </div>
        );
    }
}