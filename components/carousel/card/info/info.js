import React from 'react'

const info = (props) => (
  <React.Fragment>
    <div className='card-info'>
        <span>{props.title}</span>
    </div>
    <style jsx>{`
        .card-info {
            height: 30%;
            background: rgba(255,255,255,1);
            box-shadow: 0 -1px 3px rgba(0,0,0,0.12), 0 -1px 2px rgba(0,0,0,0.24);
            box-sizing: border-box;
            padding: 20px;
        }
    `}</style>
  </React.Fragment>
);

export default info;