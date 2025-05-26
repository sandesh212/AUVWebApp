import React, { useState, useEffect, useRef } from 'react';
import './css/LogFiles.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
);

function LogFiles() {
    const [selectedLogFile, setSelectedLogFile] = useState([]);
    const [selectedLogFileName, setSelectedLogFileName] = useState('');
    const [CSVs, setCSVs] = useState([]);
    const [viewMode, setViewMode] = useState('csv'); // 'csv' or 'graph'
    const [xProperty, setXProperty] = useState('');
    const [yProperties, setYProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const chartRef = useRef(null);
    const horizontalScrollRef = useRef(null);
    const contentContainerRef = useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetchCSVs();
    }, []);

    useEffect(() => {
        if (selectedLogFileName) {
            fetchData(selectedLogFileName, 0, true);
        }
    }, [selectedLogFileName]);

    useEffect(() => {
        const chart = chartRef.current?.chartInstance;
        if (chart) {
            chart.resetZoom(); // Reset zoom to default (full zoom out)
        }
    }, []);

    const fetchCSVs = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/csvs');
            if (response.ok) {
                const data = await response.json();
                setCSVs(data);
            } else {
                console.error('Failed to fetch CSVs');
            }
        } catch (error) {
            console.error('Error fetching CSVs:', error);
        }
    };

    const fetchData = async (file, skip = 0, reset = false) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/csvRowsWithLimits?fileName=${file}&skip=${skip}`);
            if (response.ok) {
                const data = await response.json();
                if (reset) {
                    setSelectedLogFile(data);
                } else {
                    setSelectedLogFile(prevRows => [...prevRows, ...data]);
                }
                setHasMore(data.length > 0);
            } else {
                console.error('Failed to fetch CSV rows');
            }
        } catch (error) {
            console.error('Error fetching CSV rows:', error);
        }
        setLoading(false);
    };

    const handleLogFileClick = (file) => {
        setSelectedLogFileName(file);
        setXProperty('vcc_clock_real_seconds');
        setYProperties([]);
    };

    const handleDownload = (file) => {
        const link = document.createElement('a');
        link.href = `http://localhost:5000/download/${file}`;
        link.download = file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCheckboxChange = (property) => {
        setYProperties(prev =>
            prev.includes(property)
                ? prev.filter(p => p !== property)
                : [...prev, property]
        );
    };

    const handleLabelClick = (property) => {
        // Toggle checkbox based on label click
        handleCheckboxChange(property);
    };

    const prepareGraphData = () => {
        if (!selectedLogFile.length || !yProperties.length) return {};

        const labels = selectedLogFile.slice(1).map(row => row[0]);


        const datasets = yProperties.map((property, index) => {
            const yIndex = selectedLogFile[2].indexOf(property);
            const dataValues = selectedLogFile.slice(1).map(row => parseFloat(row[yIndex]));

            return {
                label: `${property}`,
                data: dataValues,
                borderColor: getRandomColor(),
                backgroundColor: `rgba(0,0,0,0)`,
                fill: true
            };
        });

        return {
            labels,
            datasets
        };
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const syncScroll = () => {
        const horizontalScrollElement = horizontalScrollRef.current;
        const contentContainerElement = contentContainerRef.current;
        if (horizontalScrollElement && contentContainerElement) {
            contentContainerElement.scrollLeft = horizontalScrollElement.scrollLeft;
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            if (scrollHeight - scrollTop <= clientHeight * 1.5 && !loading && hasMore) {
                fetchData(selectedLogFileName, selectedLogFile.length);
            }
        }
    };

    useEffect(() => {
        const horizontalScrollElement = horizontalScrollRef.current;
        const contentContainerElement = contentContainerRef.current;

        if (horizontalScrollElement && contentContainerElement) {
            if (viewMode === 'csv' && contentContainerElement.scrollWidth > contentContainerElement.clientWidth) {
                horizontalScrollElement.style.display = 'block';
            } else {
                horizontalScrollElement.style.display = 'none';
            }
        }
    }, [viewMode, selectedLogFile]);

    return (
        <div className="logfiles-container">
            <div className="toggle-buttons">
                <button onClick={() => setViewMode('csv')} className={viewMode === 'csv' ? 'active' : ''}>View CSV</button>
                <button onClick={() => setViewMode('graph')} className={viewMode === 'graph' ? 'active' : ''}>View Graph</button>
                <label>
                    LogFiles:
                    <select value={selectedLogFileName} onChange={(e) => handleLogFileClick(e.target.value)}>
                        <option value="">Select Log</option>
                        {CSVs.map((file, index) => (
                            <option key={index} value={file}>{file}</option>
                        ))}
                    </select>
                </label>
                <button className="download-button" onClick={() => handleDownload(selectedLogFileName)}>Download</button>
            </div>

            <div className="content-container">
                <div className="logfile-preview" ref={scrollRef} onScroll={handleScroll}>
                    {viewMode === 'csv' && (
                        <div className="horizontal-scrollbar" ref={horizontalScrollRef} onScroll={syncScroll}>
                            <div style={{ width: `${selectedLogFile.length ? selectedLogFile[2].length * 150 : 0}px` }} />
                        </div>
                    )}
                    {selectedLogFile.length ? (
                        viewMode === 'csv' ? (
                            <div className="logfile-content-container" ref={contentContainerRef}>
                                <div className="table-container">
                                    <table>
                                        <thead>
                                            <tr>
                                                {selectedLogFile[2].map((cell, cellIndex) => (
                                                    <th key={cellIndex}>{cell}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedLogFile.slice(1).map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    {row.map((cell, cellIndex) => (
                                                        <td key={cellIndex}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="logfile-content">
                                <div className="dropdown-container">
                                    <label>
                                        Y Properties:
                                        {selectedLogFile[2].map((property, index) => (
                                            <div key={index} onClick={() => handleLabelClick(property)}>
                                                <input
                                                    type="checkbox"
                                                    id={property}
                                                    value={property}
                                                    checked={yProperties.includes(property)}
                                                    onChange={() => handleCheckboxChange(property)}
                                                />
                                                <label htmlFor={property}>{property}</label>
                                            </div>
                                        ))}
                                    </label>
                                </div>

                                <div className="chart-container">
                                    {xProperty && yProperties.length > 0 && (
                                        <Line
                                            ref={chartRef}
                                            data={prepareGraphData()}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    zoom: {
                                                        zoom: {
                                                            wheel: {
                                                                enabled: true,
                                                            },
                                                            pinch: {
                                                                enabled: true,
                                                            },
                                                            mode: 'x'
                                                        },
                                                        pan: {
                                                            enabled: true,
                                                            mode: 'xy'
                                                        }
                                                    }
                                                },
                                                layout: {
                                                    padding: {
                                                        left: 50,
                                                        right: 25,
                                                        top: 0,
                                                        bottom: 200
                                                    }
                                                },
                                                scales: {
                                                    x: {
                                                        min: 0,
                                                        max: Math.max(...prepareGraphData().labels)
                                                    }
                                                }
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    ) : (
                        <p>Select a log file to view its content.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogFiles;

