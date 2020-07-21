// Left Panel of widget definitions
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { createWidget } from '../../../reducers/dashboardcore/WidgetAction';
import DefUI from './comps/DefUI';
import Def from '../../../model/widget/def/Def';

import './Toolbox.scss';

type MyProps = {
  defs?: Array<Def>,
  collapsed: boolean,
  createInstance?: any,
};

const mapStateToProps = (state: any) => {
  const { defs } = state.def;
  return { defs };
};

const mapDispatchToProps = (dispatch: any) => ({
  createInstance: (def: Def) => {
    dispatch(createWidget(def));
  },
});

const Toolbox: FC<MyProps> = (props: MyProps) => {
  const { defs, collapsed, createInstance } = props;
  if (collapsed) {
    return (
      <div style={{ transform: 'rotate(-90deg) translate(-40px, -0px)' }}>Widgets</div>
    );
  }
  return (
    <Card
      title="Widgets"
      bordered={false}
      className="toolbox"
    >
      { defs!.map((def: Def) => (
        <DefUI
          key={def.id}
          def={def}
          onClick={createInstance}
        />
      )) }
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);
