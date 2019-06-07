import React from 'react';

import Task from './task';

type Props = {
	todos: ITodo[];
	activeTodoCount: number;
	showing: string;
	toggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
	toggle: (todo: ITodo) => void;
	destroy: (todo: ITodo) => void;
	edit: (id: string) => void;
	editing: string;
	save: (todo: ITodo, text: string) => void;
};

export default (props: Props) => {
	const shownTodos = props.todos.filter((todo) => {
		switch (props.showing) {
			case 'active':
				return !todo.completed;
			case 'completed':
				return todo.completed;
			default:
				return true;
		}
	});

	const todoItems = shownTodos.map((todo) => (
		<Task
			key={todo.id}
			todo={todo}
			onToggle={() => props.toggle(todo)}
			onDestroy={() => props.destroy(todo)}
			onEdit={() => props.edit(todo.id)}
			editing={props.editing === todo.id}
			onSave={(text) => props.save(todo, text)}
			onCancel={() => props.edit('')}
		/>
	));

	let body: JSX.Element | null = null;
	if (props.todos.length) {
		body = (
			<React.Fragment>
				<div className="TodoBody">
					<input
						className="ToggleAll"
						id="toggle-all"
						type="checkbox"
						onChange={props.toggleAll}
						checked={props.activeTodoCount === 0}
					/>
					<label htmlFor="toggle-all">Mark all as complete</label>
					<ul className="TodoList">{todoItems}</ul>
				</div>
				<style jsx>{`
					.TodoBody {
						position: relative;
						z-index: 2;
						border-top: 1px solid #e6e6e6;
					}

					.ToggleAll {
						width: 1px;
						height: 1px;
						border: none; /* Mobile Safari */
						opacity: 0;
						position: absolute;
						right: 100%;
						bottom: 100%;
					}

					.ToggleAll + label {
						width: 60px;
						height: 34px;
						font-size: 0;
						position: absolute;
						top: -52px;
						left: -13px;
						-webkit-transform: rotate(90deg);
						transform: rotate(90deg);
					}

					.ToggleAll + label:before {
						content: '❯';
						font-size: 22px;
						color: #e6e6e6;
						padding: 10px 27px 10px 27px;
					}

					.ToggleAll:checked + label:before {
						color: #737373;
					}

					.TodoList {
						margin: 0;
						padding: 0;
						list-style: none;
					}
				`}</style>
			</React.Fragment>
		);
	}

	return body;
};
