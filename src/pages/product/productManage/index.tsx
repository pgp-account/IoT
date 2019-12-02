import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Table
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import { StateType } from './model';
import CreateForm from './components/CreateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { TableListItem, TableListPagination, TableListParams } from './data.d';

import styles from './style.less';
import { Link } from 'umi';
// import {hashHistory} from 'React-router';

const FormItem = Form.Item;
const { Search } = Input;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<
    Action<
      | 'productManageList/add'
      | 'productManageList/fetch'
      | 'productManageList/remove'
      | 'productManageList/update'
    >
  >;
  loading: boolean;
  productManageList: StateType;
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
@connect(
  ({
    productManageList,
    loading,
  }: {
    productManageList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    productManageList,
    loading: loading.models.productManageList,
  }),
)
class TableList extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    isSearch:false,
    InputValue:""
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '产品名称',
      dataIndex: 'produceName',
      key:'produceName'
    },
    {
      title: 'ProductKey',
      dataIndex: 'productKey',
      key:'productKey',
    },
    {
      title: '产品厂商',
      dataIndex: 'productManufacturer',
      key:'productManufacturer'
    },
    {
      title: '产品型号',
      dataIndex: 'productType',
      key:'productType'
    },
    {
      title: '操作',
      render: (text, record, index) => (
        <Fragment>
          <Link to={
            {
              pathname:`/product/details`,
              state:{productID:record.productKey}
            }
          }>
            查看
          </Link>

          <Divider type="vertical" />
          <Link to={
            {
              pathname:`/equipment/equipmentManage`,
              state:{productID:record.productKey}
            }
          }>
            设备管理
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除此产品吗？删除后该产品下所有设备均会被删除"
            onConfirm={() => this.confirm(index, record)}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>

        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'productManageList/fetch',
    });
  }

  confirm = (index: number, record:any) =>{
    console.log(index, record);
    const {
      productManageList: { data }
    } = this.props;
    console.log(data[index]);
    let product = record.productKey;
    console.log('product',product);
    const { dispatch } = this.props;
    dispatch({
      type: 'productManageList/remove',
      payload: {
        "productId": product,
      },
    }).then(() => {
      this.handleRefresh();
    });
  }

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleRefresh = () =>{
    const { dispatch } = this.props;
    dispatch({
      type: 'productManageList/fetch',
    });
  };

  handleAdd = (fields) => {
    const { dispatch } = this.props;
    console.log(fields);
    let date = new Date();
    console.log(date);
    let str = "";
    let range = 11;
    let charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i<range; i++){
      var index = Math.round(Math.random() * (charStr.length-1));
      str += charStr.substring(index,index+1);
    }
    console.log('str',str);
    let category = fields.category.join(',');
    dispatch({
      type: 'productManageList/add',
      payload: {
        "createTime": date,
        "productName": fields.name,
        "productClassification":"0",
        "productDesc": fields.desc,
        "productId": str,
        "productManufacturer": fields.firm,
        "productType": fields.type,
        "fkUserId":"1",
      },
    }).then(() => {
      this.handleRefresh();
      this.handleModalVisible();
    });

  };

  handleSearch = () => {
    const { InputValue } = this.state;
    const { dispatch } = this.props;
    this.setState({
      isSearch : true,
    });
    console.log("InputValue", InputValue);
    dispatch({
      type: 'productManageList/search',
      payload: {
        "keyword": InputValue,
      },
    });
  };

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

  changePage = (page) => {
    console.log("page", page);
  }


  render() {
    const {
      productManageList: { data, searchData },
      loading,
    } = this.props;

    const { modalVisible, isSearch } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    let dataArray:TableListItem[] = [];
    if(data){
      for(let i = 0;i< data.length;i++){
        // let productClassification = (data[i].productClassification).join("/");
        let obj = {
          key:i,
          produceName:data[i].productName,
          productClassification:data[i].productClassification,
          productManufacturer:data[i].productManufacturer,
          productType:data[i].productType,
          productDesc:data[i].productDesc,
          productKey:data[i].productId
        }
        dataArray.push(obj);
      }
      console.info(dataArray);
    }

    let dataSearchArray:TableListItem[] = [];
    if(searchData){
      for(let i = 0;i< searchData.length;i++){
        // let productClassification = (searchData[i].productClassification).join("/");
        let obj = {
          key:i,
          produceName:searchData[i].productName,
          // productClassification:productClassification,
          productClassification:data[i].productClassification,
          productManufacturer:searchData[i].productManufacturer,
          productType:searchData[i].productType,
          productDesc:searchData[i].productDesc,
          productKey:searchData[i].productId
        }
        dataSearchArray.push(obj);
      }
      console.info(dataSearchArray);
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false} >
          <div className={styles.tableList}>
            <div className={styles.tableListTitle}>
              <h3>产品列表</h3>
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              <Button icon="redo" onClick={() => this.handleRefresh()}>
                刷新
              </Button>
            </div>
            <div className={styles.tableListSelect}>
              <Input style={{width:230,marginBottom:15,marginRight:10}} placeholder="请输入产品名称查询" allowClear onChange={this.handleGetInputValue}/>
              <Button type="primary" onClick={() => this.handleSearch()}>
                搜索
              </Button>
            </div>
            <div>
              <div className={styles.standardTable}>
                {isSearch?
                  <Table
                    dataSource={dataSearchArray}
                    columns={this.columns}
                    loading={loading}
                  />
                  :<Table
                      dataSource={dataArray}
                      columns={this.columns}
                      loading={loading}
                    />
                }
              </div>
            </div>
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<TableListProps>()(TableList);
