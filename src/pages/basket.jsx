import React from "react";
import { Link } from "react-router-dom";

const Basket = ({ basket, addToBasket, decrementCount }) => {
  const total = basket ? basket.reduce((sum, item) => sum + (parseFloat(item.price) * item.count), 0) : 0;

  const handleCheckout = () => {
    alert("Функция оплаты находится в разработке. Спасибо за ожидание!");
  };

  return (
    <div className="basket-container">
      <span className="basket-eyebrow">Ваш заказ</span>
      <h2>Корзина</h2>
      <div className="basket-divider ornament">✦</div>

      {!basket || basket.length === 0 ? (
        <div className="basket-empty">
          <span className="basket-empty-icon">✦</span>
          <p>Ваша корзина пуста</p>
          <Link to="/" className="basket-empty-link">← Посмотреть меню</Link>
        </div>
      ) : (
        <>
          <ul className="basket-list">
            {basket.map((item) => (
              <li key={item.id} className="basket-item">
                <div className="basket-item-info">
                  <div className="basket-item-title">{item.title}</div>
                  <div className="basket-item-descr">{item.descr}</div>
                </div>
                <div className="basket-item-right">
                  <div className="basket-item-counter">
                    <button className="counter-btn" onClick={() => decrementCount(item.id)}>−</button>
                    <span className="counter-value">{item.count}</span>
                    <button className="counter-btn" onClick={() => addToBasket(item)}>+</button>
                  </div>
                  <div className="basket-item-price">
                    {(parseFloat(item.price) * item.count).toLocaleString('ru-RU')}
                    <span className="basket-item-price-cur"> ₸</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="basket-summary">
            <div className="basket-total">
              <span className="basket-total-label">Итого к оплате:</span>
              <div className="basket-total-value">
                <span className="basket-total-price">{total.toLocaleString('ru-RU')}</span>
                <span className="basket-total-price-cur"> ₸</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Оплатить заказ
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Basket;