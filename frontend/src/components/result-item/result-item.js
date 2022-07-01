import heartLogo from '../../assets/logo/Ei-heart.svg';
import redHeartLogo from '../../assets/logo/Ei-heart-red.svg';
import './result-item.scss';

const ResultItem = (props) => (
    <div className="result-item">
        <img src={props.img}/>
        <h3>{props.productTitle}</h3>
        <div className="price-heart">
            {props.price ? <p>{props.price.toString()} تومان </p> : ''}
            
            <img src={props.isFavorited ? redHeartLogo : heartLogo}
                onClick={props.onFavoriteChanged}/>
        </div>
    </div>
);

export default ResultItem;