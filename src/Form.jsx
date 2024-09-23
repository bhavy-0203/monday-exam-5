import React, { useEffect, useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userdata, setUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
    getUsers();
  };

  const createUser = async () => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const getUsers = async () => {
    const req = await fetch("http://localhost:3000/users");
    const res = await req.json();
    setUserData(res);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    getUsers();
  };
0.

  getUsers();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <input type="submit" value="submit" />
      </form>

      {userdata.map((e) => (
        <div key={e.id}>
          <h1>{e.name}</h1>
          <h1>{e.email}</h1>
          <h1>{e.password}</h1>
          <button onClick={() => handleDelete(e.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Form;
