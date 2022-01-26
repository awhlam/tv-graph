import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import Chart from './Chart.jsx';
import Footer from './Footer.jsx';

const App = () => {
  const [showData, setShowData] = useState();
  const [beginAtZero, setBeginAtZero] = useState(false);

  let page = (
    <div>
      <Header />
      <Nav
        setShowData={setShowData}
        beginAtZero={beginAtZero}
        setBeginAtZero={setBeginAtZero}
      />
    </div>
  )

  return (
    <div>
      <Header />
      <Nav
        setShowData={setShowData}
        beginAtZero={beginAtZero}
        setBeginAtZero={setBeginAtZero}
      />
      {showData ?
      <Chart
        showData={showData}
        beginAtZero={beginAtZero}
      /> : null
      }
    </div>
  );
};

export default App;
