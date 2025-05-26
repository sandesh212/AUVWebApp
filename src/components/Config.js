import React, { useState, useEffect } from 'react';
import './css/Config.css'; // Ensure to import the CSS for styling

const ConfigPage = ({ onSaveConfig }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  // Example: Available columns (this could be fetched from your API)
  const availableColumns = [
    'timestamp', 
    'vcc_clock_real_seconds', 
    'cpu_usage', 
    'memory_usage',
    'disk_io'
  ];

  const handleColumnChange = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleSave = () => {
    // Save the selected columns (e.g., in localStorage or pass it back to parent component)
    localStorage.setItem('selectedColumns', JSON.stringify(selectedColumns));
    onSaveConfig(selectedColumns);
  };

  return (
    <div className="config-page">
      <h3>Select Columns to Display</h3>
      <ul>
        {availableColumns.map((column, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={column}
                checked={selectedColumns.includes(column)}
                onChange={() => handleColumnChange(column)}
              />
              {column}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
};

export default ConfigPage;
