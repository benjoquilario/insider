import React from 'react';
import Ripples from 'react-ripples';

const Button = ({ classes, ariaLabel, onClickHandler, children }) => {
  return (
    <div style={{ width: '100%' }}>
      <Ripples color="#ffffff80" className="w-full rounded-full">
        <button
          onClick={onClickHandler}
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </button>
      </Ripples>
    </div>
  );
};

export default Button;
