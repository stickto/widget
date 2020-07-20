import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Select, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Dashboard from '../../../model/dashboard/Dashboard';
import { ACTION } from '../../../reducers/dashboard';

type MyProps = {
  dashboards?: Array<Dashboard>,
  active?: Dashboard,
};

const mapStateToProps = (state: any) => {
  const { dashboards, active } = state.dashboard;
  return { dashboards, active };
};

const mapDispatchToProps = (dispatch: any) => ({
  create: (name: string) => {
    dispatch({
      type: ACTION.CREATE,
      payload: {
        name,
      },
    });
  },
  rename: (dashboard: Dashboard) => {
    dispatch({
      type: ACTION.RENAME,
      payload: {
        dashboard,
      },
    });
  },
  remove: (id: number) => {
    dispatch({
      type: ACTION.REMOVE,
      payload: {
        id,
      },
    });
  },
  swithTo: (id: number) => {
    dispatch({
      type: ACTION.SWITCH,
      payload: {
        id,
      },
    });
  },
});

const DashboardUI: FC<MyProps> = (props: MyProps) => {
  const { dashboards, active } = props;
  return (
    <>
      <span>{active!.name}</span>
      <EditOutlined />
      <DeleteOutlined />
      <span>Switch to：</span>
      <Select
        defaultValue={active!.id}
      >
        { dashboards?.map((dashboard:Dashboard) => (
          <Select.Option value={dashboard.id}>{dashboard.name}</Select.Option>
        ))}
      </Select>
      <Button type="primary" icon={<PlusOutlined />}>New</Button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI);
