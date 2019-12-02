import { Card, Button, Row, Col, message, Tooltip } from 'antd';
import React, { Component } from 'react';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import moment from "moment";
import { StateType } from '../productManage/model';
import EditForm from '../productManage/components/EditForm';
import styles from './style.less';
import { Link } from 'umi';
// import {  TableListItem, TableListPagination, TableListParams } from './data.d';


@connect(
  ({
    productManageList,
    equipmentManageList,
    loading,
  }: {
    productManageList: StateType;
    equipmentManageList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    productManageList,
    equipmentManageList,
    loading: loading.models.productManageList,
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
    deviceNum:0
  };
  componentDidMount(){
    //console.log(this.props.location)//传递过来的所有参数
    console.log(this.props.location.state.productID)//val值
    const { dispatch } = this.props;
    const productID = this.props.location.state.productID;
    console.log("productID",productID);
    dispatch({
      type: 'productManageList/fetchInfo',
      payload: {
        "productId": productID,
      },
    }).then(() => {
      const {
        productManageList: { singleInfo },
      } = this.props;
      dispatch({
        type: 'equipmentManageList/getDevice',
        payload: {
          "productName": singleInfo.productName,
        },
      });
    });
  }
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   const productID = this.props.location.state.productID;
  //   console.log("productID",productID);
  //   dispatch({
  //     type: 'productManageList/fetchInfo',
  //     payload: {
  //       "productID": productID,
  //     },
  //   });
  // }
  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleEdit = (fields:any) => {
    const { dispatch } = this.props;
    console.log(fields);
    const singleInfo = this.props.productManageList.singleInfo

    dispatch({
      type: 'productManageList/update',
      payload: {
        "createTime": singleInfo.createTime,
        "productName": fields.name,
        "productClassification":0,
        "productDesc": fields.desc,
        "productId": singleInfo.productId,
        "productManufacturer": fields.firm,
        "productType": fields.type,
        "fkUserId": 1,
      },
    }).then(() => {
      dispatch({
        type: 'productManageList/fetchInfo',
        payload: {
          "productId": singleInfo.productId,
        },
      });
    }).then(() => {
      this.handleModalVisible();
    });
  };

  render() {
    const productID = this.props.location.state.productID;
    const {
      productManageList: { singleInfo },
      equipmentManageList:{ deviceList },
      loading,
    } = this.props;
    console.log("singleInfo",singleInfo);

    const { modalVisible, deviceNum } = this.state;

    const parentMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };
    let createTime = moment(singleInfo.createTime).format('YYYY-MM-DD HH:mm:ss');
    let classArray = singleInfo.productClassification;
    let classArrayList = ['智能城市', '智能生活','智能工业', '边缘计算', '智能电力', '智能农业', '智慧建筑', '智能园区'];
    console.log("classArray",classArray);
    // let productClassification = '';
    // if(!!classArray){
    //   productClassification = classArray.join("/");
    // }else{
    //   productClassification = classArray;
    // }

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.datai}>
            <div className={styles.datailTitle}>
              <h2>{singleInfo.produceName}</h2>
            </div>
            <div className={styles.datailEdit}>
              <Button type="primary" style={{float:"right"}} onClick={() => this.handleModalVisible(true)}>
                编辑
              </Button>
            </div>
            <div className={styles.datailDesc} >
              <Col span={12}>ProductKey:&nbsp;&nbsp;<span>{singleInfo.productId}</span></Col>
              <Col span={12}>设备数:&nbsp;&nbsp;<span>{deviceList?deviceList.length:0}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to={
                {
                  pathname:`/equipment/equipmentManage`,
                  state:{productID:singleInfo.productId}
                }
              }>前往管理
                </Link>
              </Col>
            </div>
            <div className={styles.datailBody}>
              <Row className={styles.datailRow}>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>产品名称</Col>
                  <Col span={18} className={styles.datailCol} >{singleInfo.productName}</Col>
                </Col>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>产品类型</Col>
                  <Col span={18} className={styles.datailCol}>{classArrayList[classArray]}</Col>
                </Col>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>创建时间</Col>
                  <Col span={18} className={styles.datailCol}>{createTime}</Col>
                </Col>
              </Row>
              <Row className={styles.datailRow}>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>产品厂商</Col>
                  <Col span={18} className={styles.datailCol}>{singleInfo.productManufacturer}</Col>
                </Col>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>产品型号</Col>
                  <Col span={18} className={styles.datailCol}>{singleInfo.productType}</Col>
                </Col>
                <Col span={8} >
                  <Col span={6} className={styles.datailLabel}>产品描述</Col>
                  <Col span={18} className={styles.detailDes}>
                    <Tooltip title={singleInfo.productDesc} placement="bottomLeft">
                      <span >{singleInfo.productDesc}</span>
                    </Tooltip>
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
        </Card>
        <EditForm {...parentMethods} modalVisible={modalVisible} singleInfo={singleInfo}/>
      </PageHeaderWrapper>
    );
  }
}

export default Basic;
