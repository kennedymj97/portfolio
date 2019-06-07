import React from 'react';

type Props = {
	children?: string | JSX.Element | JSX.Element[];
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<div className="Container">
				<span className="Message">{props.children}</span>
			</div>
			<style jsx>{`
				.Container {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.Message {
					font-size: 20px;
					color: rgba(175, 47, 47, 0.4);
					font-weight: 400;
					padding: 8px;
					box-sizing: border-box;
				}
			`}</style>
		</React.Fragment>
	);
};
