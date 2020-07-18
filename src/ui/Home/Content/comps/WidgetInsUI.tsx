import React from 'react';
import { Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import WidgetConfig from '../../../../model/widget/instance/WidgetConfig';
// import WidgetDef from '../../../../model/widget/def/WidgetDef';
import './WidgetInsUI.scss';

type MyProps = {
  widgetConfig: WidgetConfig,
};

type MyState = {
  widgetConfig: WidgetConfig,
  widgetIns: any,
};

class WidgetInsUI extends React.Component <MyProps, MyState> {
  container: HTMLElement | null = null;

  constructor(props: MyProps) {
    super(props);
    const { widgetConfig } = this.props;
    const WidgetClz = props.widgetConfig.widget.clz!;
    const widgetIns = new WidgetClz(widgetConfig.fieldValues);
    this.state = {
      widgetConfig: props.widgetConfig,
      widgetIns,
    };
  }

  componentDidMount() {
    const { widgetIns } = this.state;
    const ele = widgetIns.render() as HTMLElement;
    this.container!.appendChild(ele);
  }

  render() {
    const { widgetConfig } = this.state;
    // const { widget } = widgetConfig;
    const { widget } = widgetConfig;
    // console.log(widgetIns.render());
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
        <div ref={(node) => { this.container = node; }} />
      </Card>
    );
  }
}

export default WidgetInsUI;
