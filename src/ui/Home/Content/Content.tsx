import React from 'react';
import { Card } from 'antd';
import WidgetInsUI from './comps/WidgetInsUI';
import instanceHelper from '../../../persistence/instanceHelper';
import WidgetConfig from '../../../model/widget/instance/WidgetConfig';

import './Content.scss';

type MyState = {
  widgetConfigs: Array<WidgetConfig>,
};

class Content extends React.Component <any, MyState> {
  // constructor(props: any) {
  //   super(props);
  //   this.state = {
  //     widgets: null,
  //   };
  // }

  componentDidMount() {
    const widgetConfigs = instanceHelper.load();
    this.setState({
      widgetConfigs,
    });
  }

  render() {
    if (!this.state) {
      return <div />;
    }
    const { widgetConfigs } = this.state;
    return (
      <div className="content-panel">
        { widgetConfigs.map((widgetConfig: WidgetConfig) => (
          <WidgetInsUI widgetConfig={widgetConfig} />
        )) }
      </div>
    );
  }
}

export default Content;
