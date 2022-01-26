import React, { useState } from 'react';
import axios from 'axios';

const Nav = ({showData, setShowData, beginAtZero, setBeginAtZero}) => {
  const [showName, setShowName] = useState('');

  const handleClick = () => {
    setBeginAtZero(!beginAtZero);
  }

  const handleChange = (e) => {
    setShowName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get('/search', { params: {query: showName} });
      setShowData(data);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="container">
      <div className="column">
        <form onSubmit={handleSubmit}>
          <input type="text" size="25" placeholder="Search for a TV Show" value={showName} onChange={handleChange} />
          <button>Search</button>
        </form>
      </div>
      <div className="column">
        <h3>Scale from 0: <input type="checkbox" className="checkbox" value={beginAtZero} onChange={handleClick}/></h3>
      </div>
      <div className="column">
        <span>{showData ? `${showData.name} (${showData.first_air_date.slice(0,4)}) — Average Rating: ${showData.vote_average} — Total Votes: ${showData.vote_count.toLocaleString('en-US')}` : null}</span><br />
        <span>{showData ? `${showData.overview.split('. ')[0]}.` : null}</span><br />
      </div>
    </div>
  )
}

export default Nav;
