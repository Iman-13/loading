import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from './userSlice';

function UserList() {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  return (
    <div>
      <h1>User List</h1>

      <div className="fetch-button">
        <button onClick={() => dispatch(fetchUsers())}>Fetch Users</button>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          Loading users...
        </div>
      )}

      {error && (
        <div className="error">
          Error: {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <p style={{ textAlign: 'center' }}>No users found.</p>
      )}

      {!loading && users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td className="user-email">{user.email}</td>
                <td>
                  <button onClick={() => dispatch(deleteUser(user.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;