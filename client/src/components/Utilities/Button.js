import React from 'react';

class Button extends React.Component {
  initializeState = () => {
    return {
      spanStyles: {},
      count: 0,
    };
  };
  state = this.initializeState();

  /* Debounce Code to call the Ripple removing function */
  callCleanUp = (cleanup, delay) => {
    return function () {
      const bounce = setTimeout(() => {
        cleanup();
      }, delay);

      clearTimeout(bounce);
    };
  };

  showRipple = e => {
    const rippleContainer = e.currentTarget;
    const size = rippleContainer.offsetWidth;
    const pos = rippleContainer.getBoundingClientRect();
    const x = e.pageX - pos.x - size / 2;
    const y = e.pageY - pos.y - size / 2;

    const spanStyles = {
      top: y + 'px',
      left: x + 'px',
      height: size + 'px',
      width: size + 'px',
    };
    const count = this.state.count + 1;
    this.setState({
      spanStyles: { ...this.state.spanStyles, [count]: spanStyles },
      count: count,
    });
  };

  cleanUp = () => {
    const initialState = this.initializeState();
    this.setState({ ...initialState });
  };

  renderRippleSpan = () => {
    const { showRipple = false, spanStyles = {} } = this.state;
    const spanArray = Object.keys(spanStyles);
    if (spanArray && spanArray.length > 0) {
      return spanArray.map((key, index) => {
        return (
          <span
            key={'spanCount_' + index}
            className=""
            style={{ ...spanStyles[key] }}
          ></span>
        );
      });
    } else {
      return null;
    }
  };

  render() {
    const {
      children = null,
      classes = '',
      onClickHandler = null,
      ariaLabel = null,
    } = this.props;
    return (
      <button
        ref="targetElement"
        className={'ripple ' + classes}
        onClick={onClickHandler}
        aria-label={ariaLabel}
      >
        {children}
        <div
          className="rippleContainer"
          onMouseDown={this.showRipple}
          onMouseUp={this.callCleanUp(this.cleanUp, 2000)}
        >
          {this.renderRippleSpan()}
        </div>
      </button>
    );
  }
}

export default Button;
