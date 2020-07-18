import React from 'react';
import { Card } from 'antd';
import WidgetInsUI from './comps/WidgetInsUI';
import defHelper from '../../../persistence/defHelper';
import WidgetDef from '../../../model/widget/def/WidgetDef';

import './Content.scss';

type MyState = {
  widgets: Array<WidgetDef>,
};

class Content extends React.Component <any, MyState> {
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
      <div className="content-panel">
        { widgets.map((widget: WidgetDef) => (
          <WidgetInsUI widget={widget} />
        )) }
      </div>
    );
  }
}

export default Content;
