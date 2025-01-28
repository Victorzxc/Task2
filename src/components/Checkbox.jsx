import React from 'react';

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
         <span className="checkmark"></span>
     </label>
    );
}

export default Checkbox;