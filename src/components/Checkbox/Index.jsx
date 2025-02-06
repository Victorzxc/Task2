import React from 'react';
import './styles.css';

function Checkbox({ id, isDone, onChange }) {
    const handleChange = (e) => {
        onChange(id, e.target.checked);
    };

    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={isDone}
                onChange={handleChange}
            />
        </label>
    );
}

export default Checkbox;