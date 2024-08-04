import React from 'react';
import User from './User';

const Users = ({ users, onSelectUser, onDeleteUser ,isAllTodosCompleted }) => {
  return (
    <div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {users.map((user) => (
          <User key={user.id} user={user} onSelectUser={onSelectUser} onDeleteUser={onDeleteUser} isAllTodosCompleted={isAllTodosCompleted} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
