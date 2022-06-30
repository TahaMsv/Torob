
import ReportPage from '../report-page/report-page';

const ShopList = (props) => (
    <div className="shop-list">
        <div>
            <div>{props.name}</div>
            <p>{props.city}</p>
        </div>
        <div>
            <p>{props.sellingPrice}</p>
            <button><a href={props.link}>خرید اینترنتی</a></button>
        </div>
        <div>
            <p>ثبت گزارش</p>
        </div>

        <ReportPage />
    </div>
);

export default ShopList;