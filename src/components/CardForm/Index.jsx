import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/cardsSlice';
import './styles.css';
import { adddCard } from './AddCard';



function CardForm({ listId, setShowForm }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

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
    async function addNewCard(e) {
        e.preventDefault();
        try {
            await adddCard(title, listId)
            setTitle('')
        } catch (error) {
            setTitle('');
            setShowForm(false);
        }
    }

    return (
        <div className="card-form-wrapper">
            <form onSubmit={addNewCard} className="card-form">
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