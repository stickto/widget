import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';
import { ACTION, initDashboard } from '../../reducers/dashboardcore/DashboardAction';
import Toolbox from './Toolbox';
import Dashboard from './Dashboard';
import ContentPanel from './Content';

const { Header, Sider } = Layout;

type MyProps = {
  init: () => any,
  inited: boolean,
};

const mapStateToProps = (state: any) => {
  const { inited } = state.dashboard;
  return { inited };
};

const mapDispatchToProps = (dispatch: any) => ({
  init: () => {
    dispatch(initDashboard());
  },
});

const Root: FC<MyProps> = (props: MyProps) => {
  const { init, inited } = props;
  const [collapsed, setCollapse] = useState(false);
  if (!inited) { // trigger init
    init();
  }
  return (
    <Layout>
      <Layout style={{ minHeight: '100vh' }}>
        {!inited ? <Spin tip="Loading..." /> : (
          <>
            <Sider
              theme="light"
              width={340}
              collapsible
              collapsedWidth={40}
              collapsed={collapsed}
              onCollapse={setCollapse}
            >
              <Toolbox collapsed={collapsed} />
            </Sider>
            <Layout className="site-layout">
              <Header style={{ backgroundColor: '#ccc' }}>
                <Dashboard />
              </Header>
              <ContentPanel />
            </Layout>
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
