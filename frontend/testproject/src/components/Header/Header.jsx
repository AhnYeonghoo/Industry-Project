import React from 'react';
import styles from './Header.module.css';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.contents}>
				<div>Logo</div>
				<nav className={styles.navigation}>
					<ul>
						<li>Menu1</li>
						<li>Menu2</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
