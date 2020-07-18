import React from 'react';
import { Card } from 'antd';
import WidgetDefUI from './comps/WidgetDefUI';
import defHelper from '../../../persistence/defHelper';
import WidgetDef from '../../../model/widget/def/WidgetDef';

import './Toolbox.scss';

type MyState = {
  widgets: Array<WidgetDef>,
};

class Toolbox extends React.Component <any, MyState> {
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
    return (
      <Card title="Widgets" bordered={false} className="toolbox">
        { widgets.map((widget: WidgetDef) => (
          <WidgetDefUI widget={widget} />
        )) }
      </Card>
    );
  }
}

export default Toolbox;
