import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Layout, Result, Spin } from 'antd';
// import instanceHelper from '../../../persistence/instanceHelper';
import Widget from '../../model/widget/instance/Widget';
import WidgetUI from './WidgetUI';
import Dashboard from '../../model/dashboard/Dashboard';
import { ACTION, initDashboard } from '../../reducers/dashboardcore/DashboardAction';

import './Share.scss';

const { Header } = Layout;

type MyProps = {
  init: (id: number) => any,
  inited: boolean,
  active: Dashboard,
  widgets?: Array<Widget>,
};

type MyState = {
  widgets: Array<Widget>,
};

const mapStateToProps = (state: any) => {
  const { active, widgets, inited } = state.dashboard;
  return { active, widgets, inited };
};

const mapDispatchToProps = (dispatch: any) => ({
  init: (id: number) => {
    dispatch(initDashboard(id));
  },
});

const Content: FC<MyProps> = (props: MyProps) => {
  const {
    active, widgets, init, inited,
  } = props;
  if (!inited) { // trigger init
    // eslint-disable-next-line no-restricted-globals
    const m = /id=(\d+)/.exec(location.href); // this regex is not enough, but ok for demo
    if (m) {
      const id = parseInt(m[1], 10);
      init(id);
    } else {
      return (
        <Result
          status="error"
          title="Dashboard ID Not Found"
          subTitle="Sorry, id is not found in url"
        />
      );
    }
    return (<Spin tip="Loading" />);
  }
  if (!active) { // can't find dashboard for the id;
    return (
      <Result
        status="error"
        title="Dashboard Not Found"
        subTitle="Sorry, the dashboard is missing, please make sure id is correct"
      />
    );
  }
  return (
    <Layout style={{ minHeight: '100vh' }} className="site-layout">
      <Header style={{ backgroundColor: '#ccc', fontSize: '28px', color: 'white' }}>
        {active.name}
      </Header>
      <Layout style={{ position: 'relative' }}>
        <div className="share">
          { widgets!.map((widget: Widget) => (
            <WidgetUI key={widget.id} widget={widget} />
          )) }
        </div>
      </Layout>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
