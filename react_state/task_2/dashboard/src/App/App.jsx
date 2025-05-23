import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import newContext, { user as defaultUser, logOut as defaultLogOut } from '../Context/context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
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
        <Notifications />
        <Header />
        {user.isLoggedIn ? (
          <CourseList />
        ) : (
          <Login logIn={this.logIn} />
        )}
        <Footer />
      </newContext.Provider>
    );
  }
}

export default App;
