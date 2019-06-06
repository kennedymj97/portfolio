import React from 'react';

type Props = {
	title: string;
	imageSrc: string;
	info: string;
	github?: string;
	url?: string;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<div className="card">
				<div className="head-container">
					<h3 className="title">{props.title}</h3>
					<div className="image" />
				</div>
				<span className="info">{props.info}</span>
				<div className="buttons">
					{props.github ? <button>github</button> : null}
					{props.url ? <button>url</button> : null}
				</div>
			</div>
			<style jsx>{`
				.card {
					height: 400px;
					min-width: 42.5%;
					border-radius: 10px;
					box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15);
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					position: relative;
					align-content: flex-start;
					justify-content: space-between;
					margin-right: 16px;
					background: white;
					transition: opacity 0.6s;
					will-change: opacity;
					position: relative;
                }
                
                .head-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 65%;
                    box-sizing: border-box;
                }

				.title {
					margin: 0;
					padding: 10px;
				}

				.image {
					background-image: url(${props.imageSrc});
					background-size: cover;
                    width: 100%;
                    flex-grow: 1;
				}

				.info {
                    padding: 10px;
				}

				.buttons {
				}
			`}</style>
		</React.Fragment>
	);
};
