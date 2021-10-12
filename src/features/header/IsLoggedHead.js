import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOutUserThunk } from '../authorization/authThunks';

export default function IsLoggedHead({ userName }) {
    const dispatch = useDispatch();

    return (
        <nav className="header">
            <ul>
                <li>
                    <Link to="/" style={{ marginRight: '5rem' }}>
                        {userName}
                    </Link>
                </li>
                <li>
                    <Link to="/films">Фильмы</Link>
                </li>
                <li>
                    <Link to="/persons">Персонажи</Link>
                </li>
                <li>
                    <Link to="/planets">Планеты</Link>
                </li>
                <li>
                    <Link to="/favorites">Избранное</Link>
                </li>
                <li>
                    <Link to="/history">История</Link>
                </li>
                <li onClick={() => dispatch(logOutUserThunk())}>
                    <Link to="/signin" style={{ color: 'darkbrown' }}>
                        Выход
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
