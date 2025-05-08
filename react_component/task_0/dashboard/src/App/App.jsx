import React, { Component } from "react";
import "./App.css";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };

    // Notifications and courses data can be defined here, too.
    this.notificationsList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      {
        id: 3,
        type: "urgent",
        html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
      },
    ];

    this.coursesList = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];
  }

  render() {
    return (
      <>
        <div className="root-notifications">
          <Notifications notifications={this.notificationsList} />
        </div>
        <Header />
        {this.state.isLoggedIn ? (
          <CourseList courses={this.coursesList} />
        ) : (
          <Login />
        )}
        <Footer />
      </>
    );
  }
}

export default App;
