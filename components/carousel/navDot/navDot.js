import React from 'react'

const navDot = (props) => (
  <React.Fragment>
    <button className='fas fa-circle navDot' onClick={props.clicked} />
    <style jsx>{`
        .navDot {
            color: #333333;
            background: none;
            border: none;
            outline: none;
            opacity: ${props.active ? '1' : '0.5'};
            transition: opacity 0.3s linear;
            cursor: ${props.active ? 'default' : 'pointer'};
        }
    `}</style>
  </React.Fragment>
);

export default navDot;