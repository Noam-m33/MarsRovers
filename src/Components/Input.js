import React, { useState } from 'react';

const Input = ({ handleInputSubmit }) => {
  const [inputContent, setInputContent] = useState();
  return(
  <div className="inputContainer">
    <h2>Input</h2>
    <textarea value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
    <button onClick={() => handleInputSubmit(inputContent)}>Start</button>
  </div>
)
}

export default Input;