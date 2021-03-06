import { useState } from 'react';
import { useFormInput } from '../../auxiliary/customHooks/useFormInput';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { validateSignInThunk } from './authThunks';
import { auth, form, control, actions } from './Auth.module.css';

export function Signin() {
    const [login, onLoginChange, loginReset] = useFormInput('');
    const [pass, onPassChange, passReset] = useFormInput('');
    const [authLog, setAuthLog] = useState('');
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        setIsPending(true);

        dispatch(validateSignInThunk(login, pass, setAuthLog));

        loginReset();
        passReset();

        setIsPending(false);
    };

    return (
        <div className="body">
            <div className="auth-card">
                <div className={auth}>
                    {authLog && <p>{authLog}</p>}
                    <h2>Вход</h2>
                    <form className={form} onSubmit={submitHandler}>
                        <div className={control}>
                            <label htmlFor="login">Логин</label>
                            <input
                                type="text"
                                required
                                value={login}
                                onChange={onLoginChange}
                                id="login"
                            />
                        </div>
                        <div className={control}>
                            <label htmlFor="password">Пароль</label>
                            <input
                                type="password"
                                required
                                value={pass}
                                onChange={onPassChange}
                                id="password"
                            />
                        </div>
                        <div className={actions}>
                            <button disabled={isPending}>Войти</button>
                        </div>
                    </form>
                </div>
            </div>

            <p
                style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                Нужен аккаунт?
                <Link
                    to="signup"
                    style={{ color: 'darkblue', fontWeight: 'bold' }}
                >
                    &nbsp;&nbsp;Создать
                </Link>
            </p>
        </div>
    );
}
