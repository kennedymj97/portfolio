import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Head from 'next/head';

import TodoItem from '../components/todo/tasks/task';
import TodoFooter from '../components/todo/tasks/footer/footer';
import LoginModal from '../components/todo/modal';
import Button from '../components/UI/button';
import NotAuthed from '../components/errors/auth';
import Spinner from '../components/UI/spinner';
import uuidv1 from 'uuid/v1';

/*

TODOS:
- make it so all offline activity is saved instead of removed?
- improve warning messages on inputs
- autofocus to email input on modal open

*/

const BASE_URL: string = 'http://ec2-34-250-151-5.eu-west-1.compute.amazonaws.com:8080';

export default () => {
	// variable for the task input field
	const [ task, setTask ] = useState<string>('');
	// state of todos
	const [ todos, setTodos ] = useState<ITodo[]>([]);
	// id of a todo being edited
	const [ editing, setEditing ] = useState<string>('');
	// which todos are showing (all, active, completed)
	const [ nowShowing, setNowShowing ] = useState<string>('all');
	// is the login modal active
	const [ login, setLogin ] = useState<boolean>(false);
	// variables for login/signup
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ confirmPassword, setConfirmPassword ] = useState<string>('');
	// has an error occured contacting server
	const [ error, setError ] = useState<boolean>(false);
	// is the user logged in
	const [ authorized, setAuthorized ] = useState<boolean>(false);
	// used to toggle login/signup
	const [ isLogin, setIsLogin ] = useState<boolean>(true);
	// used to toggle fetching data loading state
	const [ loading, setLoading ] = useState<boolean>(false);
	// used to toggle logging in loading state
	const [ loggingIn, setLoggingIn ] = useState<boolean>(false);

	// handleError deals with errors produced when fetching data
	const handleError = (error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			setAuthorized(false);
		} else if (error.response && error.response.status === 400) {
			alert('Username or password is incorrect.');
		} else {
			setError(true);
		}
		setLoading(false);
	};

	// handleResponse deals with the response from the axios requests
	const handleResponse = (res: AxiosResponse) => {
		if (res.status === 200) {
			setAuthorized(true);
			setError(false);
		}
	};

	// getTasks retrieves all of the users tasks from the database
	const getTasks = useCallback(async () => {
		try {
			setLoading(true);
			setError(false);
			const res = await axios.get(BASE_URL + '/api/tasks', { withCredentials: true });
			if (res.status === 200) {
				setAuthorized(true);
				const tasks = res.data.tasks;
				if (tasks !== null) {
					tasks.reverse();
					setTodos(tasks);
				} else {
					setTodos([]);
				}
			}
			setLoading(false);
		} catch (error) {
			handleError(error);
		}
	}, []);

	useEffect(
		() => {
			getTasks();
		},
		[ getTasks ]
	);

	// handleNewTodoSubmit adds a todo and posts it to the backend
	const handleNewTodoSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		// Change this so an attempt is made to post the task to the db.
		event.preventDefault();
		const newTodos = [ ...todos ];
		const id = uuidv1();
		newTodos.unshift({ id: id, content: task, completed: false });
		setTodos(newTodos);
		setTask('');
		try {
			const res = await axios.post(
				BASE_URL + '/api/tasks/create',
				{ id: id, content: task },
				{ withCredentials: true }
			);
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// toggleAll toggles the state of all of the todos
	const toggleAll = async (event: React.FormEvent<HTMLInputElement>) => {
		const newTodos = [ ...todos ];
		if (event.currentTarget.checked) {
			newTodos.forEach((ele) => {
				ele.completed = true;
			});
		} else {
			newTodos.forEach((ele) => {
				ele.completed = false;
			});
		}
		setTodos(newTodos);
		try {
			let res;
			if (event.currentTarget.checked) {
				res = await axios.post(BASE_URL + '/api/tasks/toggleAll', { val: true }, { withCredentials: true });
			} else {
				res = await axios.post(BASE_URL + '/api/tasks/toggleAll', { val: false }, { withCredentials: true });
			}
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// toggle switches toggles the selected todo's completed state
	const toggle = async (todoToToggle: ITodo) => {
		const newTodos = [ ...todos ];
		newTodos.forEach((ele) => {
			if (ele.id === todoToToggle.id) {
				ele.completed = !todoToToggle.completed;
			}
		});
		setTodos(newTodos);
		try {
			const res = await axios.post(
				BASE_URL + '/api/tasks/toggle',
				{ id: todoToToggle.id, val: todoToToggle.completed },
				{ withCredentials: true }
			);
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// destroy deletes a todo
	const destroy = async (todo: ITodo) => {
		const newTodos = todos.filter((ele) => {
			return ele.id !== todo.id;
		});
		setTodos(newTodos);
		try {
			const res = await axios.delete(BASE_URL + `/api/tasks/delete/${todo.id}`, { withCredentials: true });
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// save updates the todo's content
	const save = async (todoToSave: ITodo, text: string) => {
		const newTodos = [ ...todos ];
		newTodos.forEach((ele) => {
			if (ele.id === todoToSave.id) {
				ele.content = text;
			}
		});
		setTodos(newTodos);
		setEditing('');
		try {
			const res = await axios.post(
				BASE_URL + '/api/tasks/edit',
				{ id: todoToSave.id, content: text },
				{ withCredentials: true }
			);
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// clearCompleted deletes all of the completed todos
	const clearCompleted = async () => {
		const newTodos = todos.filter((ele) => {
			return ele.completed === false;
		});
		setTodos(newTodos);
		try {
			const res = await axios.delete(BASE_URL + '/api/tasks/clearCompleted', { withCredentials: true });
			handleResponse(res);
		} catch (error) {
			handleError(error);
		}
	};

	// loginUser creates a new user session
	const loginUser = async () => {
		try {
			setLoggingIn(true);
			const res = await axios.post(
				BASE_URL + '/api/users/login',
				{ email: email, password: password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				setAuthorized(true);
				setError(false);
				setLogin(false);
				getTasks();
			}
			setLoggingIn(false);
		} catch (error) {
			handleError(error);
			setAuthorized(false);
			setLoggingIn(false);
		}
	};

	// loginUserSubmit handles submission of the login form
	const loginUserSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		loginUser();
	};

	// signupUser creates a new user session and logs the user in
	const signupUser = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (password !== confirmPassword) {
				alert('Passwords do not match!');
				return;
			}
			setLoggingIn(true);
			const res = await axios.post(
				BASE_URL + '/api/users/create',
				{ email: email, password: password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				loginUser();
			}
			setLoggingIn(false);
		} catch (error) {
			handleError(error);
			setLoggingIn(false);
		}
	};

	const logoutUser = async () => {
		setAuthorized(false);
		setTodos([]);
		try {
			await axios.delete(BASE_URL + '/api/users/logout', { withCredentials: true });
		} catch (error) {
			handleError(error);
		}
	};

	const shownTodos = todos.filter((todo) => {
		switch (nowShowing) {
			case 'active':
				return !todo.completed;
			case 'completed':
				return todo.completed;
			default:
				return true;
		}
	});

	const todoItems = shownTodos.map((todo) => (
		<TodoItem
			key={todo.id}
			todo={todo}
			onToggle={() => toggle(todo)}
			onDestroy={() => destroy(todo)}
			onEdit={() => setEditing(todo.id)}
			editing={editing === todo.id}
			onSave={(text) => save(todo, text)}
			onCancel={() => setEditing('')}
		/>
	));

	const activeTodoCount = todos.reduce(function(accum, todo) {
		return todo.completed ? accum : accum + 1;
	}, 0);

	let main;
	if (todos.length) {
		main = (
			<React.Fragment>
				<div className="TodoBody">
					<input
						className="ToggleAll"
						id="toggle-all"
						type="checkbox"
						onChange={(e) => toggleAll(e)}
						checked={activeTodoCount === 0}
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

	const completedCount = todos.length - activeTodoCount;

	let footer;
	if (activeTodoCount || completedCount) {
		footer = (
			<TodoFooter
				count={activeTodoCount}
				completedCount={completedCount}
				nowShowing={nowShowing}
				onClearCompleted={() => clearCompleted()}
				setShowing={(val) => setNowShowing(val)}
			/>
		);
	}

	return (
		<React.Fragment>
			<Head>
				<meta charSet="UTF-8" />
				<title>Todos</title>
				<meta name="description" content={"React/Typescript with Golang api todo app"} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/static/icon.jpg" />
				<link
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
					integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
					crossOrigin="anonymous"
				/>
			</Head>
			{error ? (
				<header className="ErrorHeader">
					Error: failed to connect to the server. Recent changes made may be lost.
				</header>
			) : null}
			<nav className="Nav" style={{ marginTop: error ? '6vh' : '0' }}>
				{authorized ? (
					<Button clicked={() => logoutUser()}>Logout</Button>
				) : (
					<Button clicked={() => setLogin(true)}>Login</Button>
				)}
			</nav>
			<div className="TodoApp">
				<h1>todos</h1>
				<form onSubmit={(e) => handleNewTodoSubmit(e)}>
					<input
						className="TodoInput"
						value={task}
						placeholder="What needs to be done?"
						onChange={(e) => setTask(e.target.value)}
						autoFocus={true}
					/>
				</form>
				{loading ? <Spinner /> : main}
				{footer}
				<LoginModal active={login} backgroundClicked={() => setLogin(false)}>
					{isLogin ? (
						<form className="LoginForm" onSubmit={(e) => loginUserSubmit(e)}>
							<h2>login</h2>
							<label>Email</label>
							<input
								placeholder={'Enter email here'}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label>Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							{loggingIn ? <Spinner /> : <Button>Login</Button>}
							<span style={{ marginTop: '1rem' }} onClick={() => setIsLogin(false)}>
								Don't have an account? Signup.
							</span>
						</form>
					) : (
						<form className="LoginForm" onSubmit={(e) => signupUser(e)}>
							<h2>signup</h2>
							<label>Email</label>
							<input
								placeholder={'Enter email here'}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label>Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label>Confirm Password</label>
							<input
								type="password"
								placeholder={'Enter password here'}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{loggingIn ? <Spinner /> : <Button>Signup</Button>}
							<span onClick={() => setIsLogin(true)}>Already have an account? Login.</span>
						</form>
					)}
				</LoginModal>
			</div>
			{authorized ? null : <NotAuthed>Login to save your tasks.</NotAuthed>}
			<footer className="Footer">
				<p>Double-click to edit a todo</p>
				<p>Created by Matthew Kennedy</p>
				<p>
					Inspired by <a href="http://todomvc.com">TodoMVC</a>
				</p>
			</footer>
			<style jsx>{`
				.TodoApp {
					background: #fff;
					margin: 130px 0 40px 0;
					position: relative;
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
				}

				.TodoApp input::-webkit-input-placeholder {
					font-style: italic;
					font-weight: 300;
					color: #e6e6e6;
				}

				.TodoApp input::-moz-placeholder {
					font-style: italic;
					font-weight: 300;
					color: #e6e6e6;
				}

				.TodoApp input::input-placeholder {
					font-style: italic;
					font-weight: 300;
					color: #e6e6e6;
				}

				.TodoApp h1 {
					position: absolute;
					top: -155px;
					width: 100%;
					font-size: 100px;
					font-weight: 100;
					text-align: center;
					color: rgba(175, 47, 47, 0.15);
					-webkit-text-rendering: optimizeLegibility;
					-moz-text-rendering: optimizeLegibility;
					text-rendering: optimizeLegibility;
				}

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

				.Nav {
					display: flex;
					width: 100%;
					align-items: center;
					justify-content: center;
					padding: 10px;
					box-sizing: border-box;
				}

				.Footer {
					margin: 65px auto 0;
					color: #bfbfbf;
					font-size: 10px;
					text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
					text-align: center;
				}

				.Footer p {
					line-height: 1;
				}

				.Footer a {
					color: inherit;
					text-decoration: none;
					font-weight: 400;
				}

				.Footer a:hover {
					text-decoration: underline;
				}

				.ErrorHeader {
					width: 100vw;
					height: 5vh;
					background: red;
					color: white;
					font-size: 16px;
					font-weight: 400;
					display: flex;
					align-items: center;
					justify-content: center;
					position: fixed;
					top: 0;
					left: 0;
				}

				.LoginForm {
					display: flex;
					flex-direction: column;
					width: 100%;
					align-items: center;
					justify-content: center;
				}
			`}</style>
			<style jsx global>{`
				html,
				body {
					margin: 0;
					padding: 0;
				}

				button {
					margin: 0;
					padding: 0;
					border: 0;
					background: none;
					font-size: 100%;
					vertical-align: baseline;
					font-family: inherit;
					font-weight: inherit;
					color: inherit;
					-webkit-appearance: none;
					appearance: none;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				body {
					font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
					line-height: 1.4em;
					background: #f5f5f5;
					color: #4d4d4d;
					min-width: 230px;
					max-width: 550px;
					margin: 0 auto;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					font-weight: 300;
				}

				:focus {
					outline: 0;
				}

				hr {
					margin: 20px 0;
					border: 0;
					border-top: 1px dashed #c5c5c5;
					border-bottom: 1px dashed #f7f7f7;
				}
			`}</style>
		</React.Fragment>
	);
};
