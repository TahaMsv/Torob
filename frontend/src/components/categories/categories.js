import React from "react";
import "./categories.scss";

export default class Categories extends React.Component {
    state = {
        currentOpenTab: 1,
        selectedCategory: ''
    }
    constructor(props) {
        super(props);
    }

    changeTab(id) {
        this.setState({currentOpenTab: id});
    }

    fetchSearchCategory(category) {
        // fetch(`http://127.0.0.1:3002/search?type=${category}`, {
        // method: "GET",
        
        // headers: {
        //     'Authorization': 'Bearer ' + localStorage.getItem('token'), 
        //     "Content-type": "application/json; charset=UTF-8"
        // }
        // })
        // .then(response => response.json())
        // .then(json => console.log(json));

        window.location.href = `http://127.0.0.1:3001/search?type=${category}`;
    }

    render() {
        return (
            <div>
                {this.props.show ? (
                    <div className="categories">
                    <aside>
                        <ul>
                            <li onClick={() => this.fetchSearchCategory('')} onMouseEnter={() => this.changeTab(1)}>
                                موبایل و تبلت
                            </li>
                            <li onClick={() => this.fetchSearchCategory('laptop')} onMouseEnter={() => this.changeTab(2)}>
                                لپ تاپ
                            </li>
                        </ul>
                    </aside>
                    <main>
                        {this.state.currentOpenTab === 1 ? (
                            <ul>
                            <li>
                                <p onClick={() => this.fetchSearchCategory('mobile')}>گوشی موبایل</p>
                                <ul>
                                    <li onClick={() => this.fetchSearchCategory('mobile|samsung')}>سامسونگ</li>
                                    <li onClick={() => this.fetchSearchCategory('mobile|xiaomi')}>شیائومی</li>
                                    <li onClick={() => this.fetchSearchCategory('mobile|apple')}>اپل</li>
                                </ul>
                            </li>
                            <li>
                                <p onClick={() => this.fetchSearchCategory('tablet')}>تبلت</p>
                                <ul>
                                    <li onClick={() => this.fetchSearchCategory('tablet|samsung')}>سامسونگ</li>
                                    <li onClick={() => this.fetchSearchCategory('tablet|xiaomi')}>شیائومی</li>
                                    <li onClick={() => this.fetchSearchCategory('tablet|apple')}>اپل</li>
                                </ul>
                            </li>
                        </ul>
                        ) : (
                        <ul>
                            <li>
                                <p onClick={() => this.fetchSearchCategory('laptop')}>لپ تاپ</p>
                                <ul>
                                    <li onClick={() => this.fetchSearchCategory('laptop|lenovo')}>لنوو</li>
                                    <li onClick={() => this.fetchSearchCategory('laptop|asus')}>ایسوس</li>
                                    <li onClick={() => this.fetchSearchCategory('laptop|apple')}>اپل</li>
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