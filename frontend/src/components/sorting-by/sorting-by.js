import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import './sorting-by.scss';

const SortBy = (props) => (
    <div className="sorting-by">
        <FontAwesomeIcon icon={faSort} />
        <h4>مرتب سازی بر اساس:</h4>
        <ul>
            <li className={props.sortby === 'new' ? 'green-color' : ''} onClick={() => props.changeSort('new')}> 
                جدیدترین
            </li>
            <li className={props.sortby === 'expensive' ? 'green-color' : ''} onClick={() => props.changeSort('expensive')}>
                گران ترین
            </li>
            <li className={props.sortby === 'cheap' ? 'green-color' : ''} onClick={() => props.changeSort('cheap')}>
                ارزان ترین
            </li>
        </ul>
    </div>
);

export default SortBy;