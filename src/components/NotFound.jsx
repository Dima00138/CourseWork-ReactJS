import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className="not-found">
        <div className="wrap">
            <hgroup>
                <h1 className="not-found__title">Упс, что-то пошло не так</h1>
                <h2 className="not-found__subtitle">Давайте начнём сначала!</h2>
            </hgroup>
            <div className="not-found__picture">
                404
                <img className="not-found__image" src="https://roistat.com/rublog/wp-content/themes/roistat2021v2/assets2019/img/404.png" alt="404"/>
            </div>
            
        </div>
    </section>
    );
}

export default NotFound;
