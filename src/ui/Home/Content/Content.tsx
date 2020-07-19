import React, { FC } from 'react';
import { connect } from 'react-redux';
import WidgetInsUI from './comps/WidgetInsUI';
import instanceHelper from '../../../persistence/instanceHelper';
import WidgetConfig from '../../../model/widget/instance/WidgetConfig';

import './Content.scss';

type MyProps = {
  configs?: Array<WidgetConfig>,
};

type MyState = {
  configs: Array<WidgetConfig>,
};

const mapStateToProps = (state: any) => {
  const { configs } = state.config;
  return { configs };
};

const Content: FC<MyProps> = (props: MyProps) => {
  const { configs } = props;
  return (
    <div className="content-panel">
      { configs!.map((widgetConfig: WidgetConfig) => (
        <WidgetInsUI key={widgetConfig.id} widgetConfig={widgetConfig} />
      )) }
    </div>
  );
};

export default connect(mapStateToProps)(Content);
