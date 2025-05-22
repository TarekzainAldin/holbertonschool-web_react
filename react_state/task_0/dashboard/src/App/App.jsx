// task_0/dashboard/src/App/App.jsx
import React from "react";
import Notifications from "../Notifications/Notifications";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
    };
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  render() {
    const notifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      {
        id: 3,
        type: "urgent",
        html: { __html: "<strong>Urgent requirement</strong> - complete by EOD" },
      },
    ];

    return (
      <Notifications
        displayDrawer={this.state.displayDrawer}
        notifications={notifications}
        handleDisplayDrawer={this.handleDisplayDrawer}
        handleHideDrawer={this.handleHideDrawer}
      />
    );
  }
}

export default App;
