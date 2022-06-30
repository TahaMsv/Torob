import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSort} from '@fortawesome/free-solid-svg-icons';

const SortBy = (props) => (
    <div className="sorting-by">
        <FontAwesomeIcon icon={faSort} />
        <h4>:مرتب سازی بر اساس</h4>
        <ul>
            <li>جدیدترین</li>
            <li>گران ترین</li>
            <li>ارزان ترین</li>
        </ul>
    </div>
);

export default SortBy;