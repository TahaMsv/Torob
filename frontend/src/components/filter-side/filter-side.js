import React from "react";

export default class FilterSide extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <h2>قیمت</h2>
                        <div>
                            <label for="from">از</label>
                            <input id="from" type="number"/>
                            <label for="to">تا</label>
                            <input id="to" type="number"/>
                        </div>
                    </li>
                    <li>
                        <h2>زیردسته</h2>
                        <div>
                            
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}