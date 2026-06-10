import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Title from "./components/title.jsx";
import initialMenu from './modal/menu.js';
import Navbar from './components/navbar.jsx';
import About from "./pages/about.jsx";
import AdminPage from "./pages/adminPage.jsx";
import Login from "./pages/Login.jsx";
import Basket from './pages/basket.jsx';
import './App.css';
import initialBasket from "./modal/basket.js";

function App() {
    const [menu] = useState(() => {
        const savedMenu = localStorage.getItem('menuItems');
        return savedMenu ? JSON.parse(savedMenu) : initialMenu;
    });

    const [basket, setBasket] = useState(() => {
        const savedBasket = localStorage.getItem('basketItems');
        return savedBasket ? JSON.parse(savedBasket) : (initialBasket || []);
    });

    const [toast, setToast] = useState(null);
    const [toastTimeoutId, setToastTimeoutId] = useState(null);

    const showToast = (message) => {
        if (toastTimeoutId) clearTimeout(toastTimeoutId);
        setToast(message);
        const timeout = setTimeout(() => setToast(null), 3000);
        setToastTimeoutId(timeout);
    };

    const addToBasket = (dish) => {
        const itemFound = basket.find((item) => item.id === dish.id);
        let updateBasket;

        if (itemFound) {
            updateBasket = basket.map((item) =>
              item.id === dish.id ? { ...item, count: item.count + 1 } : item
            );
        } else {
            updateBasket = [...basket, { ...dish, count: 1 }];
        }

        localStorage.setItem('basketItems', JSON.stringify(updateBasket));
        setBasket(updateBasket);
        showToast(`Блюдо "${dish.title}" добавлено в корзину!`);
    };

    const decrementCount = (dishId) => {
        const itemFound = basket.find((item) => item.id === dishId);
        if (!itemFound) return;

        let updateBasket;
        if (itemFound.count > 1) {
            updateBasket = basket.map((item) =>
              item.id === dishId ? { ...item, count: item.count - 1 } : item
            );
        } else {
            updateBasket = basket.filter((item) => item.id !== dishId);
        }

        localStorage.setItem('basketItems', JSON.stringify(updateBasket));
        setBasket(updateBasket);
    };

    const renderMenu = () => {
        return menu.map((item) => (
          <div key={item.id} className="dish-card">
              <div className="dish-card-header">
                  <span className="dish-icon">✦</span>
                  <h3>{item.title}</h3>
              </div>
              <p className="dish-descr">{item.descr}</p>
              <div className="dish-card-footer">
                  <p className="dish-price">
                      {parseFloat(item.price).toLocaleString('ru-RU')}
                      <span className="dish-price-currency"> ₸</span>
                  </p>
                  <button className="add-to-basket-btn" onClick={() => addToBasket(item)}>
                      В корзину
                  </button>
              </div>
          </div>
        ));
    };

    return (
      <div className="app-container">
          <Navbar />

          {toast && (
            <div className="toast-notification">
                <span className="toast-icon">✦</span>
                <span className="toast-message">{toast}</span>
            </div>
          )}

          <Routes>
              <Route path="/" element={
                  <>
                      <Title />
                      <section className="menu-section">
                          <div className="menu-section-header">
                              <span className="section-eyebrow">Наше меню</span>
                              <h2>Блюда казахской кухни</h2>
                              <div className="ornament">✦</div>
                          </div>
                          <div className="menu-grid">
                              {renderMenu()}
                          </div>
                      </section>
                      <footer className="site-footer">
                          © 2026 Asmara Restaurant · Almaty, Kazakhstan
                      </footer>
                  </>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/signIn" element={<Login />} />
              <Route path="/basket" element={
                  <Basket
                    basket={basket}
                    addToBasket={addToBasket}
                    decrementCount={decrementCount}
                  />
              } />
          </Routes>
      </div>
    );
}
export default App;