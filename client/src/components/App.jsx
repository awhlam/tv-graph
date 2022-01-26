import React, { useState } from 'react';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Graph from './graph/Graph.jsx';
import Footer from './Footer.jsx';

function App() {
  const [showData, setShowData] = useState();
  const [beginAtZero, setBeginAtZero] = useState(false);

  return (
    <div>
      <Header />
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
