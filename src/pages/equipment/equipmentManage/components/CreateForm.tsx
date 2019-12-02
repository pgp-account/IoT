import { Form, Input, Modal, Cascader, Select  } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

interface CreateFormProps extends FormComponentProps {
  option:any;
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}
const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, handleAdd, handleModalVisible, option } = props;
  // const options =[];

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log(fieldsValue);
      handleAdd(fieldsValue);
    });
  };
  const onChange = (value:string[]) => {
    console.log(value);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <Modal
      destroyOnClose
      title="新增设备"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入设备名称！' }],
        })(<Input placeholder="请输入设备名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="网关ID">
        {form.getFieldDecorator('getwayId', {
          rules: [{ required: true, message: '请输入网关ID！' }],
        })(<Input placeholder="请输入网关ID" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属产品">
        {form.getFieldDecorator('fkProduct', {
          rules: [{ required: true, message: '请选择所属产品！' }],
        })(
        // <Cascader
        //   options={options}
        //   expandTrigger="hover"
        //   onChange={onChange}
        //   placeholder="请选择所属分类"
        //   style={{ width:100+'%' }}
        // />
        <Select style={{ width:100+'%' }} onChange={handleChange} placeholder="请选择所属产品">
          {option}
        </Select>)}
      </FormItem>

    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);
