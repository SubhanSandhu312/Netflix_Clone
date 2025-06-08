import React, { useState } from 'react';
import axios from 'axios';

function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setResults([]);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/query', { prompt }); 
      setResults(res.data.result); 
    } catch (err) {
      console.error(err);
      alert("the query you wrote is irrelevant. The tables are movies. Please ask question relevant to the data");
   
    } finally {
      setLoading(false);
  
    }
  };

  return (
    <div>
      <form type="submit">
      <input
        type="text"
        placeholder="Type your query..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: '10px', width: '60%', marginRight: '10px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }} disabled={loading}>
        {loading ? 'Running ...' : 'Run'}
      </button>
      </form>

      {loading ? <h2>Loading ...</h2> : 
        <table border="1" style={{ marginTop: '20px', width: '80%' }}>
          <thead>
            {results.length > 0 && (
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th>{key}</th>
                  // <th key={key}>{key}</th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {results.map((row) => (
              <tr>
              {/* <tr key={idx}> */}
                {Object.values(row).map((val) => (
                  <td>{val}</td>
                  // <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table> }
    </div>
  );
}

export default PromptInput;
