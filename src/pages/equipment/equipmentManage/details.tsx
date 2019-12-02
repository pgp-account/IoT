import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Dispatch, Action } from 'redux';
import moment from "moment";
import { Card, Button, Row, Col, message, Spin, } from 'antd';
import EditForm from './components/EditForm';
import styles from './style.less';

@connect(({ equipmentManageList, productManageList, loading }) => ({
  productManageList,
  equipmentManageList,
  loading: loading.effects['equipmentManageList/fetchInfoById'],
}))
class EquipManDetail extends Component{
  state = {
    deviceId:'',
    modalVisible: false,
    detailLoading: true,
  }
  componentDidMount() {
    const deviceId = this.props.location.state.deviceId;
    this.setState({
      deviceId,
      detailLoading: true,
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'equipmentManageList/fetchInfoById',
      payload: {
        "deviceId": deviceId,
      },
    }).then(()=>{
      this.setState({
        detailLoading: false,
      })
    });
  };

  handleEdit = (fields:any) => {
    this.setState({
      detailLoading: true,
    })
    const {
      equipmentManageList:{ singleInfo },
      productManageList: { data },
      dispatch
    } = this.props;
    console.log(fields);
    console.log(data);
    console.log('singleInfo',singleInfo);
    let fkProductId = '';
    if(data){
      for(let i = 0; i<data.length;i++){
        if(fields.fkProduct == data[i].productName){
          fkProductId = data[i].productId;
          console.log('fkProductId',fkProductId);
        }
      }
    }
    this.handleModalVisible();
    dispatch({
      type: 'equipmentManageList/edit',
      payload: {
        "deviceId": singleInfo.deviceId,
        // "fkProductId": fkProductId,
        "fkProductId": singleInfo.fkProductId,
        "deviceName":fields.name,
        "getwayId": fields.getwayId,
        "createTime": singleInfo.createTime,
      },
    }).then(() => {
      dispatch({
        type: 'equipmentManageList/fetchInfoById',
        payload: {
          "deviceId": singleInfo.deviceId,
        },
      });
    }).then(() => {
      this.setState({
        detailLoading: false,
      })
    });
  };

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render(){
    const {
      productManageList: { data },
      equipmentManageList:{ deviceList, singleInfo }
    } = this.props;
    console.log(data);
    const { modalVisible, detailLoading } = this.state;
    const parentMethods = {
      handleEdit: this.handleEdit,
      handleModalVisible: this.handleModalVisible,
    };
    let fkProductName = '';
    if(data){
      for(let i = 0; i<data.length;i++){
        if(singleInfo.fkProductId == data[i].productId){
          fkProductName = data[i].productName;
        }
      }
    }
    let status = '';
    if(singleInfo.deviceState == 1){
      status = "已激活"
    }else if(singleInfo.deviceState == 0){
      status = "未激活"
    }

    let createTime = moment(singleInfo.createTime).format('YYYY-MM-DD HH:mm:ss');
    return(
      <PageHeaderWrapper>
        <Spin spinning={detailLoading}>
          <Card bordered={false} style={{ height:580 }}>
            <div className={styles.datailEdit}>
              <div>
                <div style={{display:'inline-block'}}>
                  <h3>设备名称:&nbsp;&nbsp;&nbsp;&nbsp;{singleInfo.deviceName}</h3>
                </div>
                <Button type="primary" style={{float:"right"}} onClick={() => this.handleModalVisible(true)}>
                  编辑
                </Button>
              </div>
              <div className={styles.datailBody}>
                <Row className={styles.datailRow}>
                  <Col span={12} >
                    <Col span={6} className={styles.datailLabel}>所属产品</Col>
                    <Col span={18} className={styles.datailCol}>{ fkProductName }</Col>
                  </Col>
                  <Col span={12} >
                    <Col span={6} className={styles.datailLabel}>网关id</Col>
                    <Col span={18} className={styles.datailCol}>{singleInfo.getwayId}</Col>
                  </Col>
                </Row>
                <Row className={styles.datailRow}>
                  <Col span={12} >
                    <Col span={6} className={styles.datailLabel}>创建时间</Col>
                    <Col span={18} className={styles.datailCol}>{createTime}</Col>
                  </Col>
                  <Col span={12} >
                    <Col span={6} className={styles.datailLabel}>设备状态</Col>
                    <Col span={18} className={styles.datailCol}>{status}</Col>
                  </Col>
                </Row>
              </div>
            </div>

          </Card>
          <EditForm {...parentMethods} modalVisible={modalVisible} singleInfo={singleInfo} data={data} fkProductName={fkProductName}/>
        </Spin>
      </PageHeaderWrapper>
    )
  }
}

export default EquipManDetail;
