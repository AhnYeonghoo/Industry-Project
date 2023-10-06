import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';
import Main from '../Main/Main';

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			<Header />

			<Main />
			<Footer />
		</div>
	);
};

export default Layout;
