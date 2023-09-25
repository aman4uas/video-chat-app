import React from "react";
import { useState, useEffect } from "react";
const Server = () => {
  const [data, setData] = useState("Data");

  async function getData() {
    let URL = process.env.REACT_APP_SERVER_URL + "/test";
    //let URL = "http://localhost:4000/test";
    try {
      let response = await fetch(URL);
      response = await response.json();
      setData(response.data);
    } catch (error) {
      setData(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      <h2>{data}</h2>
    </div>
  );
};

export default Server;
