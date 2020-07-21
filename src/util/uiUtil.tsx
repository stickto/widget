import React from 'react';
import {
  Modal, Input,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

function confirm(
  title: string,
  value: string,
  onOk: (newName: string) => any,
  onCancel: any | undefined = undefined,
) {
  let newValue = value;
  const onChange = (e: any) => {
    newValue = e.target.value;
  };
  Modal.confirm({
    title,
    icon: <EditOutlined />,
    content: <Input defaultValue={value} onChange={onChange} />,
    onOk() {
      onOk(newValue);
    },
    onCancel() {
      if (onCancel) {
        onCancel();
      }
    },
  });
}

export default {
  confirm,
};
