import React from 'react'
import { Link } from "react-router-dom";
const Home = () => {
  return (
      <div className='button-container'>
          <Link to="/users" style={{textDecoration:"none"}}>
              <button className='button'>User</button>
          </Link>
          <Link to="/admin" style={{textDecoration:"none" }}>
          <button className='button'>Admin</button>
          </Link>
      </div>
  )
}

export default Home