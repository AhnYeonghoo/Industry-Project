import React from 'react';
import styles from './Main.module.css';
import Register from '../Register/Register';

const Main = () => {
	return (
		<main className={styles.main}>
			<Register />
		</main>
	);
};

export default Main;
