import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className={"aboutPage"}>
            <div className="about-inner">
                <img
                    className="about-image"
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&auto=format&fit=crop"
                    alt="Интерьер ресторана"
                />
                <span className="about-year">Основан в 1926 году</span>
                <h1>О нас</h1>
                <div className="ornament" style={{margin: '24px 0 40px'}}>✦</div>
                <p>
                    История нашего ресторана началась в бурном 1926 году, когда молодой и амбициозный
                    Ерканат решил доказать всему миру, что степное гостеприимство можно превратить в
                    высокое кулинарное искусство. Он открыл самый первый официальный ресторан в Казахстане,
                    совместив вековые традиции кочевников с ресторанным сервисом.
                </p>
                <p style={{marginTop: '20px'}}>
                    Секретные рецепты его сочного Куырдака передавались из поколения в поколение,
                    и сегодня мы готовим его точно так же, как сам Ерканат ровно век назад.
                </p>
                <div style={{marginTop: '48px'}}>
                    <Link to='/' className="about-link">← Посмотреть меню</Link>
                </div>
            </div>
        </div>
    )
}

export default About;