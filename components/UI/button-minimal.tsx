import React from 'react'

type Props = {
    url?: string,
    newTab: boolean,
    clicked?: () => void,
    children: JSX.Element[] | JSX.Element | string
}

export default (props: Props) => {
    return (
        <React.Fragment>
            <a href={props.url ? props.url : undefined} onClick={props.clicked ? props.clicked : () => null} className="button-minimal" target={props.newTab ? "_blank" : undefined}>
                {props.children}
            </a>
            <style jsx>{`
                .button-minimal {
					text-decoration: none;
					color: #0076ff;
					border-radius: 7px;
					transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
					padding: 0.25rem 0.5rem;
					cursor: pointer;
				}

				.button-minimal:hover {
					background: rgba(0, 118, 255, 0.1);
				}
            `}</style>
        </React.Fragment>
    )
}