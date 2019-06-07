import React from 'react';
import Head from 'next/head';

type Props = {
	title?: string;
	description?: string;
	children: JSX.Element[];
};

export default (props: Props) => (
	<React.Fragment>
		<Head>
			<meta charSet="UTF-8" />
			<title>{props.title || 'MK - Portfolio'}</title>
			<meta name="description" content={props.description || "Matthew Kennedy's Portfolio"} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/static/icon.jpg" />
			<link
				rel="stylesheet"
				href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
				integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
				crossOrigin="anonymous"
			/>
		</Head>
		<div className="page">{props.children}</div>
		<style jsx>{`
			.page {
			}
		`}</style>
		<style jsx global>{`
			html {
				line-height: 1.15;
				-webkit-text-size-adjust: 100%;
				height: 100%;
				box-sizing: border-box;
				scroll-behavior: smooth;
			}
			*,
			*:before,
			*:after {
				box-sizing: inherit;
			}
			body {
				position: relative;
				min-height: 100%;
				margin: 0;
				line-height: 1.65;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
					'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
				font-size: 16px;
				font-weight: 400;
				min-width: 320px;
				direction: ltr;
				font-feature-settings: 'kern';
				text-rendering: optimizeLegibility;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
			html,
			body {
				background-color: #fff;
				color: rgba(0, 0, 0, 0.8);
			}
		`}</style>
	</React.Fragment>
);
