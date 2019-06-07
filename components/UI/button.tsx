import React from 'react';

type Props = {
	clicked?: () => void;
	children: string;
};

export default (props: Props) => (
	<React.Fragment>
		<button className="Button" onClick={props.clicked}>
			{props.children}
		</button>
		<style jsx>{`
			.Button {
				margin: 0;
				padding: 0 2rem;
				height: 2.5rem;
				line-height: 2.5rem;
				border-radius: 7px;
				background-color: rgba(175, 47, 47, 0.15);
				box-shadow: rgba(175, 47, 47, 0.07);
				color: white;
				display: inline-block;
				cursor: pointer;
				text-decoration: none;
				border: none;
				font-size: inherit;
				transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
				width: 160px;
			}

			.Button:hover {
				background: rgba(175, 47, 47, 0.13);
				box-shadow: 0 6px 20px rgba(175, 47, 47, 0.05);
			}

			.Button:active {
				background: rgba(175, 47, 47, 0.20);
			}
		`}</style>
	</React.Fragment>
);
