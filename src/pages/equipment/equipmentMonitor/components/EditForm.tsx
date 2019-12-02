import { Form, Input, Modal, Cascader  } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from './data.d';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps extends FormComponentProps {
  singleInfo:TableListItem[];
  modalVisible: boolean;
  handleAdd: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}

interface Option {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}

const EditForm: React.FC<CreateFormProps> = props => {
  const { singleInfo, modalVisible, form, handleAdd, handleModalVisible } = props;
  const options = [
    {
      value: '智能城市',
      label: '智能城市',
      children: [
        {
          value: '公共服务',
          label: '公共服务',
          children: [
            {
              value: '路灯照明',
              label: '路灯照明',
            },
            {
              value: '车辆定位卡',
              label: '车辆定位卡',
            },
            {
              value: '水浸检测',
              label: '水浸检测',
            },
            {
              value: '井盖移位检测',
              label: '井盖移位检测',
            },
            {
              value: '垃圾满溢检测',
              label: '垃圾满溢检测',
            },
            {
              value: '地磁检测器',
              label: '地磁检测器',
            },
            {
              value: '红外体征探测器',
              label: '红外体征探测器',
            },
            {
              value: '红外对射探测器',
              label: '红外对射探测器',
            },
            {
              value: '无人机',
              label: '无人机',
            },
            {
              value: '门磁',
              label: '门磁',
            },
            {
              value: '智能广播',
              label: '智能广播',
            },
            {
              value: '广播主机',
              label: '广播主机',
            },
            {
              value: '流量计',
              label: '流量计',
            },

            {
              value: '远程监测终端',
              label: '远程监测终端',
            },
            {
              value: '游乐设备信号采集器',
              label: '游乐设备信号采集器',
            },

            {
              value: '通用网关',
              label: '通用网关',
            },
            {
              value: '人脸识别门禁',
              label: '人脸识别门禁',
            },

            {
              value: '电梯集采盒',
              label: '电梯集采盒',
            },
            {
              value: '电弧灭弧',
              label: '电弧灭弧',
            },
            {
              value: '电梯门体状态探测传感器',
              label: '电梯门体状态探测传感器',
            },
            {
              value: '电梯平层位置探测传感器',
              label: '电梯平层位置探测传感器',
            },
            {
              value: '电梯人体探测传感器',
              label: '电梯人体探测传感器',
            },
            {
              value: '电梯加速度探测传感器',
              label: '电梯加速度探测传感器',
            },
            {
              value: '倾角传感器',
              label: '倾角传感器',
            },
            {
              value: '无人货柜',
              label: '无人货柜',
            },
            {
              value: '微波人体探测器',
              label: '微波人体探测器',
            },
            {
              value: '地锁',
              label: '地锁',
            },

            {
              value: '网络摄像机',
              label: '网络摄像机',
            },
            {
              value: '手动求救报警',
              label: '手动求救报警',
            },
            {
              value: '非机动车充电桩',
              label: '非机动车充电桩',
            },
            {
              value: '定位器',
              label: '定位器',
            },
            {
              value: '位移监控器',
              label: '位移监控器',
            },
            {
              value: '断电监控',
              label: '断电监控',
            },
            {
              value: '用电安全探测器',
              label: '用电安全探测器',
            },
          ],
        },
        {
          value: '能源管理',
          label: '能源管理',
          children: [
            {
              value: '电表',
              label: '电表',
            },
            {
              value: '水表',
              label: '水表',
            },
            {
              value: '燃气表',
              label: '燃气表',
            },
          ],
        },
        {
          value: '环境感知',
          label: '环境感知',
          children: [
            {
              value: '空调',
              label: '空调',
            },
            {
              value: '环境监测设备',
              label: '环境监测设备',
            },
            {
              value: '活动检测设备',
              label: '活动检测设备',
            },
            {
              value: '大气监测设备',
              label: '大气监测设备',
            },
            {
              value: '酸碱度监测',
              label: '酸碱度监测',
            },
            {
              value: '溶解氧监测',
              label: '溶解氧监测',
            },
            {
              value: '温湿度检测',
              label: '温湿度检测',
            },
            {
              value: '水质检测终端',
              label: '水质检测终端',
            },
            {
              value: '液位计',
              label: '液位计',
            },
            {
              value: '环境噪音监测',
              label: '环境噪音监测',
            },
            {
              value: '扬尘监测',
              label: '扬尘监测',
            },
            {
              value: '精准时空摄像头',
              label: '精准时空摄像头',
            },
            {
              value: '易涝点监测设备',
              label: '易涝点监测设备',
            },
            {
              value: '窨井液位监测设备',
              label: '窨井液位监测设备',
            },
            {
              value: '雨量计',
              label: '雨量计',
            },
            {
              value: '流速液位监测设备',
              label: '流速液位监测设备',
            },
          ],
        },
        {
          value: '消防安全',
          label: '消防安全',
          children: [
            {
              value: '安防监测网关',
              label: '安防监测网关',
            },
            {
              value: '烟雾探测器',
              label: '烟雾探测器',
            },
            {
              value: '声光报警设备',
              label: '声光报警设备',
            },
            {
              value: '井盖',
              label: '井盖',
            },
            {
              value: '激光探测仪',
              label: '激光探测仪',
            },
            {
              value: '燃气泄漏报警器',
              label: '燃气泄漏报警器',
            },
            {
              value: '消防手报',
              label: '消防手报',
            },
            {
              value: '水压传感器',
              label: '水压传感器',
            },
            {
              value: '智能消防栓',
              label: '智能消防栓',
            },
            {
              value: '防火门',
              label: '防火门',
            },
            {
              value: '应急照明灯',
              label: '应急照明灯',
            },
            {
              value: '智能消防水炮',
              label: '智能消防水炮',
            },
            {
              value: '智能消防炮',
              label: '智能消防炮',
            },
            {
              value: '正压送风机',
              label: '正压送风机',
            },
            {
              value: '水流指示器',
              label: '水流指示器',
            },
            {
              value: '电动阀',
              label: '电动阀',
            },
            {
              value: '电动排烟窗',
              label: '电动排烟窗',
            },
            {
              value: '应急广播',
              label: '应急广播',
            },
            {
              value: '防火阀',
              label: '防火阀',
            },
          ],
        },
        {
          value: '种植养殖',
          label: '种植养殖',
          children: [
            {
              value: '喷灌智能终端',
              label: '喷灌智能终端',
            },
            {
              value: '农业监控设备',
              label: '农业监控设备',
            },
            {
              value: '灌溉系统',
              label: '灌溉系统',
            },
          ],
        },
        {
          value: '智能楼宇',
          label: '智能楼宇',
          children: [
            {
              value: '蓝牙秤',
              label: '蓝牙秤',
            },
            {
              value: '灯光设备',
              label: '灯光设备',
            },
            {
              value: '饮水机',
              label: '饮水机',
            },
            {
              value: '考勤机',
              label: '考勤机',
            },
            {
              value: '电子纸桌签',
              label: '电子纸桌签',
            },
          ],
        },
      ],
    },
    {
      value: '智能生活',
      label: '智能生活',
      children: [
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '环境电器',
          label: '环境电器',
          children: [
            {
              value: '风扇',
              label: '风扇',
            },
            {
              value: '加湿器',
              label: '加湿器',
            },
            {
              value: '取暖器',
              label: '取暖器',
            },
            {
              value: '空气盒子',
              label: '空气盒子',
            },
            {
              value: '除湿器',
              label: '除湿器',
            },
            {
              value: '新风机',
              label: '新风机',
            },
            {
              value: '地暖',
              label: '地暖',
            },
            {
              value: '净水器',
              label: '净水器',
            },
            {
              value: '空气净化器',
              label: '空气净化器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
        {
          value: '家居安防',
          label: '家居安防',
          children: [
            {
              value: '燃气报警器',
              label: '燃气报警器',
            },
            {
              value: '水浸报警器',
              label: '水浸报警器',
            },
            {
              value: '红外探测器',
              label: '红外探测器',
            },
            {
              value: '门磁传感器',
              label: '门磁传感器',
            },
            {
              value: '烟雾报警器',
              label: '烟雾报警器',
            },
            {
              value: '用水监控器',
              label: '用水监控器',
            },
            {
              value: '智能门锁',
              label: '智能门锁',
            },
            {
              value: '光照度传感器',
              label: '光照度传感器',
            },
            {
              value: '声光报警器',
              label: '声光报警器',
            },
          ],
        },
      ],
    },
  ];
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

  console.log("singleInfo.productClassification",singleInfo.productClassification);

  return (
    <Modal
      destroyOnClose
      title="编辑产品信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入产品名称！' }],
          initialValue:singleInfo.produceName,
        })(<Input placeholder="请输入产品名称" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品厂商">
        {form.getFieldDecorator('firm', {
          rules: [{ required: true, message: '请输入产品厂商！' }],
          initialValue:singleInfo.productManufacturer,
        })(<Input placeholder="请输入产品厂商" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品型号">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请输入产品型号！' }],
          initialValue:singleInfo.productType,
        })(<Input placeholder="请输入产品型号" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所属分类">
        {form.getFieldDecorator('category', {
          rules: [{ required: true, message: '请选择所属分类！' }],
          initialValue:singleInfo.productClassification,
        })(<Cascader
          options={options}
          expandTrigger="hover"
          onChange={onChange}
          placeholder="请选择所属分类"
          style={{ width:100+'%' }}
        />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="产品描述">
        {form.getFieldDecorator('desc', {
          rules: [{ required: true, message: '请输入产品描述！' }],
          initialValue:singleInfo.productDesc,
        })(<TextArea rows={4} placeholder="请输入产品描述"/>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(EditForm);
