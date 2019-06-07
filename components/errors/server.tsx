import React from 'react';

export default () => {
	return (
		<React.Fragment>
			<header className="ErrorHeader">
				Error: failed to connect to the server. Recent changes made may be lost.
			</header>
			<style jsx>{`
				.ErrorHeader {
					width: 100vw;
					height: 5vh;
					background: red;
					color: white;
					font-size: 16px;
					font-weight: 400;
					display: flex;
					align-items: center;
					justify-content: center;
					position: fixed;
					top: 0;
					left: 0;
				}
			`}</style>
		</React.Fragment>
	);
};
