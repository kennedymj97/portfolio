import React from 'react';

type Props = {
	clicked?: () => void;
	selected: boolean;
	children?: string;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<li
				className="FiltersItem"
				onClick={props.clicked}
				style={{ borderColor: props.selected ? 'rgba(175, 47, 47, 0.2)' : 'rgba(175, 47, 47, 0.08)' }}
			>
				{props.children}
			</li>
			<style jsx>{`
				.FiltersItem {
					display: inline;
					color: inherit;
					margin: 3px;
					padding: 3px 7px;
					text-decoration: none;
					border: 1px solid transparent;
					border-radius: 3px;
				}
			`}</style>
		</React.Fragment>
	);
};
