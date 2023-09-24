import React, { useState } from 'react';
import './header.css';

export default function Header() {
	return (
		<header>
			<h1>수화탐험대</h1>
			<nav>
				<ul>
					<li>
						<a href='#'>로그인</a>
					</li>
					<li>
						<a href='#'>회원가입</a>
					</li>
					<li>
						<a href='#'>ABOUT</a>
					</li>
					<li>
						<a href='#'>학습</a>
					</li>
					<li>
						<a href='#'>퀴즈</a>
					</li>
					<li>
						<a href='#'>랭킹</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}
