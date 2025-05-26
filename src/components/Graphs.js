import React, { useState } from 'react';
import './css/Graphs.css'; // Ensure you have your styles in Graphs.css

function Graphs() {
  const [viewMode, setViewMode] = useState('view'); // 'view' or 'create'
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [graphs] = useState([
    // Placeholder for graphs data
    { id: 1, title: 'Graph 1', properties: ['Property 1', 'Property 2'] },
    // ...other graph objects
  ]);

  // Function to switch between 'view' and 'create' mode
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  // Function to handle graph selection from the list
  const handleSelectGraph = (graph) => {
    setSelectedGraph(graph);
  };

  // Function to handle graph creation (placeholder)
  const handleCreateGraph = (e) => {
    e.preventDefault();
    // Your logic to handle graph creation here
  };

  return (
    <div className="graphs-container">
      <div className="graphs-header">
        <button onClick={() => handleViewModeChange('view')} className="graph-button">
          View Graphs
        </button>
        <button onClick={() => handleViewModeChange('create')} className="graph-button">
          Create Graph
        </button>
      </div>

      {viewMode === 'view' && (
        <div className="graphs-content">
          <div className="graphs-list">
            {graphs.map((graph) => (
              <div key={graph.id} onClick={() => handleSelectGraph(graph)} className="graph-list-item">
                {graph.title}
              </div>
            ))}
          </div>
          {selectedGraph && (
            <div className="graph-properties">
              <ul>
                {selectedGraph.properties.map((property, index) => (
                  <li key={index}>{property}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="graph-preview">
            {selectedGraph ? (
              <div>
                <h3>{selectedGraph.title}</h3>
                {/* Preview of the graph */}
              </div>
            ) : (
              <p>Select a graph to view its details and properties.</p>
            )}
          </div>
        </div>
      )}

      {viewMode === 'create' && (
        <div className="graph-creation-form">
          <form onSubmit={handleCreateGraph}>
            <input type="text" placeholder="Graph Title" />
            {/* Add more form inputs for graph properties */}
            <button type="submit" className="graph-button">Create</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Graphs;
