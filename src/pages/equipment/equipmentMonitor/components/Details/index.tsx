import { Card, Button, Row, Col, Divider, Tabs, Table  } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from "moment";
// import { StateType } from '../productManage/model';
import EditForm from '../EditForm';
import styles from './style.less';
// import {  TableListItem, TableListPagination, TableListParams } from './data.d';

const { TabPane } = Tabs;

@connect(
  ({
    equipmentMonitorList,
    loading,
  }: {
    equipmentMonitorList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    equipmentMonitorList,
    loading: loading.models.equipmentMonitorList,
  }),
)
// interface BasicProps {
//   loading: boolean;
//   dispatch: Dispatch<any>;
//   profileAndbasic: BasicProfileDataType;
// }
// interface BasicState {
//   visible: boolean;
// }
class Basic extends Component<any, any> {
  state = {
    modalVisible: false,
    interval:{}
  };
  componentDidMount(){
    //console.log(this.props.location)//传递过来的所有参数
    // console.log(this.props.location.state.productID)//val值
    const { dispatch } = this.props;
    // const productID = this.props.location.state.productID;
    // console.log("productID",productID);
    // dispatch({
    //   type: 'equipmentMonitorList/fetchInfo',
    //   payload: {
    //     "productID": productID,
    //   },
    // });
  }
  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleEdit = (fields:any) => {
    const { dispatch } = this.props;
    console.log(fields);
    const singleInfo = this.props.equipmentMonitorList.singleInfo

    // dispatch({
    //   type: 'equipmentMonitorList/update',
    //   payload: {
    //     "createTime": singleInfo.createTime,
    //     "produceName": fields.name,
    //     "productClassification":fields.category,
    //     "productDesc": fields.desc,
    //     "productID": singleInfo.productID,
    //     "productManufacturer": fields.firm,
    //     "productType": fields.type
    //   },
    // }).then(() => {
    //   dispatch({
    //     type: 'equipmentMonitorList/fetchInfo',
    //     payload: {
    //       "productID": singleInfo.productID,
    //     },
    //   });
    // });
    // message.success('修改成功');
    // this.handleModalVisible();
  };

  handleReceptionDate = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'equipmentMonitorList/fetch',
    });
  };

  handlesetInterval = () => {
    const {
      equipmentMonitorList: { receptData },
    } = this.props;
    // const interval = setInterval(
    //   this.handleReceptionDate,
    //   2000
    // );
    const interval = setInterval(
      this.handleReceptionDate,
      2000
    );
    this.setState({
      interval,
    });

  };

  stopsetInterval = () => {
    const {interval} = this.state;
    clearInterval(interval);
  }

  callback = (key:any)=> {
    console.log(key);
  }

  columns = [
    {
      title: '源数据',
      dataIndex: 'sourceData',
      key: 'sourceData',
    },
    {
      title: '历史采集总条数',
      dataIndex: 'historyNum',
      key: 'historyNum',
    },
    {
      title: '本次采集数据',
      children: [
        {
          title: '温度',
          dataIndex: 'temperature',
          key: 'temperature',
        },
        {
          title: '湿度',
          dataIndex: 'humidity',
          key: 'humidity',
        },
      ],
    },
  ];

  render() {
    const {
      equipmentMonitorList: { receptData },
      loading,
    } = this.props;
    console.log("receptData",receptData);
    let data: any[] | never[] | undefined = [];
    if(receptData != undefined){
      for(let i = 0;i<receptData.length;i++){
        let obj = {
          key:i,
          sourceData:receptData[i][0],
          historyNum:100,
          temperature:receptData[i][1],
          humidity:receptData[i][2],
        }
        data.push(obj);
      }
    }

    console.log("data",data);
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.datai}>
            <div className={styles.datailTitle}>
              {/* <h2>{singleInfo.produceName}</h2> */}
              <h2>温湿度传感器</h2>
            </div>
            {/* <div className={styles.datailEdit}>
              <Button type="primary" style={{float:"right"}} onClick={() => this.handleModalVisible(true)}>
                编辑
              </Button>
            </div> */}
            <div className={styles.datailDesc} >
              <Col span={12}>产品:&nbsp;&nbsp;<span>空调</span><a href="#">&nbsp;&nbsp;&nbsp;&nbsp;查看</a></Col>
              <Col span={12}>ProductKey:&nbsp;&nbsp;<span>a1rghxpjalY</span></Col>
            </div>

            <div className={styles.datailBody}>
              <div>
                <div className={styles.datailBtn}>
                  <Button type="primary" style={{marginRight:10}} onClick={() => this.handlesetInterval()}>
                    接收数据
                  </Button>
                  <Button onClick={() => this.stopsetInterval()}>
                    停止接收
                  </Button>
                </div>
                <div className={styles.standardTable}>
                  <Table columns={this.columns} dataSource={data} bordered />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Basic;
