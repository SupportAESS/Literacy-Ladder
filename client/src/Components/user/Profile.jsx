import React, { useState } from 'react';

function EditableField({ label, value, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedValue);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setEditedValue(event.target.value);
  };

  return (
    <div>
      <label>{label}:</label>
      {isEditing ? (
        <input
          type="text"
          value={editedValue}
          onChange={handleChange}
          onBlur={handleSave}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
      {isEditing ? null : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
}

function App() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');

  const handleNameSave = (newName) => {
    setName(newName);
  };

  const handleEmailSave = (newEmail) => {
    setEmail(newEmail);
  };

  return (
    <div>
      <h1>User Profile</h1>
      <EditableField label="Name" value={name} onSave={handleNameSave} />
      <EditableField label="Email" value={email} onSave={handleEmailSave} />
    </div>
  );
}

export default App;
