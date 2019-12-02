import { Form, Input, Modal, Cascader  } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from './data.d';

const FormItem = Form.Item;
const { TextArea } = Input;

interface CreateFormProps extends FormComponentProps {
  singleInfo:TableListItem[];
  modalVisible: boolean;
  handleEdit: (fieldsValue: { desc: string }) => void;
  handleModalVisible: () => void;
}

interface Option {
  value: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
}

const EditForm: React.FC<CreateFormProps> = props => {
  const { singleInfo, modalVisible, form, handleEdit, handleModalVisible } = props;
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
          value: '电工照明',
          label: '电工照明',
          children: [
            {
              value: '灯',
              label: '灯',
            },
            {
              value: '插座',
              label: '插座',
            },
            {
              value: '窗帘',
              label: '窗帘',
            },
            {
              value: '推窗器',
              label: '推窗器',
            },
            {
              value: '入墙开关',
              label: '入墙开关',
            },
            {
              value: '场景开关',
              label: '场景开关',
            },
            {
              value: '智能电表',
              label: '智能电表',
            },
            {
              value: '智能水表',
              label: '智能水表',
            },
            {
              value: '场景面板',
              label: '场景面板',
            },
            {
              value: '三相电表',
              label: '三相电表',
            },
            {
              value: '吊扇灯',
              label: '吊扇灯',
            },
            {
              value: '带计量功能插座',
              label: '带计量功能插座',
            },
            {
              value: '灯控开关',
              label: '灯控开关',
            },
            {
              value: '家居调光面板',
              label: '家居调光面板',
            },
          ],
        },
        {
          value: '大家电',
          label: '大家电',
          children: [
            {
              value: '冰箱',
              label: '冰箱',
            },
            {
              value: '电热水器',
              label: '电热水器',
            },
            {
              value: '空调机',
              label: '空调机',
            },
            {
              value: '电视机',
              label: '电视机',
            },
            {
              value: '空气能热水器',
              label: '空气能热水器',
            },
          ],
        },
        {
          value: '厨房电器',
          label: '厨房电器',
          children: [
            {
              value: '油烟机',
              label: '油烟机',
            },
            {
              value: '燃气灶',
              label: '燃气灶',
            },
            {
              value: '洗碗机',
              label: '洗碗机',
            },
            {
              value: '破壁机',
              label: '破壁机',
            },
            {
              value: '微波炉',
              label: '微波炉',
            },
            {
              value: '电饭煲',
              label: '电饭煲',
            },
            {
              value: '调奶器',
              label: '调奶器',
            },
            {
              value: '豆浆机',
              label: '豆浆机',
            },
            {
              value: '电压力锅',
              label: '电压力锅',
            },
            {
              value: '电水壶',
              label: '电水壶',
            },
            {
              value: '养生壶',
              label: '养生壶',
            },
            {
              value: '面包机',
              label: '面包机',
            },
            {
              value: '胶囊咖啡机',
              label: '胶囊咖啡机',
            },

            {
              value: '电磁炉',
              label: '电磁炉',
            },
            {
              value: '烹饪机器人',
              label: '烹饪机器人',
            },
            {
              value: '烤箱',
              label: '烤箱',
            },
            {
              value: '消毒柜',
              label: '消毒柜',
            },
            {
              value: '取餐柜',
              label: '取餐柜',
            },
            {
              value: '嵌入式电蒸箱',
              label: '嵌入式电蒸箱',
            },
            {
              value: '茶吧机',
              label: '茶吧机',
            },
            {
              value: '壁挂炉',
              label: '壁挂炉',
            },
            {
              value: '制冰机',
              label: '制冰机',
            },
            {
              value: '空气炸锅',
              label: '空气炸锅',
            },
            {
              value: '软水机',
              label: '软水机',
            },
            {
              value: '面条机',
              label: '面条机',
            },
            {
              value: '集成灶',
              label: '集成灶',
            },
            {
              value: '冰激凌机',
              label: '冰激凌机',
            },
            {
              value: '食物烘干机',
              label: '食物烘干机',
            },
          ],
        },
        {
          value: '个护健康',
          label: '个护健康',
          children: [
            {
              value: '智能颈部按摩仪',
              label: '智能颈部按摩仪',
            },
            {
              value: '足浴盆',
              label: '足浴盆',
            },
            {
              value: '电热毯',
              label: '电热毯',
            },
            {
              value: '手环',
              label: '手环',
            },
            {
              value: '床',
              label: '床',
            },
            {
              value: '跑步机',
              label: '跑步机',
            },
            {
              value: '心电卡',
              label: '心电卡',
            },
            {
              value: '体温计',
              label: '体温计',
            },
            {
              value: '体脂秤',
              label: '体脂秤',
            },
            {
              value: '洗衣机',
              label: '洗衣机',
            },
            {
              value: '智能按摩椅',
              label: '智能按摩椅',
            },
            {
              value: '电子血压计',
              label: '电子血压计',
            },
            {
              value: '智能拳靶',
              label: '智能拳靶',
            },
            {
              value: '智能洁面仪',
              label: '智能洁面仪',
            },
            {
              value: '毛巾架',
              label: '毛巾架',
            },
            {
              value: '智能枕',
              label: '智能枕',
            },
            {
              value: '艾灸仪',
              label: '艾灸仪',
            },
          ],
        },
        {
          value: '网络设备',
          label: '网络设备',
          children: [
            {
              value: '网关',
              label: '网关',
            },
            {
              value: '网络存储器',
              label: '网络存储器',
            },
            {
              value: '全屋边缘网关',
              label: '全屋边缘网关',
            },
            {
              value: 'VOC感应器',
              label: 'VOC感应器',
            },
            {
              value: '水浸传感器',
              label: '水浸传感器',
            },
            {
              value: '烟感传感器',
              label: '烟感传感器',
            },
            {
              value: '单向电流检测传感器',
              label: '单向电流检测传感器',
            },
            {
              value: '定位终端',
              label: '定位终端',
            },
          ],
        },
        {
          value: '其它',
          label: '其它',
          children: [
            {
              value: '浴缸',
              label: '浴缸',
            },
            {
              value: '浴霸',
              label: '浴霸',
            },
            {
              value: '晾衣杆',
              label: '晾衣杆',
            },
            {
              value: '淋浴房',
              label: '淋浴房',
            },
            {
              value: '干蒸房',
              label: '干蒸房',
            },
            {
              value: '马桶',
              label: '马桶',
            },
            {
              value: '宠物喂食机',
              label: '宠物喂食机',
            },
            {
              value: '电动摩托车',
              label: '电动摩托车',
            },
            {
              value: '计价秤',
              label: '计价秤',
            },
            {
              value: '音箱',
              label: '音箱',
            },
            {
              value: '电子标签',
              label: '电子标签',
            },
            {
              value: '中控屏',
              label: '中控屏',
            },
            {
              value: '红外遥控器',
              label: '红外遥控器',
            },
            {
              value: '手表',
              label: '手表',
            },
            {
              value: '茶台',
              label: '茶台',
            },
            {
              value: '智能窗帘',
              label: '智能窗帘',
            },
            {
              value: '鱼缸',
              label: '鱼缸',
            },
            {
              value: '传感器信号采集器',
              label: '传感器信号采集器',
            },
            {
              value: 'HVAC外接控制器',
              label: 'HVAC外接控制器',
            },
            {
              value: '背景音乐控制器',
              label: '背景音乐控制器',
            },
            {
              value: '自动门',
              label: '自动门',
            },
            {
              value: '灭蚊灯',
              label: '灭蚊灯',
            },
            {
              value: '割草机',
              label: '割草机',
            },
            {
              value: '继电器',
              label: '继电器',
            },
            {
              value: '干衣机',
              label: '干衣机',
            },
            {
              value: '智能燃气表',
              label: '智能燃气表',
            },
            {
              value: '智能猫砂盆',
              label: '智能猫砂盆',
            },
          ],
        },
      ],
    },
    {
      value: '智能工业',
      label: '智能工业',
      children: [
        {
          value: '纺织业',
          label: '纺织业',
        },
        {
          value: '医药制造业',
          label: '医药制造业',
        },
        {
          value: '塑料制品业',
          label: '塑料制品业',
        },
        {
          value: '金属制品业',
          label: '金属制品业',
        },
        {
          value: '化学纤维制造业',
          label: '化学纤维制造业',
        },
        {
          value: '电力仪表',
          label: '电力仪表',
        },
        {
          value: '图像采集设备',
          label: '图像采集设备',
        },
        {
          value: '气表制造',
          label: '气表制造',
          children: [
            {
              value: '空压机',
              label: '空压机',
            },
            {
              value: '喷涂处理',
              label: '喷涂处理',
            },
            {
              value: '涂胶机',
              label: '涂胶机',
            },
            {
              value: '冲压机',
              label: '冲压机',
            },
          ],
        },
        {
          value: '铂电阻温度传感器',
          label: '铂电阻温度传感器',
        },
      ]
    },
    {
      value: '边缘计算',
      label: '边缘计算',
      children: [
        {
          value: '边缘网关',
          label: '边缘网关',
        },
        {
          value: '其他设备',
          label: '其他设备',
        },
        {
          value: '摄像头边缘节点',
          label: '摄像头边缘节点',
        },
        {
          value: '视频内容分析',
          label: '视频内容分析',
        },
      ]
    },
    {
      value: '商业共享',
      label: '商业共享',
      children: [
        {
          value: '零售设备',
          label: '零售设备',
          children: [
            {
              value: '果汁机',
              label: '果汁机',
            },
            {
              value: '净水机',
              label: '净水机',
            },
            {
              value: '冰淇淋机',
              label: '冰淇淋机',
            },
            {
              value: '咖啡机',
              label: '咖啡机',
            },
            {
              value: '售货柜',
              label: '售货柜',
            },
            {
              value: '抓娃娃机',
              label: '抓娃娃机',
            },
          ],
        },
        {
          value: '共享租赁服务',
          label: '共享租赁服务',
          children: [
            {
              value: '按摩椅',
              label: '按摩椅',
            },
            {
              value: '共享洗衣机',
              label: '共享洗衣机',
            },
            {
              value: '充电桩',
              label: '充电桩',
            },
          ],
        },
      ]
    },
    {
      value: '智能模板',
      label: '智能模板',
      children: [
        {
          value: 'Wifi功能模板',
          label: 'Wifi功能模板',
        },
        {
          value: 'Zigbee功能模板',
          label: 'Zigbee功能模板',
        },
      ]
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      console.log("fieldsValue",fieldsValue);
      handleEdit(fieldsValue);
    });
  };
  const onChange = (value:string[]) => {
    console.log(value);
  };

  // const classArrayList = ['智能城市', '智能生活','智能工业', '边缘计算', '智能电力', '智能农业', '智慧建筑', '智能园区'];

  // console.log("singleInfo.productClassification",singleInfo.productClassification);

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
          initialValue:singleInfo.productName,
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
          // initialValue:singleInfo.productClassification,
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
