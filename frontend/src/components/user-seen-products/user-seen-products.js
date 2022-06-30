import React from "react";
import ResultItem from '../result-item/result-item';

export default class UserSeenProducts extends React.Component {
    state = {
        products = []
    };

    render() {
        return (
            <div>
                <h2>{this.props.isFavorite ? "لیست محبوب ها" : "آخرین بازدیدها"}</h2>
                {this.state.products.map((product) => (
                    <ResultItem img={product.img} productTitle={product.productTitle}
                        price={product.price} />
                ))}
            </div>
        )
    }
}