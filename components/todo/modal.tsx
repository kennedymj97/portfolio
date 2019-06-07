import React from 'react';

import Button from '../UI/button';
import Spinner from '../UI/spinner';

type Props = {
	active: boolean;
	backgroundClicked: () => void;
	isLogin: boolean;
	setIsLogin: (val: boolean) => void;
	loggingIn: boolean;
	login: (e: React.FormEvent<HTMLFormElement>) => void;
	signup: (e: React.FormEvent<HTMLFormElement>) => void;
	email: string;
	password: string;
	confirmPassword: string;
	setEmail: (val: string) => void;
	setPassword: (val: string) => void;
	setConfirmPassword: (val: string) => void;
	children?: JSX.Element[] | JSX.Element;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<div className="ModalContainer" style={{ visibility: props.active ? 'visible' : 'hidden' }}>
				<div className="ModalBackground" onClick={props.backgroundClicked} />
				<div
					className="LoginContainer"
					style={{ transform: props.active ? 'translateY(0)' : 'translateY(-100vh)' }}
				>
					{props.isLogin ? (
						<form className="LoginForm" onSubmit={props.login}>
							<h2>login</h2>
							<label>Email</label>
							<input
								placeholder={'Enter email here'}
								value={props.email}
								onChange={(e) => props.setEmail(e.target.value)}
							/>
							<label>Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={props.password}
								onChange={(e) => props.setPassword(e.target.value)}
							/>
							{props.loggingIn ? <Spinner /> : <Button>Login</Button>}
							<span style={{ marginTop: '1rem' }} onClick={() => props.setIsLogin(false)}>
								Don't have an account? Signup.
							</span>
						</form>
					) : (
						<form className="LoginForm" onSubmit={props.signup}>
							<h2>signup</h2>
							<label>Email</label>
							<input
								placeholder={'Enter email here'}
								value={props.email}
								onChange={(e) => props.setEmail(e.target.value)}
							/>
							<label>Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={props.password}
								onChange={(e) => props.setPassword(e.target.value)}
							/>
							<label>Confirm Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={props.confirmPassword}
								onChange={(e) => props.setConfirmPassword(e.target.value)}
							/>
							{props.loggingIn ? <Spinner /> : <Button>Signup</Button>}
							<span onClick={() => props.setIsLogin(true)}>Already have an account? Login.</span>
						</form>
					)}
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

				.LoginForm {
					display: flex;
					flex-direction: column;
					width: 100%;
					align-items: center;
					justify-content: center;
				}
			`}</style>
		</React.Fragment>
	);
};
