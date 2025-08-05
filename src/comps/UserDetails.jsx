import React, { useEffect, useState } from 'react';
import '../css-styling/UserDetails.css';
import axios from '../configuration/config';

function UserDetails() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                <tr key={user.id || user.username}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.active ? 'Active' : 'Inactive'}</td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}</td>
                    <td>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : ''}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    }

export default UserDetails;
