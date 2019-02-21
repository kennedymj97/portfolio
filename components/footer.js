import React from 'react';

const footer = (props) => (
	<React.Fragment>
		<footer className="footer">
			<div className="footer-quote">
				<blockquote>“The man who moves a mountain begins by carrying away small stones.”</blockquote>
				<span>-Confucius</span>
			</div>
			<div className="footer-contact">
				<h3 className='footer-contact-heading'>Get in touch</h3>
				<span>kennedymj97@gmail.com</span>
				<div className="footer-contact-icons">
					<a href="https://github.com/kennedymj97">
						<img src="../static/GitHub-logo.png" className="footer-contact-icon github-icon" />
					</a>
					<a href="https://www.linkedin.com/in/matthew-kennedy-94323a159/">
						<img src="../static/linkedin-logo.png" className="footer-contact-icon linkedin-icon" />
					</a>
				</div>
			</div>
		</footer>
		<style jsx>{`
			.footer {
				width: 100%;
				margin: 0 auto;
				padding: 0 0;
				background-image: linear-gradient(to bottom, #121212 0%, #323232 100%);
				color: #f1f1f1;
				overflow: hidden;
				padding: 2rem 0 4rem;
				min-height: 400px;
				display: flex;
				align-items: center;
				flex-direction: column;
			}

			.footer-quote {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-wieght: 500;
				font-size: 16px;
				text-align: center;
			}

			.footer-contact {
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.footer-contact-heading {
				margin-bottom: 8px;
			}

			.footer-contact-icons {
				display: flex;
				align-items: center;
			}

			.footer-contact-icon {
				width: 36px;
			}

			.github-icon {
				margin: 15px 20px 0 0;
			}

			.linkedin-icon {
				margin-top: 15px;
			}
		`}</style>
	</React.Fragment>
);

export default footer;
