import React, { useState,useEffect } from 'react'
import ListItem from './ListItem'
import axios from "axios";
import { Link } from 'react-router-dom';

const Admin = () => {
  const [list, setList] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:4000/api/getNew");
    const data = res.data;
    console.log(data);
    setList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="center ">
        
        <h3 className='head'>New Documents</h3>
        <Link to="/" style={{textDecoration:"None"}}>
          <button className="submit-button">Home</button>
            </Link>
        </div>
      {list.map((item) => {
        return (<ListItem data={item} key={item.id} />)
      })}
    </div>
  )
}

export default Admin