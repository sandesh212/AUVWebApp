import React, { useState } from 'react';
import './css/CommandWindow.css'; // Import the specific CSS for this component

function CommandWindow() {
    const [commands, setCommands] = useState([]);
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setCommands(prevCommands => [input, ...prevCommands]);
            setInput('');
        }
    };

    const handleCommandClick = (command) => {
        setInput(command);
    };

    return (
        <div className="commands-container">
            <div className="command-history">
                <ul>
                    {commands.map((cmd, index) => (
                        <li key={index} onClick={() => handleCommandClick(cmd)}>{cmd}</li>
                    ))}
                </ul>
            </div>
            <div className="command-console">
                <form onSubmit={handleSubmit} className="command-form">
                    <textarea
                        className="command-input"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Enter command..."
                        rows="1" // Starts with a single line
                    />
                    <button type="submit" className="command-button">Execute</button>
                </form>
            </div>
        </div>
    );
}

export default CommandWindow;
