import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../redux/cardsSlice';

function CardForm({ listId, setShowForm }) {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
           dispatch(addCard({ listId, title }));
            setTitle('');
           setShowForm(false);
        }
    };
    const handleCloseForm = () => {
       setShowForm(false);
       setTitle('');
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