import React from 'react';

import Filter from './filter';

type Props = {
	count: number;
	completedCount: number;
	onClearCompleted: () => void;
	nowShowing: string;
	setShowing: (val: string) => void;
};

export default (props: Props) => {
	const activeTodoWord = props.count === 1 ? 'item' : 'items';
	let clearButton = null;

	if (props.completedCount > 0) {
		clearButton = (
			<React.Fragment>
				<button className="ClearButton" onClick={props.onClearCompleted}>
					Clear completed
				</button>
				<style jsx>{`
					.ClearButton {
						float: right;
						position: relative;
						line-height: 20px;
						text-decoration: none;
						cursor: pointer;
					}

					.ClearButton:hover {
						text-decoration: underline;
					}
				`}</style>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<footer className="TodoFooterContainer">
				<span className="TodoCount">
					<strong>{props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="Filters">
					<Filter clicked={() => props.setShowing('all')} selected={props.nowShowing === 'all'}>
						All
					</Filter>{' '}
					<Filter clicked={() => props.setShowing('active')} selected={props.nowShowing === 'active'}>
						Active
					</Filter>{' '}
					<Filter clicked={() => props.setShowing('completed')} selected={props.nowShowing === 'completed'}>
						Completed
					</Filter>
				</ul>
				{clearButton}
			</footer>
			<style jsx>{`
				.TodoFooterContainer {
					color: #777;
					padding: 10px 15px;
					height: 20px;
					text-align: center;
					border-top: 1px solid #e6e6e6;
				}

				.TodoFooterContainer:before {
					content: '';
					position: absolute;
					right: 0;
					bottom: 0;
					left: 0;
					height: 50px;
					overflow: hidden;
					box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
						0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
				}

				.TodoCount {
					float: left;
					text-align: left;
				}

				.TodoCount strong {
					font-weight: 300;
				}

				.Filters {
					margin: 0;
					padding: 0;
					list-style: none;
					position: absolute;
					right: 0;
					left: 0;
				}
			`}</style>
		</React.Fragment>
	);
};
