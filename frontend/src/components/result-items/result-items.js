import React from "react";
import FilterSide from "../filter-side/filter-side";
import ResultItem from '../result-item/result-item';
import SortBy from "../sorting-by/sorting-by";

export default class ResultItems extends React.Component {
    state = {
        resultItems = []
    }
    render() {
        return (
            <div className="result-items">
                <main>
                    <SortBy />
                    {this.state.resultItems.map((item) =>(
                        <ResultItem img={item.img} productTitle={item.name} price={item.price}/>
                    ))}
                </main>
                <aside>
                    <FilterSide />
                </aside>
            </div>
        );
    }
}