import React from 'react';

const Nav = ({beginAtZero, setBeginAtZero}) => {

  const handleClick = () => {
    console.log('clicked');
    console.log(setBeginAtZero);
    setBeginAtZero(!beginAtZero);
  }

  return (
    <div>
      <input type="text" placeholder="Search for a TV Show" />
      <button>Search</button>
      <p>Scale from 0: <input type="checkbox" value={beginAtZero} onChange={handleClick}/></p>
    </div>
  )
}

export default Nav;
