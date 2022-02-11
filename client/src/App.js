import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/users",
    })
      .then((result) => {
        console.log(result.data);
        setUsers(result.data);
      })
      .catch((err) => console.log(`Error: error.message`));
  }, []);

  const userList =
    users &&
    users.map((user) => (
      <li key={user.id}>
        {user.first_name} {user.last_name} {user.email}{" "}
      </li>
    ));

  return <div className="App">
    <ul>
      {userList}
    </ul>
  </div>;
}

export default App;
