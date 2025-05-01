import React from "react";
import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";

function App() {
  const notificationsList = [
    { id: Math.floor(Math.random() * 1000), type: 'default', value: 'New course available' },
    { id: Math.floor(Math.random() * 1000), type: 'urgent', value: 'New resume available' },
    {
      id: Math.floor(Math.random() * 1000),
      type: 'urgent',
      html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' },
    },
  ];

  return (
    <>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} />
      </div>
      <Header />
      <Login />
      <Footer />
    </>
  );
}

export default App;
