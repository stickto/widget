import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Select, Button, Modal, message,
} from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Dashboard from '../../../model/dashboard/Dashboard';
import { ACTION } from '../../../reducers/dashboard';
import uiUtil from '../../../util/uiUtil';

type MyProps = {
  dashboards?: Array<Dashboard>,
  active?: Dashboard,
  create?: any,
  rename?: any,
  remove?: any,
  switchTo?: any,
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
  rename: (dashboard: Dashboard, name: string) => {
    dispatch({
      type: ACTION.RENAME,
      payload: {
        dashboard,
        name,
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
  switchTo: (id: number) => {
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
  const onEdit = () => {
    uiUtil.confirm('Please input new name', active!.name, (newName:string) => {
      if (newName.trim().length === 0) {
        message.error('Please input name');
        return;
      }
      const { rename } = props;
      rename(active, newName);
      message.success('Dashboard renamed');
    });
  };
  const onNew = () => {
    uiUtil.confirm('Please input dashboard name', '', (name:string) => {
      if (name.trim().length === 0) {
        message.error('Please input name');
        return;
      }
      const { create } = props;
      create(name);
      message.success('Dashboard added');
    });
  };
  const onRemove = () => {
    if (dashboards!.length < 2) {
      message.error('Could NOT remove last dashboard');
      return;
    }
    Modal.confirm({
      title: 'Are you sure to remove this dashboard?',
      icon: <DeleteOutlined />,
      onOk: () => {
        const { remove } = props;
        remove(active!.id);
        message.success('Dashboard removed');
      },
    });
  };
  const onSwitch = (id: number) => {
    const { switchTo } = props;
    switchTo(id);
    message.success('Dashboard switched');
  };

  return (
    <>
      <span>{active!.name}</span>
      <EditOutlined onClick={onEdit} />
      <DeleteOutlined onClick={onRemove} />
      <span>Switch to：</span>
      <Select
        value={active!.id}
        onChange={onSwitch}
      >
        { dashboards?.map((dashboard:Dashboard) => (
          <Select.Option key={dashboard.id} value={dashboard.id}>{dashboard.name}</Select.Option>
        ))}
      </Select>
      <Button type="primary" icon={<PlusOutlined />} onClick={onNew}>New</Button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI);
