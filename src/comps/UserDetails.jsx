import React, { useEffect, useState } from 'react';
import '../css-styling/UserDetails.css';
import axios from '../configuration/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        async function fetchUsers() {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/users/users');
            console.log('Fetched users:', response.data);
            setUsers(response.data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
        }
        fetchUsers();
    }, []);

    const handleEditClick = (user) => {
        setEditingUser(user.id || user.username);
        console.log('Editing user:', user.id)
        console.log('Editing user:', user);
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            active: user.active,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEditSave = async () => {
        try {
            console.log('Saving user:', editingUser, editForm);
            await axios.put(`/api/users/update/${editingUser}`, editForm);
            setEditingUser(null);
            setEditForm({});
            // Reload users from server after edit
            const response = await axios.get('/api/users/users');
            setUsers(response.data || []);
        } catch (err) {
            console.error('Error saving user:', err);
            setError('Failed to save user.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/delete/${id}`);
                // Reload users from server after delete
                const response = await axios.get('/api/users/users');
                setUsers(response.data || []);
            } catch (err) {
                console.error('Error deleting user:', err);
                setError('Failed to delete user.');
            }
        }
    };

    return (
        <div className="user-details-container">
        <h2>User Details</h2>
        {loading && <div>Loading...</div>}
        {error && <div style={{color: 'red'}}>{error}</div>}
        {!loading && !error && (
            <table className="user-table">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id || user.username}>
                    <td>{editingUser === (user.id || user.username) ? (
                        <input name="firstName" value={editForm.firstName || ''} onChange={handleEditChange} />
                    ) : user.firstName}</td>
                    <td>{editingUser === (user.id || user.username) ? (
                        <input name="lastName" value={editForm.lastName || ''} onChange={handleEditChange} />
                    ) : user.lastName}</td>
                    <td>{editingUser === (user.id || user.username) ? (
                        <input name="username" value={editForm.username || ''} onChange={handleEditChange} />
                    ) : user.username}</td>
                    <td>{editingUser === (user.id || user.username) ? (
                        <input name="email" value={editForm.email || ''} onChange={handleEditChange} />
                    ) : user.email}</td>
                    <td>{editingUser === (user.id || user.username) ? (
                        <input name="phone" value={editForm.phone || ''} onChange={handleEditChange} />
                    ) : user.phone}</td>
                    <td>{editingUser === (user.id || user.username) ? (
                        <select name="active" value={editForm.active} onChange={handleEditChange}>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                        </select>
                    ) : (user.active ? 'Active' : 'Inactive')}</td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</td>
                    <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : ''}</td>
                    <td>
                    {editingUser === (user.id || user.username) ? (
                        <>
                        <button className="user-action-btn save" onClick={handleEditSave} title="Save">
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button className="user-action-btn cancel" onClick={() => setEditingUser(null)} title="Cancel">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        </>
                    ) : (
                        <>
                        <button className="user-action-btn edit" onClick={() => handleEditClick(user)} title="Edit">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="user-action-btn delete" onClick={() => handleDelete(user.id || user.username)} title="Delete">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        </>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    }

export default UserDetails;
