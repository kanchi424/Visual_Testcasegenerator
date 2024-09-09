import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [context, setContext] = useState('');
  const [screenshots, setScreenshots] = useState([]);
  const [testCases, setTestCases] = useState([]);

  const handleFileChange = (e) => {
    setScreenshots([...e.target.files]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('context', context);
    screenshots.forEach((file, index) => {
      formData.append(`screenshot_${index}`, file);
    });

    try {
      const response = await axios.post('http://localhost:5000/generate-test-cases', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTestCases(response.data.testCases);
    } catch (error) {
      console.error('Error generating test cases:', error);
    }
  };

  return (
    <div className="App">
      <h1>Test Instruction Generator</h1>
      <textarea
        placeholder="Enter optional context..."
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Describe Testing Instructions</button>
      {testCases.length > 0 && (
        <div className="test-cases">
          <h2>Generated Test Cases</h2>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case">
              <h3>Test Case {index + 1}</h3>
              <p><strong>Description:</strong> {testCase.description}</p>
              <p><strong>Pre-conditions:</strong> {testCase.preConditions}</p>
              <p><strong>Testing Steps:</strong> {testCase.testingSteps}</p>
              <p><strong>Expected Result:</strong> {testCase.expectedResult}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
