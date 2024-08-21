import styles from './Modal.module.scss';
import { useState } from 'react';

export default function Modal({ player1, player2 }) {
	const [data, setData] = useState(false);

	return (
		<>
			{data ? <div className={styles.container}>
				<div className={styles.content}>Modal</div>
			</div> : null}
		</>
	);
};
