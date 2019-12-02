import { Form, Input, Modal, Cascader, Select  } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;

interface EditFormProps extends FormComponentProps {
  option:any;
  modalVisible: boolean;
  handleEdit: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}
const EditForm: React.FC<EditFormProps> = props => {
  const { modalVisible, form, handleEdit, handleModalVisible, singleInfo, data, fkProductName } = props;
  // const options =[];
  const renderOptions =  data.map((item) => {
    return <Option value={item.productName} key={item.productId}>{item.productName}</Option>
  });

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log(fieldsValue);
      handleEdit(fieldsValue);
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
      title="编辑设备信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="设备名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请设备产品名称！' }],
          initialValue:singleInfo.deviceName,
        })(<Input placeholder="请输入设备名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="网关ID">
        {form.getFieldDecorator('getwayId', {
          rules: [{ required: true, message: '请输入网关ID！' }],
          initialValue:singleInfo.getwayId,
        })(<Input placeholder="请输入网关ID" />)}
      </FormItem>
      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属分类">
        {form.getFieldDecorator('fkProduct', {
          rules: [{ required: true, message: '请选择所属产品！' }],
          initialValue:fkProductName,
        })(
        // <Cascader
        //   options={options}
        //   expandTrigger="hover"
        //   onChange={onChange}
        //   placeholder="请选择所属分类"
        //   style={{ width:100+'%' }}
        // />
        <Select style={{ width:100+'%' }} onChange={handleChange} placeholder="请选择所属分类">
          {renderOptions}
        </Select>)}
      </FormItem> */}

    </Modal>
  );
};

export default Form.create<EditFormProps>()(EditForm);
