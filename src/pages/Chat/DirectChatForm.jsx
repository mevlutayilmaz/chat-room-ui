import React, { useState } from 'react';

const DirectChatForm = ({ users, onCreateChat }) => {
  const [selectedUser, setSelectedUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      onCreateChat({ type: 'direct', username: selectedUser });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-4">
        <div className="form-group">
          <select
            className="form-select"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            aria-label="Select User"
          >
            <option value="" disabled>Select a User</option>
            {users.map((user, index) => (
              <option key={index} value={user.username}>
                {user.nameSurname}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`btn btn-dark ${!selectedUser && 'disabled'}`}
          disabled={!selectedUser}
        >
          <i className="fa fa-paper-plane me-2"></i> Start Direct Chat
        </button>
      </div>
    </form>
  );
};

export default DirectChatForm;
