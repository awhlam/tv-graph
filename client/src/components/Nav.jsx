import React, { useState } from 'react';
import axios from 'axios';

const Nav = ({setShowData, beginAtZero, setBeginAtZero}) => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" size="50" placeholder="Search for a TV Show" value={showName} onChange={handleChange} />
        <input type="button" value="Search" />
      </form>
      <p>Scale from 0: <input type="checkbox" value={beginAtZero} onChange={handleClick}/></p>
    </div>
  )
}

export default Nav;
