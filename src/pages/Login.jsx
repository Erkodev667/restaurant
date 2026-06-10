import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && username.toLowerCase() === 'admin' && password && password.toLowerCase() === 'pizzapass') {
            alert('Успешный вход! Добро пожаловать.');
            navigate('/admin');
        } else {
            alert('Неверное имя или пароль!');
        }
    };

    return (
        // .login-page растянет контейнер на весь экран по центру
        <div className="login-page">
            {/* .login-card сделает красивую рамку, как у карточек блюд */}
            <div className="login-card">
                <h2>Вход в систему</h2>
                <span className="login-subtitle">Панель управления</span>

                <div className="login-fields">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Имя пользователя"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Пароль"
                    />
                </div>

                <button className="login-btn" onClick={handleLogin}>Войти</button>
            </div>
        </div>
    );
};

export default Login;