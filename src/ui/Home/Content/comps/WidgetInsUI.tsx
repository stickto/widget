import React from 'react';
import { Card } from 'antd';
import { Rnd } from 'react-rnd';
import { SettingOutlined } from '@ant-design/icons';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import WidgetConfig from '../../../../model/widget/instance/WidgetConfig';
// import WidgetDef from '../../../../model/widget/def/WidgetDef';
import './WidgetInsUI.scss';
import WidgetLayout from '../../../../model/widget/instance/WidgetLayout';

type MyProps = {
  widgetConfig: WidgetConfig,
};

type MyState = {
  widgetConfig: WidgetConfig,
  widgetIns: any,
};

const GRID_SIZE = 10;

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

  // componentWillMount() {
  //   const { widgetIns } = this.state;
  //   if (widgetIns.willMount) {
  //     widgetIns.willMount();
  //   }
  // }

  componentDidMount() {
    const { widgetIns } = this.state;
    const ele = widgetIns.render() as HTMLElement;
    this.container!.appendChild(ele);
    if (widgetIns.didMount) {
      widgetIns.didMount();
    }
  }

  componentWillUnmount() {
    const { widgetIns } = this.state;
    if (widgetIns.willUnmount) {
      widgetIns.willUnmount();
    }
  }

  calcLayout = (layout: WidgetLayout) => {
    function convert(num: number) {
      return num * GRID_SIZE;
    }
    return {
      x: convert(layout.x),
      y: convert(layout.y),
      width: convert(layout.width),
      height: convert(layout.height),
    };
  };

  render() {
    const { widgetConfig } = this.state;
    // const { widget } = widgetConfig;
    const { widget } = widgetConfig;
    // console.log(widgetIns.render());
    const style = this.calcLayout(widgetConfig.layout);

    const styleRnd = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 1px #ddd',
      background: '#f0f0f0',
    };

    return (
      <Rnd
        style={styleRnd}
        default={style}
        resizeGrid={[GRID_SIZE, GRID_SIZE]}
        dragGrid={[GRID_SIZE, GRID_SIZE]}
        // style={{ position: 'absolute', overflow: 'hidden', ...style }}
      >
        <Card
          // hoverable
          size="small"
          className="widget-ins-ui"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
          }}
          // title={widget.name}
          // extra={<a href="#">More</a>}
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
      </Rnd>
    );
  }
}

export default WidgetInsUI;
