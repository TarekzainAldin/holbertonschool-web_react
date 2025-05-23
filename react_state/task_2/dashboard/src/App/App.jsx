// task_2/dashboard/src/App/App.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import Notifications from '../Notifications/Notifications';
import { newContext, user, logOut } from '../Context/context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user,
      logOut: this.logOut,
    };
  }

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  render() {
    const { user } = this.state;
    return (
      <newContext.Provider value={{ user, logOut: this.logOut }}>
        <div className="App">
          <Notifications />
          <Header />
          {user.isLoggedIn ? (
            <CourseList />
          ) : (
            <Login logIn={this.logIn} />
          )}
          <Footer />
        </div>
      </newContext.Provider>
    );
  }
}

export default App;
