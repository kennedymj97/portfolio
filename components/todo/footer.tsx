import React from 'react';

export default () => {
	return (
		<React.Fragment>
			<footer className="Footer">
				<p>Double-click to edit a todo</p>
				<p>Created by Matthew Kennedy</p>
				<p>
					Inspired by <a href="http://todomvc.com">TodoMVC</a>
				</p>
			</footer>
			<style jsx>{`
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
			`}</style>
		</React.Fragment>
	);
};
