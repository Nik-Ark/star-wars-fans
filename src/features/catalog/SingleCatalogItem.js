import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { LoadingMessage } from './messages/LoadingMessage';
import { ErrorMessage } from './messages/ErrorMessage';
import {
    addToFavoritesThunk,
    removeFromFavoritesThunk,
} from '../favorites/favoritesThunks';

// Карточка элемента каталога
function SingleCatalogItem(props) {
    const {
        type,
        itemData,
        fetchSingleItem,
        singleItemUnmounted,
        renderDescription,
    } = props;

    // Забираем данные об элементе из стора
    const [catalogItem, fetchStatus, fetchError] = itemData;

    // Получаем id элемента из адресной строки
    const { id: itemId } = useParams();

    const dispatch = useDispatch();
    // Запрашиваем элемент
    useEffect(() => {
        if (fetchStatus === 'idle') {
            dispatch(fetchSingleItem(itemId));
        }
    }, [fetchStatus, itemId, dispatch, fetchSingleItem]);

    // Сбрасываем состояние запроса при размонтировании компонента
    useEffect(() => {
        return () => {
            dispatch(singleItemUnmounted());
        };
    }, [dispatch, singleItemUnmounted]);

    ///////////////////////////////////////////////////////////////////////
    /*   Функционал для работы с добавлением и удалением из Избранного   */
    ///////////////////////////////////////////////////////////////////////
    const login = useSelector((state) => state.auth.user.userName);
    const favorites = useSelector((state) => state.auth.favorites)[type];
    const index = favorites.findIndex((el) => el === `${itemId}`);
    const isInFavorite = index === -1 ? false : true;

    /*                         Buttons On Click Handlers                 */
    const addToFavoritesHandler = () => {
        dispatch(addToFavoritesThunk(login, type, itemId));
    };

    const removeFromFavoritesHandler = () => {
        dispatch(removeFromFavoritesThunk(login, type, index));
    };
    ///////////////////////////////////////////////////////////////////////

    // Компонент для рендера
    let renderedComponent;

    // В зависимости от статуса запроса рендерим разные компоненты
    switch (fetchStatus) {
        case 'fulfilled':
            renderedComponent = (
                <div className={`single-${type}`}>
                    <h1>{catalogItem.title || catalogItem.name}</h1>
                    {renderDescription(catalogItem)}
                    {!isInFavorite && (
                        <button onClick={addToFavoritesHandler}>
                            Добавить в избранное
                        </button>
                    )}
                    {isInFavorite && (
                        <button onClick={removeFromFavoritesHandler}>
                            Удалить из избранного
                        </button>
                    )}
                </div>
            );
            break;
        case 'rejected':
            renderedComponent = <ErrorMessage error={fetchError} />;
            break;
        default:
            renderedComponent = <LoadingMessage />;
    }

    return <div className="body">{renderedComponent}</div>;
}

export { SingleCatalogItem };
