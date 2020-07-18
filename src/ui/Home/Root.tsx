import React from 'react';
import { Layout, Button } from 'antd';
import Toolbox from './Toolbox';
import ContentPanel from './Content';

const { Header, Content, Footer, Sider } = Layout;

class Root extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed: boolean) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width={340} collapsible collapsedWidth={40} collapsed={collapsed} onCollapse={this.onCollapse}>
          <Toolbox collapsed={collapsed} />
        </Sider>
        <Layout className="site-layout">
          <Button type="primary"> Hello, World! 111222333 </Button>
          <ContentPanel />
        </Layout>
      </Layout>
    );
  }
}

export default Root;
