import React from 'react';

import Button from '../UI/button';

type Props = {
	error: boolean;
	auth: boolean;
	logout: () => void;
	setLogin: () => void;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<nav className="Nav" style={{ marginTop: props.error ? '6vh' : '0' }}>
				{props.auth ? (
					<Button clicked={props.logout}>Logout</Button>
				) : (
					<Button clicked={props.setLogin}>Login</Button>
				)}
			</nav>
			<style jsx>{`
				.Nav {
					display: flex;
					width: 100%;
					align-items: center;
					justify-content: center;
					padding: 10px;
					box-sizing: border-box;
				}
			`}</style>
		</React.Fragment>
	);
};
