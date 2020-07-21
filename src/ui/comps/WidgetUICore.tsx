import React from 'react';
import { connect } from 'react-redux';
import { Card, message } from 'antd';
import { changeWidgetFieldValueAll } from '../../reducers/dashboardcore/WidgetAction';
import Widget from '../../model/widget/instance/Widget';
import './WidgetUICore.scss';
// import WidgetLayout from '../../model/widget/instance/WidgetLayout';

type MyProps = {
  widget: Widget,
  changeFieldValuesAll?: any,
};

type MyState = {
  widget: Widget,
  widgetIns: any,
};

const mapDispatchToProps = (dispatch: any) => ({
  changeFieldValuesAll: (fieldValues: object) => {
    dispatch(changeWidgetFieldValueAll(fieldValues));
  },
});

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

  render() {
    // const { widget } = this.state;
    // const { layout } = widget;
    // const style = {
    //   x: layout.x,
    //   y: layout.y,
    //   width: layout.width,
    //   height: layout.height,
    // };

    return (
      <>
        <Card
          size="small"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
          }}
        >
          <div ref={(node) => { this.container = node; }} />
        </Card>
      </>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(WidgetUI);
