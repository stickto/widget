import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
// import instanceHelper from '../../../persistence/instanceHelper';
import Widget from '../../model/widget/instance/Widget';
import WidgetUI from './WidgetUI';
import Dashboard from '../../model/dashboard/Dashboard';

import './Share.scss';

const { Header } = Layout;

type MyProps = {
  active: Dashboard,
  widgets?: Array<Widget>,
};

type MyState = {
  widgets: Array<Widget>,
};

const mapStateToProps = (state: any) => {
  const { active, widgets } = state.dashboard;
  return { active, widgets };
};

const Content: FC<MyProps> = (props: MyProps) => {
  const { active, widgets } = props;
  return (
    <Layout style={{ minHeight: '100vh' }} className="site-layout">
      <Header style={{ backgroundColor: '#ccc' }}>
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

export default connect(mapStateToProps)(Content);
