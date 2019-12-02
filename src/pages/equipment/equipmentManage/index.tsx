import { Card, Select, Button, Input, Table, Divider,message, Popconfirm, Spin } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Link } from 'umi';
import { connect } from 'dva';
import moment from "moment";
import CreateForm from './components/CreateForm';
import styles from './style.less';
// import { TableListItem, TableListPagination, TableListParams } from './data.d';

const { Option } = Select;


// interface TableListProps extends FormComponentProps {
//   dispatch: Dispatch<
//     Action<
//       | 'equipmentManageList/add'
//       | 'equipmentManageList/fetch'
//       | 'equipmentManageList/remove'
//       | 'equipmentManageList/update'
//     >
//   >;
//   loading: boolean;
//   equipmentManageList: StateType;
// }

// interface TableListState {
//   modalVisible: boolean;
//   updateModalVisible: boolean;
//   expandForm: boolean;
//   selectedRows: TableListItem[];
//   formValues: { [key: string]: string };
//   stepFormValues: Partial<TableListItem>;
// }

@connect(({ productManageList, equipmentManageList, loading }) => ({
  productManageList,
  equipmentManageList,
  loading: loading.effects['productManageList/fetch'],
}))
class EquipmentManage extends Component {
  state = {
    productName:'',
    isMount:null,
    modalVisible: false,
    isSearch:false,
    InputValue:"",
    listLoading: true,
  }

  componentDidMount() {
    console.log(this.props.location);
    let that = this;
    const { dispatch } = this.props;
    dispatch({
      type: 'productManageList/fetch',
    }).then(() => {
      const {productManageList: { data }} = this.props;
      if(this.props.location.state && data){
        const productID = this.props.location.state.productID;
        let productName = '';
        for(let i = 0; i<data.length; i++){
          if(productID == data[i].productId){
            productName = data[i].productName
          }
        }
        this.onChange(productName);
        that.setState({
          productName,
        })
      }else{
        this.onChange("全部产品");
        that.setState({
          productName:"全部产品",
        })
      }
    });
  }
  onChange = (value: any) => {
    this.setState({
      listLoading: true,
    });
    console.log(`selected ${value}`);
    this.setState({
      productName: value,
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'equipmentManageList/getDevice',
      payload: {
        "productName": value,
      },
    }).then(() => {
      this.setState({
        listLoading: false,
      })
    });
  }
  //添加设备
  handleAdd = (fields) => {
    const {
      productManageList: { data },
      dispatch,
    } = this.props;
    console.log(fields);
    let fkProductId = '';
    if(data){
      for(let i = 0; i<data.length;i++){
        if(fields.fkProduct == data[i].productName){
          fkProductId = data[i].productId;
          break;
        }
      }
    }
    let date =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    console.log(date);
    this.handleModalVisible();
    this.setState({
      listLoading: true,
    })
    dispatch({
      type: 'equipmentManageList/add',
      payload: {
        "fkProductId": fkProductId,
        "deviceName": fields.name,
        "getwayId": fields.getwayId,
        "createTime": date,
      },
    }).then(() => {
      this.onChange("全部产品");
    });
  };
  //弹窗是否显示
  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  onSearch = (val: any) => {
    console.log('search:', val);
  }
  //获取input输入
  handleGetInputValue = (event: { target: { value: string; }; }) => {
    console.log(event.target.value);
    this.setState({
      InputValue : event.target.value,
    });
    if(event.target.value === ""){
      this.setState({
        isSearch : false,
      });
    }
  };

  //点击搜索
  handleSearch = () => {
    const { InputValue } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isSearch : true,
      listLoading: true,
    });
    dispatch({
      type: 'equipmentManageList/search',
      payload: {
        "keyWord": InputValue,
      },
    }).then(() => {
      this.setState({
        listLoading: false,
      })
    });
  };

  //删除设备
  deleteDevice = (index: number) =>{
    this.setState({
      listLoading: true,
    });
    const {
      equipmentManageList: { deviceList },
      dispatch
    } = this.props;
    console.log(deviceList[index]);
    let deviceId = deviceList[index].deviceId;
    console.log('deviceId',deviceId);
    dispatch({
      type: 'equipmentManageList/remove',
      payload: {
        "deviceId": deviceId,
      },
    }).then(() => {
      this.onChange("全部产品");
    });
  }


  render() {
    const {
      productManageList: { data },
      equipmentManageList:{ deviceList, searchData }
    } = this.props;
    const { modalVisible, isSearch, productName, listLoading } = this.state;
    // message.info(productName);
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    console.log(data);
    let renderOptions = null;
    if(deviceList){
      renderOptions =  data.map((item) => {
        // return <Option value={item.deviceId} key={item.deviceId} >{item.deviceName}</Option>
        return <Option value={item.productName} key={item.productId} >{item.productName}</Option>
      });
    }

    const columns = [
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '设备所属产品',
        dataIndex: 'product',
        key: 'product',
      },
      {
        title: '节点类型',
        dataIndex: 'nodeType',
        key: 'nodeType',
      },
      {
        title: '网关ID',
        dataIndex: 'getwayId',
        key: 'getwayId',
      },
      {
        title: '创建时间',
        dataIndex: 'creatTime',
        key: 'creatTime',
      },
      {
        title: '操作',
        key: 'action',
        render: (text: any, record: any, index:any) => (
          <span >
            <Link to={
              {
                pathname:`/equipment/equipmentManage/details`,
                state:{deviceId:record.deviceId}
              }
            }>
              查看
            </Link>
            <Divider type="vertical" />
            <Popconfirm
              title="确定要删除此设备吗?"
              onConfirm={() => this.deleteDevice(index)}
              okText="确认"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>

            <Divider type="vertical" />
            <Link to={
              {
                pathname:`/equipment/equipmentMonitor`,
                state:{deviceId:record.deviceId}
              }
            }>
              监控
            </Link>
          </span>
        ),
      },
    ];

    //按产品名查询结果
    let dataRow = [];
    if(deviceList){
      for(let i = 0; i < deviceList.length; i++){
        let product = '';
        for(let j = 0; j < data.length; j++){
          if(deviceList[i] && data[j].productId == deviceList[i].fkProductId){
            product = data[j].productName;
          }
        }
        let createTime = moment(deviceList[i].createTime).format('YYYY-MM-DD HH:mm:ss');
        dataRow.push({
          key:i,
          name:deviceList[i].deviceName,
          product:product,
          nodeType: '设备',
          getwayId:deviceList[i].getwayId,
          creatTime:createTime,
          deviceId:deviceList[i].deviceId
        })
      }
    }

    //模糊查询结果
    let dataSearchArray = [];
    if(searchData && deviceList){
      for(let i = 0;i< searchData.length;i++){
        let product = '';
        for(let j = 0; j < data.length; j++){
          if(deviceList[i] && data[j].productId == deviceList[i].fkProductId){
            product = data[j].productName;
          }
        }
        let createTime = moment(searchData[i].createTime).format('YYYY-MM-DD HH:mm:ss');
        let obj = {
          key:i,
          name:searchData[i].deviceName,
          product:product,
          nodeType: '设备',
          getwayId:deviceList[i].getwayId,
          creatTime:createTime,
          deviceId:deviceList[i].deviceId
        }
        dataSearchArray.push(obj);
      }
      console.info(dataSearchArray);
    }

    const mainSearch = (
      <div
        style={{
          textAlign: 'left',
        }}
      >
        产品名称：
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="选择产品"
          defaultValue="全部产品"
          value = {productName? productName :null}
          optionFilterProp="children"
          onChange={this.onChange}
        >
          <Option value="全部产品">全部产品</Option>
          {renderOptions}
        </Select>
      </div>
    );

    return (
      <PageHeaderWrapper content={mainSearch}>
        <Card bordered={false}>
          <div>
            <div style={{ marginTop:20}}>
              <Input style={{width:230,marginBottom:15,marginRight:10,marginLeft:10}} placeholder="请输入设备名称查询" allowClear onChange={this.handleGetInputValue} />
              <Button type="primary" onClick={() => this.handleSearch()}>
                搜索
              </Button>
              <Button type="primary" style={{float:"right"}} onClick={() => this.handleModalVisible(true)}>
                添加设备
              </Button>
            </div>
            <div className={styles.standardTable}>
              <Spin spinning={listLoading}>
                {isSearch?
                  <Table columns={columns} dataSource={dataSearchArray} />
                  :<Table columns={columns} dataSource={dataRow} />
                }
              </Spin>
            </div>
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} option={renderOptions}/>
      </PageHeaderWrapper>
    );
  }
}

export default EquipmentManage;
