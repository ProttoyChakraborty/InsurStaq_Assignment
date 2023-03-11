import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
const Verify = () => {

  const navigate = useNavigate();
  let { id } = useParams();
  const [file, setFile] = useState({});

  const fetchData = async () => {
    const res = await axios.get(`http://localhost:4000/api/file/${id}`);
    const data = res.data;
    console.log(data);
    setFile(data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit =  (e) => {

    e.preventDefault();
    const message = document.getElementById("comment");
    const checkbox = document.getElementById("check");
    if (checkbox.value != "yes" || message.value=="") {
      alert("please fill all the fields");
    }
    let data = {
      message: message.value
    }
  
    axios
      .put(`http://localhost:4000/api/verify/${id}`, data)
      .then((res) => {
        if (res.status === 200) {
          alert("Successfully Verified file");
          navigate("/");
        } else if (res.status === 500) {
          alert("Internal Server Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    };
  return (
    <>
      <div className="verify-layout">
        <div className="view">
          <iframe
            title={file.name}
            style={{width:"100%",height:"100vh"}}
            src={file.url+"#zoom=FitH"}
          ></iframe>
        </div>
        <div className="comment">
          <div className="center ">
          <h3 className="head"> Verify Document</h3>
          <Link to="/" style={{textDecoration:"None"}}>
          <button className="submit-button">Home</button>
            </Link>
            </div>
          <form id ="message-form" onSubmit={handleSubmit}>
            <label className="label">Add Your Comments</label>
            <textarea id="comment" name="message" rows="10" cols="50"></textarea>
            <div className="center">
              <label className="label">Mark as Verified ?</label>
              <input type="checkbox" id="check" name="check" value="yes"></input>
            </div>
            <button type="submit" className="submit-button">
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
