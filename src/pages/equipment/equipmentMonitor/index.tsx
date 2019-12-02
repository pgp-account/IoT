import { Button, Card, Divider, Form, Input, Select, message, Popconfirm, Table, Tag, Tabs, Switch, Row, Col, Spin } from 'antd';
import React, { Component, Fragment } from 'react';
import { Dispatch, Action } from 'redux';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { WaterWave, Pie, yuan } from './components/Charts';
import { connect } from 'dva';
import moment from "moment";
import { Link } from 'umi';
import styles from './style.less';

const { Option } = Select;
const { TabPane } = Tabs;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'equipmentMonitorList/add'
      | 'equipmentMonitorList/fetch'
      | 'equipmentMonitorList/remove'
      | 'equipmentMonitorList/update'
    >
  >;
  loading: boolean;
  equipmentMonitorList: StateType;
}

interface TableListState {
  modalVisible: boolean;
  updateModalVisible: boolean;
  expandForm: boolean;
  selectedRows: TableListItem[];
  formValues: { [key: string]: string };
  stepFormValues: Partial<TableListItem>;
  isSearch:boolean;
  pagination:Partial<TableListParams>;
  InputValue:string;
}

/* eslint react/no-multi-comp:0 */
@connect(({ equipmentMonitorList, equipmentManageList, loading }) => ({
  equipmentMonitorList,
  equipmentManageList,
  loading: loading.effects['equipmentMonitorList/getDeviceList'],
}))
class EquipmentMonitor extends Component {
  state = {
    modal:null,
    deviceId:'',
    status:null,
    loading: false,
    isStop: 0,
    pageLoading: true,
    cardLoading: true,
    reflectionLoading: false,
    historyLoading: false,
    ishistoryHidden: true,
    isthisHidden:true,
    stopCollectLoading: false,
    thisDataLoading: false,
  }
  componentDidMount() {
    this.setState({
      modal:null,
      deviceId:'',
      status:null,
      isStop: 0,
      pageLoading: true,
    })
    console.log(this.props.location);
    let that = this;
    const { dispatch } = this.props;
    dispatch({
      type: 'equipmentMonitorList/getDeviceList',
    }).then(() => {
      that.setState({
        modal:1,
        pageLoading: false
      })
      // console.log('deviceList',that.props.equipmentManageList.deviceList);
      if(that.props.location.state){
        const deviceId = that.props.location.state.deviceId;
        that.setState({
          deviceId,
        })
        dispatch({
          type: 'equipmentManageList/fetchInfoById',
          payload: {
            "deviceId": deviceId,
          },
        }).then(() => {
          that.setState({
            modal:0,
            pageLoading: false,
            cardLoading: false,
          })
          const {
            equipmentManageList:{ singleInfo }
          } = this.props;
          if(singleInfo.deviceState == 1){
            that.setState({
              status:1,
              loading: true,
              isthisHidden:true,
            })
          }else if(singleInfo.deviceState == 0){
            that.setState({
              status:0,
              loading: false,
            })
          }
          console.log('singleInfo',singleInfo);
        });
      }
    });
  };
  onChange = (value: any) => {
    this.setState({
      cardLoading: true,
    })
    console.log(`selected ${value}`);
    let that = this;
    const { dispatch } = that.props;
    dispatch({
      type: 'equipmentManageList/fetchInfoById',
      payload: {
        "deviceId": value,
      },
    }).then(() => {
      dispatch({
        type: 'equipmentMonitorList/init',
      })
      that.setState({
        modal:0,
        deviceId:value,
        cardLoading: false,
        ishistoryHidden:true,
        isStop:0,
      });
      const {
        equipmentManageList:{ singleInfo }
      } = this.props;
      if(singleInfo.deviceState == 1){
        that.setState({
          status:1,
          loading: true,
          isthisHidden:true,
        })
      }else if(singleInfo.deviceState == 0){
        that.setState({
          status:0,
          loading: false,
        })
      }
    });
  };

  handleReflection = () => {
    this.setState({
      reflectionLoading: true
    })
    let that = this;
    const { dispatch } = that.props;
    let deviceId = that.state.deviceId;
    console.log(deviceId);
    dispatch({
      type: 'equipmentMonitorList/getReflection',
      payload: {
        "deviceId": deviceId,
      },
    }).then(() => {
      // let reflection = this.props.equipmentMonitorList.reflection;
      this.setState({
        reflectionLoading: false,
        // reflectionObj:reflection,
      })
    });
  };

  onSwitchChange = (checked) => {
    console.log(`switch to ${checked}`);
    if(checked){
      this.setState({
        status: 1,
        loading: true,
        isthisHidden:true,
        isStop:0,
      })
      const { dispatch } = this.props;
      dispatch({
        type: 'equipmentMonitorList/initRecentData',
      }).then(() => {
        let deviceId = this.state.deviceId;
        console.log(deviceId);
        let date =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        console.log(date);
        dispatch({
          type: 'equipmentMonitorList/startData',
          payload: {
            "deviceId": deviceId,
            "startTime":date,
          },
        })
      });
    }else{
      this.setState({
        status: 0,
        loading: false,
        isStop:0,
      })
      console.log("222s");
    }
  };

  handlehistory = () => {
    let that = this;
    const { dispatch } = that.props;
    let deviceId = that.state.deviceId;
    console.log(deviceId);
    that.setState({
      historyLoading: true,
    })
    dispatch({
      type: 'equipmentMonitorList/getHistory',
      payload: {
        "deviceId": deviceId,
      },
    }).then(() => {
      that.setState({
        historyLoading: false,
        ishistoryHidden:false,
      })
    });
  };

  handleStopCollect= () => {
    let that = this;
    that.setState({
      loading: false,
      isStop:1,
      stopCollectLoading: true,
      isthisHidden:false,
    })
    const { dispatch } = that.props;
    let deviceId = that.state.deviceId;
    console.log(deviceId);
    dispatch({
      type: 'equipmentMonitorList/stopCollect',
      payload: {
        "deviceId": deviceId,
      },
    }).then(() => {
      that.setState({
        stopCollectLoading: false,
        status:0,
      })
    });
  };
  handleRecentData = () =>{
    let that = this;
    that.setState({
      loading: false,
      isStop:0,
      thisDataLoading: true,
      isthisHidden:false,
    })
    const { dispatch } = that.props;
    let deviceId = that.state.deviceId;
    console.log(deviceId);
    dispatch({
      type: 'equipmentMonitorList/recentData',
      payload: {
        "deviceId": deviceId,
      },
    }).then(() => {
      that.setState({
        thisDataLoading: false,
      })
    });
  }

  render() {
    const {
      equipmentMonitorList: { deviceList, reflection, receptData, collectData, recentData },
      equipmentManageList:{ singleInfo }
    } = this.props;
    console.log('singleInfo', singleInfo);
    console.log('reflection', reflection);
    // let reflectionStr = this.state.reflection;
    let renderOptions = null;
    let fkProductName = '';
    if(deviceList){
      for(let i = 0; i<deviceList.length;i++){
        if(singleInfo.deviceId == deviceList[i].deviceId){
          fkProductName = deviceList[i].productName;
        }
      }
      renderOptions =  deviceList.map((item) => {
        return <Option value={item.deviceId} key={item.deviceId} >{item.deviceName}</Option>
      });
    }
    const {status, isStop, pageLoading, cardLoading, reflectionLoading, historyLoading, ishistoryHidden, isthisHidden, stopCollectLoading, thisDataLoading } = this.state;
    console.log("receptData", receptData);
    // console.log('reflection',reflection);
    let reflectionModal = '';
    if(reflection && reflection.deviceInfo){
      reflectionModal = `
        "deviceInfo": {
          "deviceId": ${reflection.deviceInfo.deviceId},
          "fkProductId": ${reflection.deviceInfo.fkProductId},
          "deviceName": ${reflection.deviceInfo.deviceName},
          "createTime": ${reflection.deviceInfo.createTime},
          "getwayId": ${reflection.deviceInfo.getwayId}
        },
        "productInfo": {
          "productId": ${reflection.productInfo.productId},
          "fkUserId": ${reflection.productInfo.fkUserId},
          "productName": ${reflection.productInfo.productName},
          "productType": ${reflection.productInfo.productType},
          "productManufacturer": ${reflection.productInfo.productManufacturer},
          "productDesc": ${reflection.productInfo.productDesc},
          "createTime": ${reflection.productInfo.createTime},
          "productClassification": ${reflection.productInfo.productClassification}
        },
        "deviceSate": ${reflection.deviceSate},
        "deviceDataVO": {
          "gatewayId": ${reflection.deviceDataVO.gatewayId},
          "metaData": ${reflection.deviceDataVO.metaData},
          "formatData": ${reflection.deviceDataVO.formatData},
          "timeStamp": ${reflection.deviceDataVO.timeStamp}
        }
      `
    }
    console.log('reflectionModal', reflectionModal);
    let activeNum = 0;
    let unactiveNum = 0;
    if(deviceList){
      for(let i=0;i<deviceList.length;i++){
        if(deviceList[i].deviceState == 1){
          activeNum++;
        }
      }
      unactiveNum = deviceList.length - activeNum;
    }
    let rate = activeNum/(activeNum+unactiveNum)*100;
    let percent = parseFloat(rate.toFixed(2));
    console.log('activeNum', activeNum);
    const salesPieData = [
      {
        x: '已激活',
        y: activeNum,
      },
      {
        x: '未激活',
        y: unactiveNum,
      },
    ];
    const mainSearch = (
      <div
        style={{
          textAlign: 'left',
        }}
      >
        {this.state.modal ?
          <div>
            选择设备：
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择设备"
              optionFilterProp="children"
              onChange={this.onChange}
            >
              {renderOptions}
            </Select>
          </div>
          :
          <div>
            <div>
              选择设备：
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder={ singleInfo.deviceName }
                optionFilterProp="children"
                onChange={this.onChange}
              >
                {renderOptions}
              </Select>
            </div>
            <div style={{marginTop:20}}>
              <h2 style={{ display:'inline-block' }}>{ singleInfo.deviceName }</h2>
              {/* <Switch onChange={this.onSwitchChange} /> */}
              <Divider type="vertical" />
              <Tag color="#DCDCDC" style={{color:"#000000"}}>{status?'已激活':'未激活'}</Tag>
            </div>
          </div>
        }
      </div>
    );

    const modalStr =`
      "deviceInfo": {
        "deviceId": "String",
        "fkProductId": "String",
        "deviceName": "String",
        "createTime": Date,
        "getwayId": "String"
      },
      "productInfo": {
        "productId": "String",
        "fkUserId": int,
        "productName": "String",
        "productType": "String",
        "productManufacturer": "String",
        "productDesc": "String",
        "createTime": Date,
        "productClassification": int
      },
      "deviceSate": int,
      "deviceDataVO": {
        "gatewayId": "String",
        "metaData": "String",
        "formatData": "String",
        "timeStamp": Date
      }
      `

    const historyColumns = [
      {
        title: '收集时间',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
      },
      {
        title: '源数据',
        dataIndex: 'metaData',
        key: 'metaData',
      },
      {
        title: '网关',
        dataIndex: 'gatewayId',
        key: 'gatewayId',
      },
      {
        title: '数据',
        dataIndex: 'formatData',
        key: 'formatData',
      },
    ];
    const thisColumns = [
      {
        title: '收集时间',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
      },
      {
        title: '源数据',
        dataIndex: 'metaData',
        key: 'metaData',
      },
      {
        title: '网关',
        dataIndex: 'gatewayId',
        key: 'gatewayId',
      },
      {
        title: '数据',
        dataIndex: 'formatData',
        key: 'formatData',
      },
    ];

    let recentDataSouce = [];
    console.log("recentData", recentData);
    if(recentData){
      for(let i = 0; i<recentData.length; i++){
        let obj = {
          key:i,
          timeStamp: recentData[i].timeStamp,
          metaData: recentData[i].metaData,
          gatewayId: recentData[i].gatewayId,
          formatData:recentData[i].formatData,
          id:recentData[i].id
        }
        recentDataSouce.push(obj);
      }
      console.info(recentDataSouce);
    }


    let thisDataSource = [];
    if(collectData && collectData.deviceDataList){
      for(let i = 0;i< collectData.deviceDataList.length;i++){
        let obj = {
          key:i,
          timeStamp: collectData.deviceDataList[i].timeStamp,
          metaData: collectData.deviceDataList[i].metaData,
          gatewayId: collectData.deviceDataList[i].gatewayId,
          formatData:collectData.deviceDataList[i].formatData,
          id: collectData.deviceDataList[i].id
        }
        thisDataSource.push(obj);
      }
      thisDataSource.reverse();
      console.info('thisDataSourcet', thisDataSource);
    }

    let historyDataSource = [];
    if(receptData && receptData.deviceDataList){
      for(let i = 0;i< receptData.deviceDataList.length;i++){
        let obj = {
          key:i,
          timeStamp: receptData.deviceDataList[i].timeStamp,
          metaData: receptData.deviceDataList[i].metaData,
          gatewayId: receptData.deviceDataList[i].gatewayId,
          formatData:receptData.deviceDataList[i].formatData,
          id:receptData.deviceDataList[i].id
        }
        historyDataSource.push(obj);
      }
      console.info(historyDataSource);
    }
    let historyNum = 0;
    if(receptData){
      historyNum = receptData.count
    }
    return (
      <Spin spinning={pageLoading}>
        <PageHeaderWrapper content={mainSearch}>
          <Card bordered={false}>
            {this.state.modal ?
              <div>
                <div style={{ padding: '30px' }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Card>
                        设备总数
                        <div style={{fontSize:20}}>
                          {deviceList?deviceList.length:null}
                        </div>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <div className={styles.labal} style={{ background:'rgb(33, 146, 217)' }}></div>
                        已激活设备
                        <div style={{fontSize:20}}>
                          {activeNum}
                        </div>
                      </Card>
                    </Col>
                    <Col span={8}>
                      <Card>
                        <div className={styles.labal} style={{ background:'#ccc' }}></div>
                        未激活设备
                        <div style={{fontSize:20}}>
                          {unactiveNum}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
                <div style={{ textAlign: 'center', marginLeft:30, marginTop:70 }}>
                  <div style={{display:'inline-block', width:'35%'}}>
                    <WaterWave height={161} title="设备激活" percent={percent} />
                  </div>
                  <div style={{display:'inline-block', width:'60%', marginRight: 50}}>
                    <Pie
                      hasLegend
                      title="设备总数"
                      subTitle="设备总数"
                      total={() => (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: (salesPieData.reduce((pre, now) => now.y + pre, 0)).toString(),
                          }}
                        />
                      )}
                      padding={60}
                      data={salesPieData}
                      valueFormat={val => <span dangerouslySetInnerHTML={{ __html:(val) }} />}
                      height={181}
                    />
                  </div>
                </div>
              </div>
            :
              <Spin spinning={cardLoading}>
                <div className={styles.tableList}>
                  <div>
                    <div className={styles.standardTable} style={{ marginTop:20}}>
                    <Tabs defaultActiveKey="1" onChange={this.callback} >
                      <TabPane tab="设备信息" key="1">
                      {/* <Table
                        // rowKey={rowKey || 'key'}
                        dataSource={this.equipmentdata}
                        // pagination={paginationProps}
                        onChange={this.handleStandardTableChange}
                        columns={this.columns}
                        loading={loading}
                      /> */}
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
                            <Col span={18} className={styles.datailCol}>{moment(singleInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
                          </Col>
                          <Col span={12} >
                            <Col span={6} className={styles.datailLabel}>设备状态</Col>
                            <Col span={18} className={styles.datailCol}>{status?'已激活':'未激活'}</Col>
                          </Col>
                        </Row>
                      </div>
                      </TabPane>
                      <TabPane tab="采集信息" key="2">
                        <div>
                          {status?
                          <div>
                            <div style={{marginBottom:20}}>
                              <Switch checked={status} onChange={this.onSwitchChange} />
                              已激活
                              {isStop?null:<Button type="primary" onClick={() => this.handleRecentData()} style={{marginLeft:30}}>查看最新数据</Button>}
                              <Button type="primary" onClick={() => this.handleStopCollect()} style={{marginLeft:30}}>停止采集</Button>
                            </div>
                            {isthisHidden?
                              <Spin spinning={this.state.loading} tip="设备正在采集中..." />
                              :
                              <Spin spinning={stopCollectLoading} tip="收集此次总采集数据中...">
                                <Spin spinning={thisDataLoading} tip="收集最新采集数据中...">
                                  <Table dataSource={isStop?thisDataSource:recentDataSouce} columns={thisColumns}/>
                                </Spin>
                              </Spin>
                            }
                          </div>
                          :
                          <div>
                            {isStop?
                            <div>
                              <Switch checked={status} onChange={this.onSwitchChange} />
                              未激活
                              <Button type="primary" disabled style={{marginLeft:30}}>停止采集</Button>
                              <Table dataSource={thisDataSource} columns={thisColumns} style={{marginTop:20}}/>
                            </div>
                              :
                              <div>
                                <Switch checked={status} onChange={this.onSwitchChange} />
                                未激活
                              </div>
                              }

                          </div>
                          }
                        </div>
                      </TabPane>
                      <TabPane tab="历史数据" key="3">
                        <div>
                          <div style={{marginBottom:20}}>
                            本设备历史数据：
                            <Button type="primary" onClick={() => this.handlehistory()}>点击获取</Button>
                          </div>
                          <Spin spinning={historyLoading}>
                            {ishistoryHidden?
                              null
                              :
                              <div>
                                共有{historyNum?historyNum:0}条数据
                                <Table dataSource={historyDataSource} columns={historyColumns} />
                              </div>
                            }

                          </Spin>
                        </div>
                      </TabPane>
                      <TabPane tab="设备影子" key="4">
                        <div>
                          <div style={{marginBottom:20}}>
                            <Button type="primary" onClick={() => this.handleReflection()}>获取最新影子</Button>
                          </div>
                          <Row gutter={16}>
                            <Col span={12}>
                              <Card title="模板">
                                <pre>{modalStr}</pre>
                              </Card>
                            </Col>
                            <Col span={12}>
                              <Card title="最新影子">
                                <Spin spinning={reflectionLoading}>
                                  <pre>{reflectionModal}</pre>
                                </Spin>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      </TabPane>
                    </Tabs>
                    </div>
                  </div>
                </div>
              </Spin>
              }
          </Card>
        </PageHeaderWrapper>
      </Spin>
    );
  }
}

export default EquipmentMonitor;
