import React from 'react';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import WidgetDef from '../../../../model/widget/def/WidgetDef';
// import WidgetConfig from 'model@/widget/instance/WidgetConfig';

type MyProps = {
  widget: WidgetDef,
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

  render() {
    const { widget } = this.state;
    return (
      <div>
        <img src={widget.icon} alt={widget.name} />
        <div>{widget.name}</div>
      </div>
    );
  }
}

export default WidgetDefUI;
