import React, { useState } from 'react';
import './quiz.css';

export default function Quiz() {
	return (
		<main className='quiz'>
			배운 것을 테스트 해봐요!
			<img className='testImage' src='img/study.jpeg' />
			<a href='#' className='gotoQuiz'>
				테스트하기
			</a>
		</main>
	);
}
