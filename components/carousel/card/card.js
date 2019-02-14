import React from 'react'
import Image from './image/image'
import Info from './info/info'

const card = (props) => (
  <React.Fragment>
    <div className='card'>
        <Image />
        <Info title={props.title} summary={props.summary} />
    </div>
    <style jsx>{`
        .card {
            display: flex;
            flex-direction: column;
            height: ${props.active ? '400px' : '360px'};
            opacity: ${props.active ? '1' : '0.3'};
            min-width: 42.5%;
            margin-right: 16px;
            background: salmon;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: ${props.active
              ? '0 4px 8px 0 rgba(60, 64, 67, 0.3), 0 4px 12px 4px rgba(60, 64, 67, 0.15)'
              : '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)'};
            transform: translateX(${props.translate}px);
            transition: all 0.6s ease-out;
        }
    `}</style>
  </React.Fragment>
);

export default card;