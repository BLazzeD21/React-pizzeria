import React, { useState } from 'react';
import arrow from '../assets/icons/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../store/slices/filterSlice';
import { sortTypes } from '../utils/sortTypes';

const Sort = () => {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filter.sortType);

  const [visibleSelect, setVisibleSelect] = useState(false);

  const onClickSort = (type) => {
    dispatch(setSortType(type));
    setVisibleSelect(!visibleSelect);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img
          src={arrow}
          alt="arrow"
          className={visibleSelect ? 'arrow rotate' : 'arrow '}
        />
        <b>Sort by:</b>
        <span onClick={() => setVisibleSelect(!visibleSelect)}>
          {sortType.name}
        </span>
      </div>
      {visibleSelect && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, index) => (
              <li
                key={index}
                className={sortType.name === type.name ? 'active' : ''}
                onClick={() => {
                  onClickSort(type);
                }}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
