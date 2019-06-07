import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import Head from 'next/head';

import Nav from '../components/todo/nav';
import TodoInput from '../components/todo/input';
import Tasks from '../components/todo/tasks/tasks';
import TodoFooter from '../components/todo/tasks/footer/footer';
import LoginModal from '../components/todo/modal';
import Footer from '../components/todo/footer';
import NotAuthed from '../components/errors/auth';
import ErrorHeader from '../components/errors/server';
import Spinner from '../components/UI/spinner';
import uuidv1 from 'uuid/v1';

/*

TODOS:
- make it so all offline activity is saved instead of removed?
- improve warning messages on inputs
- autofocus to email input on modal open

*/

<<<<<<< HEAD
const BASE_URL: string = 'http://ec2-34-244-114-95.eu-west-1.compute.amazonaws.com:8080';
=======
const BASE_URL: string = 'https://api.mattkennedy.io';
>>>>>>> 4008b56edff40d5552f2ef7c49c0a1323abaa04d

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

	const activeTodoCount = todos.reduce(function(accum, todo) {
		return todo.completed ? accum : accum + 1;
	}, 0);

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
				<meta name="description" content={'React/Typescript with Golang api todo app'} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/static/icon.jpg" />
				<link
					rel="stylesheet"
					href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
					integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
					crossOrigin="anonymous"
				/>
			</Head>
			{error ? <ErrorHeader /> : null}
			<Nav error={error} auth={authorized} logout={() => logoutUser()} setLogin={() => setLogin(true)} />
			<div className="TodoApp">
				<h1>todos</h1>
				<TodoInput
					submitted={(e: React.FormEvent<HTMLFormElement>) => handleNewTodoSubmit(e)}
					value={task}
					edit={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
				/>
				{loading ? (
					<Spinner />
				) : (
					<Tasks
						todos={todos}
						activeTodoCount={activeTodoCount}
						showing={nowShowing}
						toggleAll={(e) => toggleAll(e)}
						toggle={toggle}
						destroy={destroy}
						edit={setEditing}
						editing={editing}
						save={save}
					/>
				)}
				{footer}
				<LoginModal
					active={login}
					backgroundClicked={() => setLogin(false)}
					isLogin={isLogin}
					setIsLogin={setIsLogin}
					loggingIn={loggingIn}
					login={(e) => loginUserSubmit(e)}
					signup={(e) => signupUser(e)}
					email={email}
					password={password}
					confirmPassword={confirmPassword}
					setEmail={setEmail}
					setPassword={setPassword}
					setConfirmPassword={setConfirmPassword}
				/>
			</div>
			{authorized ? null : <NotAuthed>Login to save your tasks.</NotAuthed>}
			<Footer />
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
