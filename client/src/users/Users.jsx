import React, { useEffect, useState } from "react";
import Unverified from "./Unverified";
import Verified from "./Verified";
import axios from "axios";
import { Link } from "react-router-dom";



const Users = () => {

    const [list, setList] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:4000/api/getAll");
    const data = res.data;
    console.log(data);
    setList(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    const form = document.getElementById("upload-form");
    e.preventDefault();
    let data = new FormData(form);
    axios
      .post("http://localhost:4000/api/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully Uploaded file");
          fetchData();
        } else if (res.status === 500) {
          alert("Internal Server Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };
  const renderedList = () => {
    const render=[]
    list.forEach((item) => {
      console.log(item);
      if (item.status === "verified") {
        render.push(<Verified data={item} key={item.id} />);
      } else {
        render.push((<Unverified data={item} key={item.id} />));
      }
    })
    return render;
  }
  
  return (
    <>
      <div className="center">
        <h3 className="head">Add New Document</h3>
        <Link to="/" style={{textDecoration:"None"}}>
          <button className="submit-button">Home</button>
          </Link>
      </div>
      
      <div className="AddNewPDF">
        <form id="upload-form" onSubmit={handleSubmit}>
          <div className="center">
            <input style={{ width: "50%" }} type="file" name="pdf"></input>
            <button type="submit " className="submit-button">
              Add Document
            </button>
          </div>
        </form>
      </div>

      <h3 className="head">Uploaded Documents</h3>
      <div className="DocumentList">
        {renderedList()}
      </div>
    </>
  );
};

export default Users;
