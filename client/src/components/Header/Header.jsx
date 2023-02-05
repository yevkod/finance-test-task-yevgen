import React from 'react';
import s from './Header.module.css';

export const Header = () => {
    return (
        <div>
            <div className={s.logo}>
                <span>Incode</span>
                <span className={s.finance}>Finance</span>
            </div>
        </div>
    );
};


