import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { Rnd } from 'react-rnd';
import { SettingOutlined } from '@ant-design/icons';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import { ACTION } from '../../../../reducers/config';
import WidgetConfig from '../../../../model/widget/instance/WidgetConfig';
// import WidgetDef from '../../../../model/widget/def/WidgetDef';
import './WidgetInsUI.scss';
import WidgetLayout from '../../../../model/widget/instance/WidgetLayout';

type MyProps = {
  widgetConfig: WidgetConfig,
  changeLayout?: any,
};

type MyState = {
  widgetConfig: WidgetConfig,
  widgetIns: any,
};

const mapDispatchToProps = (dispatch: any) => ({
  changeLayout: (config: WidgetConfig, layout: WidgetLayout) => {
    dispatch({
      type: ACTION.LAYOUT_CHANGED,
      payload: {
        config,
        layout,
      },
    });
  },
});

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
    const {
      x, y, width, height,
    } = layout;
    return {
      x, y, width, height,
    };
  };

  onDragStop = (e:any, d: any) => {
    const { widgetConfig, changeLayout } = this.props;
    const layoutObj = {
      x: d.x,
      y: d.y,
      width: widgetConfig.layout.width,
      height: widgetConfig.layout.height,
    };
    const layout = new WidgetLayout(layoutObj.x, layoutObj.y, layoutObj.width, layoutObj.height);
    changeLayout(widgetConfig, layout);
  };

  onResizeStop = (e: any, direction: any, ref: any, delta: any, position: any) => {
    const layoutObj = {
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    };
    // console.log(e, ref, position);
    console.log(layoutObj);
    const layout = new WidgetLayout(layoutObj.x, layoutObj.y, layoutObj.width, layoutObj.height);
    const { widgetConfig, changeLayout } = this.props;
    changeLayout(widgetConfig, layout);
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
        onResizeStop={this.onResizeStop}
        onDragStop={this.onDragStop}
      >
        <Card
          size="small"
          className="widget-ins-ui"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
          }}
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

export default connect(undefined, mapDispatchToProps)(WidgetInsUI);
