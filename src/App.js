import Header from "./components/Header";
import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import useScrollToTop from "./utils/useScrollToTop";

const AppLayout = () => {
  const [userName, setUserName] = useState("");

  const outletRef = useRef(null);
  useScrollToTop(outletRef);

  useEffect(() => {
    //make an api call and send userName and password
    const data = {
      name: "Eswar",
    };
    setUserName(data.name);
  }, []);

  return (
    <div className="app h-screen flex flex-col">
      <Provider store={appStore}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <Header />
          <div ref={outletRef} className="flex-grow overflow-y-auto mt-[25vh]">
            <Outlet />
          </div>
        </UserContext.Provider>
      </Provider>
    </div>
  );
};

export default AppLayout;
