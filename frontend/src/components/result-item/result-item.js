import heartLogo from '../../assets/logo/Ei-heart.svg';

const ResultItem = (props) => (
    <div className="result-item">
        <img src={props.img}/>
        <h3>{props.productTitle}</h3>
        <div>
            <p>{props.price}</p>
            <img src={heartLogo}/>
        </div>
    </div>
);

export default ResultItem;