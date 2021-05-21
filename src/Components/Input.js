import React, { useState } from 'react';

const Input = ({ handleInputSubmit }) => {
  const [inputContent, setInputContent] = useState();
  return(
  <div className="inputContainer">
    <label>Input</label>
    <textarea value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
    <button onClick={() => handleInputSubmit(inputContent)}>Start</button>
  </div>
)
}

export default Input;