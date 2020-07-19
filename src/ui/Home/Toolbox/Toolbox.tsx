import React from 'react';
import { Card } from 'antd';
import WidgetDefUI from './comps/WidgetDefUI';
import defHelper from '../../../persistence/defHelper';
import WidgetDef from '../../../model/widget/def/WidgetDef';

import './Toolbox.scss';

type MyProps = {
  collapsed: boolean,
};

type MyState = {
  widgets: Array<WidgetDef>,
};

class Toolbox extends React.Component <MyProps, MyState> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     widgets: null,
  //   };
  // }

  componentDidMount() {
    const widgets = defHelper.load();
    this.setState({
      widgets,
    });
  }

  render() {
    if (!this.state) {
      return <div />;
    }
    const { widgets } = this.state;
    const { collapsed } = this.props;
    return (
      collapsed ? <div style={{ transform: 'rotate(-90deg) translate(-40px, -10px)' }}>Widgets</div> : (
        <Card title="Widgets111" bordered={false} className="toolbox">
          { widgets.map((widget: WidgetDef) => (
            <WidgetDefUI key={widget.id} widget={widget} />
          )) }
        </Card>
      )
    );
  }
}

export default Toolbox;
