import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { ACTION } from '../../../reducers/config';
import WidgetDefUI from './comps/WidgetDefUI';
import defHelper from '../../../persistence/defHelper';
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
  createInstance: (widget: WidgetDef) => {
    dispatch({
      type: ACTION.CREATE,
      payload: {
        widget,
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
      collapsed ? <div style={{ transform: 'rotate(-90deg) translate(-40px, -10px)' }}>Widgets</div> : (
        <Card
          title="Widgets111"
          bordered={false}
          className="toolbox"
        >
          { widgets.map((widget: WidgetDef) => (
            <WidgetDefUI
              key={widget.id}
              widget={widget}
              onClick={(w: WidgetDef) => { createInstance(w); }}
            />
          )) }
        </Card>
      )
    );
  }
}

export default Toolbox;
