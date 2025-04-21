import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";

const AppLayout = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    //make an api call and send userName and password
    const data = {
      name: "Eswar",
    };
    setUserName(data.name);
  }, []);
  return (
    <div className="app">
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </div>
  );
};

export default AppLayout;
