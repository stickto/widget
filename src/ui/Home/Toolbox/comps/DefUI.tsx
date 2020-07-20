import React from 'react';
import Def from '../../../../model/widget/def/Def';
import './DefUI.scss';

type MyProps = {
  widget: Def,
  onClick?: any,
};

type MyState = {
  widget: Def,
};

class DefUI extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      widget: props.widget,
    };
  }

  onClick = () => {
    const { onClick } = this.props;
    if (onClick) {
      const { widget } = this.state;
      onClick(widget);
    }
  };

  render() {
    const { widget } = this.state;
    // const { onClick } = this.props;
    return (
      <div
        className="widget-def-ui"
        title={widget.name}
        onClick={this.onClick}
      >
        <img className="def-icon" src={widget.icon} alt={widget.name} />
        <div className="def-name">{widget.name}</div>
      </div>
    );
  }
}

export default DefUI;
