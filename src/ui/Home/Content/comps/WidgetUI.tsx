import React from 'react';
import { connect } from 'react-redux';
import { Card, Modal, message } from 'antd';
import { Rnd } from 'react-rnd';
import { SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { ACTION } from '../../../../reducers/dashboardcore/WidgetAction';
import Widget from '../../../../model/widget/instance/Widget';
import './WidgetUI.scss';
import WidgetLayout from '../../../../model/widget/instance/WidgetLayout';
import SettingUI from './SettingUI';

type MyProps = {
  widget: Widget,
  changeLayout?: any,
  changeFieldValues?:any,
  remove?: any,
  changeFieldValuesAll?: any,
};

type MyState = {
  widget: Widget,
  widgetIns: any,
  showSettingDialog: boolean,
};

const mapDispatchToProps = (dispatch: any) => ({
  changeLayout: (widget: Widget, layout: WidgetLayout) => {
    dispatch({
      type: ACTION.WIDGET_LAYOUT_CHANGED,
      payload: {
        widget,
        layout,
      },
    });
  },
  changeFieldValues: (widget: Widget, fieldValues: object) => {
    dispatch({
      type: ACTION.WIDGET_FIELD_VALUE_CHANGED,
      payload: {
        widget,
        fieldValues,
      },
    });
  },
  remove: (id: number) => {
    dispatch({
      type: ACTION.WIDGET_REMOVE,
      payload: {
        id,
      },
    });
  },
  changeFieldValuesAll: (fieldValues: object) => {
    dispatch({
      type: ACTION.WIDGET_FIELD_VALUE_CHANGED_ALL,
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

class WidgetUI extends React.Component <MyProps, MyState> {
  container: HTMLElement | null = null;

  constructor(props: MyProps) {
    super(props);
    const { widget } = this.props;
    const WidgetClz = widget.def.clz!;
    const widgetIns = new WidgetClz();
    widgetIns.props = widget.fieldValues;
    widgetIns.emitEvent = this.emitEvent;
    this.state = {
      widget,
      widgetIns,
      showSettingDialog: false,
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const { widget } = nextProps;
    if (widget !== prevState.widget) {
      return {
        widget,
      };
    }
    return null;
  }

  componentDidMount() {
    const { widgetIns } = this.state;
    renderIns(this.container!, widgetIns, false);
  }

  componentDidUpdate() {
    const { widget, widgetIns } = this.state;
    widgetIns.props = widget.fieldValues;
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
      const { projName } = data;
      if (projName) {
        message.success(`Project switched to ${projName} globally.`);
      }
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
    const { widget, changeLayout } = this.props;
    const layoutObj = {
      x: d.x,
      y: d.y,
      width: widget.layout.width,
      height: widget.layout.height,
    };
    alighToGrid(layoutObj);
    const layout = new WidgetLayout(layoutObj.x, layoutObj.y, layoutObj.width, layoutObj.height);
    changeLayout(widget, layout);
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
    const { widget, changeLayout } = this.props;
    changeLayout(widget, layout);
  };

  onDelete = () => {
    Modal.confirm({
      title: 'Are you sure to remove this widget?',
      icon: <DeleteOutlined />,
      onOk: () => {
        const { remove, widget } = this.props;
        remove(widget.id);
        message.success('Widget removed');
      },
    });
  };

  onShowSetting = () => {
    this.setState({
      showSettingDialog: true,
    });
  };

  onSettingOk = (newFieldValues: object) => {
    const { widget, changeFieldValues } = this.props;
    changeFieldValues(widget, newFieldValues);
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
    const { widget, showSettingDialog } = this.state;
    const { def } = widget;
    // console.log(widgetIns.render());
    const style = this.calcLayout(widget.layout);

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
              <img className="def-icon" src={def.icon} alt={def.name} />
              <div className="def-name">{def.name}</div>
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
          fields={def.fields!}
          fieldValues={widget.fieldValues}
          visible={showSettingDialog}
          onOk={this.onSettingOk}
          onCancel={this.onSettingCancel}
        />
      </>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(WidgetUI);
