import React, { useState } from 'react';

const GroupChatForm = ({ users, onCreateChat }) => {
  const [groupName, setGroupName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && imageUrl && selectedUsers.length > 0) {
      onCreateChat({
        type: 'group',
        name: groupName,
        imageUrl: imageUrl,
        usernameList: selectedUsers
      });
    }
  };

  const toggleUserSelection = (username) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(username)
        ? prevSelected.filter(uname => uname !== username)
        : [...prevSelected, username]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="groupName" className="form-label fw-bold">Group Name</label>
        <input
          type="text"
          id="groupName"
          className="form-control"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label fw-bold">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          className="form-control"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="users" className="form-label fw-bold">Select Users</label>
        <div
          className="user-list p-2 border rounded-3"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            borderRadius: '10px',
          }}
        >
          {users.slice(0, 15).map((user, index) => (
            <div
              key={index}
              className={`d-flex justify-content-between align-items-center p-2 mb-2 rounded-3 cursor-pointer ${selectedUsers.includes(user.username) ? 'bg-dark text-white' : ''}`}
              onClick={() => toggleUserSelection(user.username)}
              
            >
              <span className={`text-${selectedUsers.includes(user.username) ? 'white' : 'dark'}`}>{user.nameSurname}</span>
              {selectedUsers.includes(user.username) && (
                <span className="text-white">&times;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`btn btn-dark ${!(selectedUsers.length > 1) && 'disabled'}`}
          disabled={!(selectedUsers.length > 1)}
        >
          <i className="fa fa-paper-plane me-2"></i> Start Group Chat
        </button>
      </div>
    </form>
  );
};

export default GroupChatForm;
