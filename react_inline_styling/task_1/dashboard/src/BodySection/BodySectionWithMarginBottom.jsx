import React from 'react';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

class BodySectionWithMarginBottom extends React.Component {
	render() {
		const { title, children } = this.props;
		return (
			<>
			<div className={css(styles.bodyMargin)}>
				<BodySection title={title}>
					{children}
				</BodySection>
			</div>
			</>
		)
	}
}

const styles = StyleSheet.create({
	bodyMargin: {
		marginBottom: '40px',
	}
})

export default BodySectionWithMarginBottom;
