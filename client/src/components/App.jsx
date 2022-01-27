import React, { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import Graph from './graph/Graph.jsx';
import Footer from './Footer.jsx';

function App() {
  const [showData, setShowData] = useState();
  const [beginAtZero, setBeginAtZero] = useState(false);

  return (
    <div>
      <Nav
        showData={showData}
        setShowData={setShowData}
        beginAtZero={beginAtZero}
        setBeginAtZero={setBeginAtZero}
      />
      {showData ? (
        <Graph
          showData={showData}
          beginAtZero={beginAtZero}
        />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
