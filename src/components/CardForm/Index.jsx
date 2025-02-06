import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../redux/cardsSlice';
import './styles.css';


function CardForm({ listId, setShowForm }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const cardTitles = useSelector(state => state.cards.cardTitles);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Заголовок не может быть пустым');
            return;
        }

        const forbiddenCharsRegex = /["'`<>;:().,]/;
        if (forbiddenCharsRegex.test(title)) {
            setError('Заголовок содержит недопустимые символы');
            return;
        }


        dispatch(addCard({ listId, title }));
        setTitle('');
        setError('');
        setShowForm(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setTitle('');
        setError('');
    };

    return (
        <div className="card-form-wrapper">
            <form onSubmit={handleSubmit} className="card-form">
                <input
                    type="text"
                    placeholder="Карточка"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                <div className="buttons-wrapper">
                    <button type="submit" className="button save">
                        Сохранить
                    </button>
                    <button type="button" className="button cancel" onClick={handleCloseForm}>Отменить</button>
                </div>
            </form>
        </div>
    );
}

export default CardForm;