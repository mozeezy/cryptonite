import React, { useState, useEffect } from "react";
// import { BrowserRouter, Router } from "react-router-dom";
import axios from "axios";
import coinWatchList from "./pages/coinWatchList"
function App() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "/api/users",
  //   })
  //     .then((result) => {
  //       console.log(result.data);
  //       setUsers(result.data);
  //     })
  //     .catch((err) => console.log(`Error: error.message`));
  // }, []);

  // const userList =
  //   users &&
  //   users.map((user) => (
  //     <li key={user.id}>
  //       {user.first_name} {user.last_name} {user.email}{" "}
  //     </li>
  //   ));

  return <div className="App">   

  <coinWatchList/>
    {/* <ul>
      {userList}
    </ul> */}
  </div>;
}

export default App;
