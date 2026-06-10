import React from "react";

const Title = () => {
    return (
        <div className={'first_page'}>
            <div className="hero-bg" />
            <div className="hero-overlay" />
            <div className={'title'}>
                <p className={'greeting'}>Добро пожаловать</p>
                <h1 className={'restaurant_name'}>Asmara</h1>
                <p className="hero-tagline">Казахская кухня · с 1926 года</p>
            </div>
            <div className="hero-scroll-hint">
                <div className="scroll-line" />
                <span>Меню</span>
            </div>
        </div>
    )
}

export default Title;