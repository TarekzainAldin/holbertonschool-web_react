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

class App extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  static defaultProps = {
    logOut: () => {}
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render() {
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
    const { isLoggedIn } = this.props;

    return (
      <React.Fragment>
        <div className={css(styles.app)}>
          <div className={css(styles.notifications)}>
            <Notifications notifications={notificationsList} />
          </div>
          <Header />
          <div className={css(styles.body)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title='Course list'>
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
              ) : (
              <BodySectionWithMarginBottom title='Log in to continue'>
                <Login />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title='News from the School'>
              <p>Holberton School News goes here</p>
            </BodySection>
          </div>
          <Footer />
        </div>
      </React.Fragment>
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
  logOut: PropTypes.func,
};

export default App
