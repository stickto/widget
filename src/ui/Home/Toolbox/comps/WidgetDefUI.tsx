import React from 'react';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import WidgetDef from '../../../../model/widget/def/WidgetDef';
// import WidgetConfig from 'model@/widget/instance/WidgetConfig';
import './WidgetDefUI.scss';

type MyProps = {
  widget: WidgetDef,
  onClick?: any,
};

type MyState = {
  widget: WidgetDef,
};

class WidgetDefUI extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      widget: props.widget,
    };
  }

  onClick() {
    const { onClick } = this.props;
    if (onClick) {
      const { widget } = this.state;
      onClick(widget);
    }
  }

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

export default WidgetDefUI;
