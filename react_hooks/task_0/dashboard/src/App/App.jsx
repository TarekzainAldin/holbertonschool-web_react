import React from 'react'
import Notifications from '../Notifications/Notifications'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Login from '../Login/Login'
import BodySection from '../BodySection/BodySection'
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom'
import CourseList from '../CourseList/CourseList'
import PropTypes from 'prop-types'
import { getLatestNotification } from '../utils/utils'
import { StyleSheet, css } from 'aphrodite';
import newContext from '../Context/context'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
  ];
const coursesList = [
  { id: 1, name: 'ES6', credit: '60' },
  { id: 2, name: 'Webpack', credit: '20' },
  { id: 3, name: 'React', credit: '40' },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: newContext.logOut,
      notifications: notificationsList,
      courses: coursesList,
    }
    // This binding is necessary to make `this` work in the callback
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

  }

  logOut() {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      }
    })
  }

  markNotificationAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
    this.setState((prevState) => ({
      notifications: prevState.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  }

  logIn(email, password) {
    this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true,
      }
    })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
  }

  render() {

      return (
        <newContext.Provider value={{ user: this.state.user, logOut: this.logOut }}>
          <React.Fragment>
            <div className={css(styles.app)}>
              <div className={css(styles.notifications)}>
                <Notifications markNotificationAsRead={this.markNotificationAsRead}
                notifications={this.state.notifications}
                displayDrawer={this.state.displayDrawer}
                handleDisplayDrawer={this.handleDisplayDrawer}
                handleHideDrawer={this.handleHideDrawer} />
              </div>
              <Header />
              <div className={css(styles.body)}>
                {this.state.user.isLoggedIn ? (
                  <BodySectionWithMarginBottom title='Course list'>
                    <CourseList courses={coursesList} />
                  </BodySectionWithMarginBottom>
                  ) : (
                  <BodySectionWithMarginBottom title='Log in to continue'>
                    <Login
                    logIn={this.logIn}
                    email={this.state.user.email}
                    password={this.state.user.password} />
                  </BodySectionWithMarginBottom>
                )}
                <BodySection title='News from the School'>
                  <p>Holberton School News goes here</p>
                </BodySection>
              </div>
              <Footer />
            </div>
          </React.Fragment>
        </newContext.Provider>
      )
  }
}

const styles = StyleSheet.create({
  app: {
    margin: '0',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  body: {
    flex: '1',
  },
  notifications: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    right: '0',
    paddingRight: '1rem',
    minWidth: '30rem',
  }
})

App.PropTypes = {
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

export default App
