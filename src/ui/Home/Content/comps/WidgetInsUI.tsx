import React from 'react';
import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
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
      <Card
        hoverable
        size="small"
        className="widget-ins-ui"
        // title={widget.name}
        // extra={<a href="#">More</a>}
        style={{ width: 300 }}
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
      >
        <div className="head">
          <img className="def-icon" src={widget.icon} alt={widget.name} />
          <div className="def-name">{widget.name}</div>
          <SettingOutlined className="def-setting" />
        </div>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}

export default WidgetDefUI;
