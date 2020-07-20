import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Select, Button, Modal, message, Input,
} from 'antd';
import {
  EditOutlined, ShareAltOutlined, DeleteOutlined, PlusOutlined,
} from '@ant-design/icons';
import Dashboard from '../../../model/dashboard/Dashboard';
import { ACTION } from '../../../reducers/dashboardcore/DashboardAction';
import uiUtil from '../../../util/uiUtil';
import './DashboardUI.scss';

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
      type: ACTION.DASHBOARD_CREATE,
      payload: {
        name,
      },
    });
  },
  rename: (dashboard: Dashboard, name: string) => {
    dispatch({
      type: ACTION.DASHBOARD_RENAME,
      payload: {
        dashboard,
        name,
      },
    });
  },
  remove: (id: number) => {
    dispatch({
      type: ACTION.DASHBOARD_REMOVE,
      payload: {
        id,
      },
    });
  },
  switchTo: (id: number) => {
    dispatch({
      type: ACTION.DASHBOARD_SWITCH,
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
  const onShare = () => {
    // eslint-disable-next-line no-restricted-globals
    const url = `${location.origin}/#/share?id=${active!.id}`;
    let inputRef: any;
    Modal.confirm({
      title: 'Copy the following url and share it',
      content: <Input defaultValue={url} ref={(ref) => { inputRef = ref; }} />,
      okText: 'Copy',
      onOk: () => {
        inputRef.select();
        document.execCommand('Copy');
        message.success('Share url copied');
      },
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
    <div className="dashboard">
      <span className="name">{active!.name}</span>
      <div className="actions">
        <Button className="action-rename" shape="circle" icon={<EditOutlined />} onClick={onEdit} />
        <Button className="action-share" shape="circle" icon={<ShareAltOutlined />} onClick={onShare} />
        <Button className="action-remove" shape="circle" icon={<DeleteOutlined />} onClick={onRemove} />
      </div>
      <div className="partRight">
        <span>Switch to：</span>
        <Select
          className="action-switch"
          value={active!.id}
          onChange={onSwitch}
        >
          { dashboards?.map((dashboard:Dashboard) => (
            <Select.Option key={dashboard.id} value={dashboard.id}>{dashboard.name}</Select.Option>
          ))}
        </Select>
        <Button className="action-new" type="primary" icon={<PlusOutlined />} onClick={onNew}>New</Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardUI);
