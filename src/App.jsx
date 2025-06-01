
import React, { useState } from 'react';
import PromptInput from './components/promptInput.jsx';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Netflix Clone Query Bot</h1>
      <PromptInput />
    </div>
  );
}

export default App;
