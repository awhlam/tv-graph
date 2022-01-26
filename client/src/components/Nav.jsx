import React, { useState } from 'react';
import axios from 'axios';

function Nav({
  showData, setShowData, beginAtZero, setBeginAtZero,
}) {
  const [showName, setShowName] = useState('');

  const handleClick = () => { setBeginAtZero(!beginAtZero); };
  const handleChange = (e) => { setShowName(e.target.value); };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get('/search', { params: { query: showName } });
      setShowData(data);
    } catch (err) {
      alert(`No TV shows were found for the search: ${showName}`);
    }
  };

  return (
    <div className="container">
      <div className="column">
        <form onSubmit={handleSubmit}>
          <input type="text" size="25" placeholder="Search for a TV Show" value={showName} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="column">
        <span>Scale Chart from Zero</span>
        <input type="checkbox" className="checkbox" checked={beginAtZero} onChange={handleClick} />
      </div>
      <div className="column right">
        <span className="bold">
          {showData ? `
            ${showData.name} (${showData.first_air_date.slice(0, 4)}) —
            Average Rating: ${showData.vote_average} —
            Total Votes: ${showData.vote_count.toLocaleString('en-US')}`
            : null}
        </span>
        <br />
        <span>{showData ? `${showData.overview.slice(0, 250)}...` : null}</span>
        <br />
      </div>
    </div>
  );
}

export default Nav;
