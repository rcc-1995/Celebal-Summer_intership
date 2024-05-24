// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Components/Form';
import Success from './Components/Success';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
