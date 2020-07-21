import React, { FC } from 'react';
import {
  Modal, Form, Input, Select,
} from 'antd';
import Field from '../../../../model/field/Field';
import DropdownField, { Option } from '../../../../model/field/DropdownField';

type MyProps = {
  fields: Array<Field>,
  fieldValues: object,
  visible: boolean,
  onOk: (newFieldValues: object) => any,
  onCancel: () => any,
};

const SettingUI: FC<MyProps> = (props: MyProps) => {
  const {
    fields, fieldValues, visible, onOk, onCancel,
  } = props;
  let newFieldValues = {};
  const onValuesChanged = (props2: any, changedValues: any) => {
    newFieldValues = { ...fieldValues, ...changedValues };
  };
  return (
    visible ? (
      <Modal
        title="Setting"
        visible={visible}
        onOk={() => {
          onOk(newFieldValues);
        }}
        onCancel={onCancel}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onValuesChange={onValuesChanged}
          initialValues={fieldValues}
        >
          { fields.map((field: Field) => (
            <Form.Item
              label={field.label}
              name={field.name}
              key={field.name}
            >
              {field instanceof DropdownField ? (
                <Select>
                  {field.options.map((opt: Option) => (
                    <Select.Option key={opt.id} value={opt.id}>{opt.name}</Select.Option>
                  ))}
                </Select>
              ) : (
                <Input />
              )}
            </Form.Item>
          ))}
        </Form>
      </Modal>
    ) : <></>
  );
};

export default SettingUI;
