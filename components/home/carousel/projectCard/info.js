import React, { useState } from 'react';
import Button from '@material-ui/core/Button/Button';
import AnimateHeight from 'react-animate-height';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const about = (props) => {
	const [ height, setHeight ] = useState(0);

	const expansionHandler = () => {
		setHeight(height === 0 ? 'auto' : 0);
	};

	return (
		<React.Fragment>
			<div className="about">
				<div className="card-header">
					<h3 style={{ margin: '0' }}>{props.title}</h3>
					<IconButton
						style={
							height === 0 ? (
								{
									transform: 'rotate(180deg)',
									transition: 'transform 0.15s ease-out'
								}
							) : (
								{
									transform: 'rotate(0deg)',
									transition: 'transform 0.15s ease-out'
								}
							)
						}
						onClick={expansionHandler}
					>
						<ExpandMoreIcon />
					</IconButton>
				</div>
				<AnimateHeight duration={500} height={height}>
					<p>{props.info}</p>
					<Button
						style={{
							color: 'white',
							background: '#0076ff',
							display: 'flex',
							alignSelf: 'center',
							justifySelf: 'center',
							width: '180px',
							maxWidth: '80%',
							margin: 'auto'
						}}
						href={props.repo}
					>
						<span className="button-text">View on GitHub</span> <i className="fab fa-github fa-2x" />
					</Button>
				</AnimateHeight>
			</div>
			<style jsx>{`
				.about {
					min-height: min-content;
					max-width: 100%;
					display: flex;
					flex-direction: column;
					jusitfy-content: center;
					padding: 13px;
					box-sizing: border-box;
					transition: max-height 0.5s ease-in;
					background: white;
					box-shadow: 0 -1px 2px 0 rgba(60, 64, 67, 0.3), 0 -1px 3px 1px rgba(60, 64, 67, 0.15);
					border-radius: 0 0 10px 10px;
				}

				.card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.button-text {
					padding-right: 5px;
				}
			`}</style>
		</React.Fragment>
	);
};

export default about;
