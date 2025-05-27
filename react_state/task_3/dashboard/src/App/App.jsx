import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import AppContext, { user as defaultUser } from '../Context/context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      displayDrawer: false,
      user: { ...defaultUser },
      logOut: this.logOut,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  handleDisplayDrawer = () => this.setState({ displayDrawer: true });
  handleHideDrawer = () => this.setState({ displayDrawer: false });

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({ user: { ...defaultUser } });
  }

  render() {
    const { user, displayDrawer } = this.state;

    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <AppContext.Provider value={{ user: this.state.user, logOut: this.state.logOut }}>
        <div className={css(styles.app)}>
          <div className={css(styles.notifications)}>
            <Notifications
              notifications={notificationsList}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <Header />
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login logIn={this.logIn} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    position: 'relative',
    minHeight: '100vh',
  },
  notifications: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default App;
