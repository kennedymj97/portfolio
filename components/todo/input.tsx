import React from 'react';

type Props = {
	submitted: (e: React.FormEvent<HTMLFormElement>) => void;
	value: string;
	edit: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default (props: Props) => {
	return (
		<React.Fragment>
			<form onSubmit={props.submitted}>
				<input
					className="TodoInput"
					value={props.value}
					placeholder="What needs to be done?"
					onChange={props.edit}
					autoFocus={true}
				/>
			</form>
			<style jsx>{`
				.TodoInput {
					position: relative;
					margin: 0;
					width: 100%;
					font-size: 24px;
					font-family: inherit;
					font-weight: inherit;
					line-height: 1.4em;
					color: inherit;
					padding: 6px;
					border: 1px solid #999;
					box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
					box-sizing: border-box;
					padding: 16px 16px 16px 60px;
					border: none;
					background: rgba(0, 0, 0, 0.003);
					box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
			`}</style>
		</React.Fragment>
	);
};
