import React, { useState } from 'react';
import './study.css';
import Header from '../header/Header';

export default function Study() {
	return (
		<main className='main'>
			수어를 배우러 가볼까요?
			<img className='studyImage' src='img/study.jpeg' />
			<a href='#' className='gotoStudy'>
				공부하러 가기
			</a>
		</main>
	);
}
