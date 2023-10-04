import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = (props) => {
	return (
		<div className={styles.layout}>
			<Header />

			<main className={styles.main}>{props.children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
