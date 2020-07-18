import React from 'react';
import { Card } from 'antd';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import WidgetDef from '../../../../model/widget/def/WidgetDef';
// import WidgetConfig from 'model@/widget/instance/WidgetConfig';
import './WidgetInsUI.scss';

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
      <Card size="small" className="widget-ins-ui" title={widget.name} extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

export default WidgetDefUI;
