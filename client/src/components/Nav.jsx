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
      if (Object.keys(data.episodes).length > 0) {
        let overview = data.overview;

        if (overview.length > 350) {
          overview = overview.slice(0, 350);
          data.overview = `${overview.slice(0, overview.lastIndexOf(' '))}...`
        }

        setShowData();
        setShowData(data);
      } else {
        alert(`Searched for "${showName}". The closest match was "${data.name}" (${data.first_air_date.slice(0, 4)}), but it's episodes have 0 votes.`);
        setShowName('');
      }
    } catch (err) {
      alert(`No TV shows were found for the search: "${showName}".`);
      setShowName('');
    }
  };

  return (
    <div className="container">
      {/* TITLE */}
      <div className="column">
        <span className="title">TV Graph</span><br />
        <span className="tagline">EPISODE RATING TRENDS</span>
      </div>

      {/* SHOW INFO */}
      <div className="showInfo">
        {/* POSTER */}
        <div className="poster">
          {showData ? <img src={`https://www.themoviedb.org/t/p/w92${showData.poster_path}`} /> : null }
        </div>
        {/* TEXT */}
        <div className="showText">
          <span className="bold">
            {showData ? `
              ${showData.name} (${showData.first_air_date.slice(0, 4)}) —
              Show Rating: ${showData.vote_average} —
              Total Votes: ${showData.vote_count.toLocaleString('en-US')}`
              : null}
          </span>
          <br />
          <span>{showData ? `${showData.overview}` : null}</span>
          <br />
        </div>
      </div>

      {/* SEARCH */}
      <div className="column">
        <form onSubmit={handleSubmit}>
          <input type="text" size="40" placeholder="Search for a TV Show" value={showName} onChange={handleChange} /><br/>
          <div className="nav-row">
            <div className="nav-column">
              <input type="checkbox" className="checkbox" checked={beginAtZero} onChange={handleClick} />
              <span className="scaleText">Scale Chart from Zero</span>
            </div>
            <div className="nav-column">
              <button type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Nav;
