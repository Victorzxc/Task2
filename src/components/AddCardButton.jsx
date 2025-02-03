import React, { useState } from 'react';
import CardForm from "./CardFrom.jsx";

function AddCardButton({ listId }) {
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    }
    return (
        <div>
            {!showForm && (
                <button onClick={handleShowForm} className="add-card-button">Добавить карточку +</button>
            )}
            {showForm && (
                <CardForm listId={listId} setShowForm={setShowForm} />
            )}
        </div>
    )
}

export default AddCardButton;