import React, { Fragment, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQueue } from '../store/filter/slice';

import logo from '../assets/icons/dodoPizza.svg';
import cart from '../assets/icons/cartWhite.svg';
import Input from './Search/Search';
import { selectCart } from '../store/cart/selectors';

const Header: React.FC = () => {
  const { items, totalCount, totalPrice } = useSelector(selectCart);
  const dispatch = useDispatch()

  const isMounted = useRef<boolean>(false);
  const location = useLocation();

  const handleCartOnClick = () => {
    dispatch(setSearchQueue(''))
  }

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cartItems', json);
    }

    isMounted.current = true;
  }, [items])

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img src={logo} width={'70px'} alt="dodo-pizza" />
            <div>
              <h1>Dodo Pizza</h1>
              <p>Fast free delivery to home and office</p>
            </div>
          </div>
        </Link>
        {location.pathname == '/cart' ? (
          ''
        ) : (
          <Fragment>
            <Input />
            <div className="header__cart" onClick={handleCartOnClick}>
              <Link to="/cart" className="button button--cart">
                <span>{Math.round(totalPrice * 100) / 100} $</span>
                <div className="button__delimiter"></div>
                <img
                  src={cart}
                  className="basket"
                  width={'22px'}
                  alt="basket"
                />
                <span>{totalCount}</span>
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
