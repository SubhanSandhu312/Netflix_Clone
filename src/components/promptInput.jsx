import React, { useState } from 'react';
import axios from 'axios';

function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/run', { prompt });
      setResults(res.data);
    } catch (err) {
      console.error(err);
      alert("Error processing your query");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type your query..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: '10px', width: '60%', marginRight: '10px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>Run</button>

      <table border="1" style={{ marginTop: '20px', width: '80%' }}>
        <thead>
          {results.length > 0 && (
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {results.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PromptInput;
