import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { ACTION } from '../../../reducers/dashboardcore/WidgetAction';
import DefUI from './comps/DefUI';
import Def from '../../../model/widget/def/Def';

import './Toolbox.scss';

type MyProps = {
  widgets?: Array<Def>,
  collapsed: boolean,
  createInstance?: any,
};

type MyState = {
  widgets: Array<Def>,
};

const mapStateToProps = (state: any) => {
  const { widgets } = state.def;
  return { widgets };
};

const mapDispatchToProps = (dispatch: any) => ({
  createInstance: (def: Def) => {
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
      widgets: widgets as Array<Def>,
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
          { widgets.map((widget: Def) => (
            <DefUI
              key={widget.id}
              widget={widget}
              onClick={(def: Def) => { createInstance(def); }}
            />
          )) }
        </Card>
      )
    );
  }
}

export default Toolbox;
