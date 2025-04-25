import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

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
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <Outlet />
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

export default AppLayout;
