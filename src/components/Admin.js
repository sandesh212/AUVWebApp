import React, { useState } from 'react';
import './css/Admin.css';

function Admin() {
    // State for form data (simplified)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: ''
    });

    // Mock data for the table
    const users = [
        { id: 1, username: 'user1', role: 'Admin' },
        { id: 2, username: 'user2', role: 'User' },
        // Add more mock users as needed
    ];

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement submission logic
        console.log(formData);
    };

    return (
        <div className="admin-container">
            <div className="admin-form">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username/Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="">Select Role/Class</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    <div className="form-buttons">
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => { /* Implement edit functionality */ }}>Edit</button>
                    </div>
                </form>
            </div>
            <div className="admin-data">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Admin;
