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
import WidgetUICore from '../../../comps/WidgetUICore';

type MyProps = {
  widget: Widget,
  changeLayout?: any,
  changeFieldValues?:any,
  remove?: any,
};

type MyState = {
  widget: Widget,
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

class WidgetUI extends React.Component <MyProps, MyState> {
  container: HTMLElement | null = null;

  constructor(props: MyProps) {
    super(props);
    const { widget } = this.props;
    this.state = {
      widget,
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
    const { def, layout } = widget;
    const style = {
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
    };

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
            <WidgetUICore widget={widget} />
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
