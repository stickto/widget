import React, { FC } from 'react';
import { connect } from 'react-redux';
import WidgetInsUI from './comps/WidgetInsUI';
// import instanceHelper from '../../../persistence/instanceHelper';
import WidgetConfig from '../../../model/widget/instance/WidgetConfig';

import './Content.scss';

type MyProps = {
  widgets?: Array<WidgetConfig>,
};

type MyState = {
  widgets: Array<WidgetConfig>,
};

const mapStateToProps = (state: any) => {
  const { widgets } = state.dashboard;
  return { widgets };
};

const Content: FC<MyProps> = (props: MyProps) => {
  const { widgets } = props;
  return (
    <div className="content-panel">
      { widgets!.map((widget: WidgetConfig) => (
        <WidgetInsUI key={widget.id} widgetConfig={widget} />
      )) }
    </div>
  );
};

export default connect(mapStateToProps)(Content);
