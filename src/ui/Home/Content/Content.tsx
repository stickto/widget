import React, { FC } from 'react';
import { connect } from 'react-redux';
import WidgetUI from './comps/WidgetUI';
// import instanceHelper from '../../../persistence/instanceHelper';
import Widget from '../../../model/widget/instance/Widget';

import './Content.scss';

type MyProps = {
  widgets?: Array<Widget>,
};

type MyState = {
  widgets: Array<Widget>,
};

const mapStateToProps = (state: any) => {
  const { widgets } = state.dashboard;
  return { widgets };
};

const Content: FC<MyProps> = (props: MyProps) => {
  const { widgets } = props;
  return (
    <div className="content-panel">
      { widgets!.map((widget: Widget) => (
        <WidgetUI key={widget.id} widget={widget} />
      )) }
    </div>
  );
};

export default connect(mapStateToProps)(Content);
