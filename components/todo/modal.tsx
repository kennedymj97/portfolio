import React from 'react';

type Props = {
	active: boolean;
	backgroundClicked: () => void;
	children?: JSX.Element[] | JSX.Element;
};

export default ({ active, backgroundClicked, children }: Props) => {
	return (
		<React.Fragment>
			<div className="ModalContainer" style={{ visibility: active ? 'visible' : 'hidden' }}>
				<div className="ModalBackground" onClick={backgroundClicked} />
				<div className="LoginContainer" style={{ transform: active ? 'translateY(0)' : 'translateY(-100vh)' }}>
					{children}
				</div>
			</div>
			<style jsx>{`
				.ModalContainer {
					height: 100vh;
					width: 100vw;
					position: fixed;
					display: flex;
					align-items: center;
					top: 0;
					left: 0;
					justify-content: center;
					z-index: 4;
				}

				.ModalBackground {
					background: rgba(175, 47, 47, 0.15);
					height: 100vh;
					width: 100vw;
					position: fixed;
					top: 0;
					left: 0;
					z-index: 5;
				}

				.LoginContainer {
					background: white;
					border-radius: 8px;
					padding: 30px;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 3px 1px rgba(0, 0, 0, 0.24);
					transition: all 0.3s ease-out;
					z-index: 6;
				}

				.LoginContainer input {
					position: relative;
					margin: 0;
					width: 100%;
					font-size: 16px;
					font-family: inherit;
					font-weight: inherit;
					line-height: 1.4em;
					padding: 8px;
					color: inherit;
					border: 1px solid #999;
					border-radius: 8px;
					box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
					box-sizing: border-box;
					background: rgba(0, 0, 0, 0.003);
					box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.03);
					width: 30vw;
					margin-bottom: 1.5rem;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				.LoginContainer label {
					font-size: 20px;
					color: #999;
					margin-bottom: 0.5rem;
				}

				.LoginContainer h2 {
					margin: 0 0 2.5rem 0;
					font-size: 36px;
					color: rgba(175, 47, 47, 0.35);
					-webkit-text-rendering: optimizeLegibility;
					-moz-text-rendering: optimizeLegibility;
					text-rendering: optimizeLegibility;
				}
			`}</style>
		</React.Fragment>
	);
};
