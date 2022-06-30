import React from "react";
import "./categories.scss";

export default class Categories extends React.Component {
    state = {
        currentOpenTab: 1
    }
    constructor(props) {
        super(props);
    }

    changeTab(id) {
        this.setState({currentOpenTab: id});
    }

    render() {
        return (
            <div>
                {this.props.show ? (
                    <div className="categories">
                    <aside>
                        <ul>
                            <li onMouseEnter={() => this.changeTab(1)}>موبایل و تبلت</li>
                            <li onMouseEnter={() => this.changeTab(2)}>لپ تاپ</li>
                        </ul>
                    </aside>
                    <main>
                        {this.state.currentOpenTab === 1 ? (
                            <ul>
                            <li>
                                <p>گوشی موبایل</p>
                                <ul>
                                    <li>سامسونگ</li>
                                    <li>شیائومی</li>
                                    <li>اپل</li>
                                </ul>
                            </li>
                            <li>
                                <p>تبلت</p>
                                <ul>
                                    <li>سامسونگ</li>
                                    <li>شیائومی</li>
                                    <li>اپل</li>
                                </ul>
                            </li>
                        </ul>
                        ) : (
                        <ul>
                            <li>
                                <p>لپ تاپ</p>
                                <ul>
                                    <li>لنوو</li>
                                    <li>ایسوس</li>
                                    <li>اپل</li>
                                </ul>
                            </li>
                        </ul>
                        )}
                    </main>
                </div>
                ) : ""}
            </div>
        );
    }
}