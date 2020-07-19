import React from 'react';
import { connect } from 'react-redux';
import { Card, Modal, Input, Popconfirm } from 'antd';
import { Rnd } from 'react-rnd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
// import WidgetDef from 'model@/widget/def/WidgetDef';
import { ACTION } from '../../../../reducers/config';
import WidgetConfig from '../../../../model/widget/instance/WidgetConfig';
// import WidgetDef from '../../../../model/widget/def/WidgetDef';
import './WidgetInsUI.scss';
import WidgetLayout from '../../../../model/widget/instance/WidgetLayout';
import Field from '../../../../model/field/Field';
import SettingUI from './SettingUI';

type MyProps = {
  widgetConfig: WidgetConfig,
  changeLayout?: any,
  changeFieldValues?:any,
  remove?: any,
  changeFieldValuesAll?: any,
};

type MyState = {
  widgetConfig: WidgetConfig,
  widgetIns: any,
  showSettingDialog: boolean,
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
  changeFieldValues: (config: WidgetConfig, fieldValues: object) => {
    dispatch({
      type: ACTION.FIELD_VALUE_CHANGED,
      payload: {
        config,
        fieldValues,
      },
    });
  },
  remove: (id: number) => {
    dispatch({
      type: ACTION.REMOVE,
      payload: {
        id,
      },
    });
  },
  changeFieldValuesAll: (fieldValues: object) => {
    dispatch({
      type: ACTION.FIELD_VALUE_CHANGED_ALL,
      payload: {
        fieldValues,
      },
    });
  },
});

const GRID_SIZE = 10;

// make sure every widget aligns with grid
function alighToGrid(layoutObj: any) {
  ['x', 'y', 'width', 'height'].forEach((key: string) => {
    const val:number = layoutObj[key];
    // eslint-disable-next-line no-param-reassign
    layoutObj[key] = Math.round(val / GRID_SIZE) * GRID_SIZE;
  });
}

async function renderIns(container: HTMLElement, widgetIns: any, mounted: boolean) {
  const ele = await widgetIns.render() as HTMLElement;
  container.appendChild(ele);
  if (!mounted && widgetIns.didMount) {
    widgetIns.didMount();
  }
}

class WidgetInsUI extends React.Component <MyProps, MyState> {
  container: HTMLElement | null = null;

  constructor(props: MyProps) {
    super(props);
    const { widgetConfig } = this.props;
    const WidgetClz = props.widgetConfig.widget.clz!;
    const widgetIns = new WidgetClz();
    widgetIns.props = widgetConfig.fieldValues;
    widgetIns.emitEvent = this.emitEvent;
    this.state = {
      widgetConfig: props.widgetConfig,
      widgetIns,
      showSettingDialog: false,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { widgetConfig } = nextProps;
    if (widgetConfig !== prevState.widgetConfig) {
      return {
        widgetConfig,
      };
    }
    return null;
  }

  componentDidMount() {
    const { widgetIns } = this.state;
    renderIns(this.container!, widgetIns, false);
    // const ele = await widgetIns.render() as HTMLElement;
    // this.container!.appendChild(ele);
    // if (widgetIns.didMount) {
    //   widgetIns.didMount();
    // }
  }

  componentDidUpdate() {
    // const { widgetConfig, widgetIns } = this.state;
    // widgetIns.props = widgetConfig.fieldValues;
    // const ele = widgetIns.render() as HTMLElement;
    // const container = this.container!;
    // container.removeChild(container.childNodes[0]);
    // container.appendChild(ele);

    const { widgetConfig, widgetIns } = this.state;
    widgetIns.props = widgetConfig.fieldValues;
    const container = this.container!;
    container.removeChild(container.childNodes[0]);
    renderIns(container, widgetIns, true);
  }

  componentWillUnmount() {
    const { widgetIns } = this.state;
    if (widgetIns.willUnmount) {
      widgetIns.willUnmount();
    }
  }

  emitEvent = (name: string, data: any) => {
    if (name === 'fieldValueChanged') {
      const { changeFieldValuesAll } = this.props;
      changeFieldValuesAll(data);
    } else {
      throw new Error(`unsupported event ${name}`);
    }
  };

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
    alighToGrid(layoutObj);
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
    alighToGrid(layoutObj);
    // console.log(e, ref, position);
    console.log(layoutObj);
    const layout = new WidgetLayout(layoutObj.x, layoutObj.y, layoutObj.width, layoutObj.height);
    const { widgetConfig, changeLayout } = this.props;
    changeLayout(widgetConfig, layout);
  };

  onDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    // eslint-disable-next-line no-alert
    if (confirm('Are you sure to remove this widget?')) {
      const { remove, widgetConfig } = this.props;
      remove(widgetConfig.id);
    }
  };

  onShowSetting = () => {
    this.setState({
      showSettingDialog: true,
    });
  };

  onSettingOk = (newFieldValues: object) => {
    const { widgetConfig, changeFieldValues } = this.props;
    changeFieldValues(widgetConfig, newFieldValues);
    this.setState({
      showSettingDialog: false,
    });
  };

  onSettingCancel = () => {
    this.setState({
      showSettingDialog: false,
    });
  };

  render() {
    const { widgetConfig, showSettingDialog } = this.state;
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
      <>
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
              <DeleteOutlined
                className="def-delete"
                onClick={this.onDelete}
              />
              <SettingOutlined
                className="def-setting"
                onClick={this.onShowSetting}
              />
            </div>
            <div ref={(node) => { this.container = node; }} />
          </Card>
        </Rnd>
        <SettingUI
          fields={widget.fields!}
          fieldValues={widgetConfig.fieldValues}
          visible={showSettingDialog}
          onOk={this.onSettingOk}
          onCancel={this.onSettingCancel}
        />
      </>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(WidgetInsUI);
