import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { ACTION } from '../../../reducers/dashboardcore/WidgetAction';
import WidgetDefUI from './comps/WidgetDefUI';
import WidgetDef from '../../../model/widget/def/WidgetDef';

import './Toolbox.scss';

type MyProps = {
  widgets?: Array<WidgetDef>,
  collapsed: boolean,
  createInstance?: any,
};

type MyState = {
  widgets: Array<WidgetDef>,
};

const mapStateToProps = (state: any) => {
  const { widgets } = state.def;
  return { widgets };
};

const mapDispatchToProps = (dispatch: any) => ({
  createInstance: (def: WidgetDef) => {
    dispatch({
      type: ACTION.WIDGET_CREATE,
      payload: {
        def,
      },
    });
  },
});

@(connect(mapStateToProps, mapDispatchToProps) as any)
class Toolbox extends React.Component <MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    const { widgets } = this.props;
    // const w2 = widgets as Array<WidgetDef>;
    this.state = {
      widgets: widgets as Array<WidgetDef>,
    };
  }

  // componentDidMount() {
  //   const widgets = defHelper.load();
  //   this.setState({
  //     widgets,
  //   });
  // }

  render() {
    if (!this.state) {
      return <div />;
    }
    const { widgets } = this.state;
    const { collapsed, createInstance } = this.props;
    return (
      collapsed ? <div style={{ transform: 'rotate(-90deg) translate(-40px, -0px)' }}>Widgets</div> : (
        <Card
          title="Widgets"
          bordered={false}
          className="toolbox"
        >
          { widgets.map((widget: WidgetDef) => (
            <WidgetDefUI
              key={widget.id}
              widget={widget}
              onClick={(def: WidgetDef) => { createInstance(def); }}
            />
          )) }
        </Card>
      )
    );
  }
}

export default Toolbox;
