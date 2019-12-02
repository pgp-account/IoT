import { Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import React, { Component } from 'react';

import { TableListItem } from '../../data.d';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  // data: {
  //   list: TableListItem[];
  //   pagination: StandardTableProps<TableListItem>['pagination'];
  // };
  data:TableListItem[];
}

export interface StandardTableColumnProps extends ColumnProps<TableListItem> {
  needTotal?: boolean;
  total?: number;
}

// function initTotalList(columns: StandardTableColumnProps[]) {
//   if (!columns) {
//     return [];
//   }
//   const totalList: StandardTableColumnProps[] = [];
//   columns.forEach(column => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }

class StandardTable extends Component<StandardTableProps<TableListItem>> {

  // constructor(props: StandardTableProps<TableListItem>) {
  //   super(props);
  //   const { columns } = props;
  //   const needTotalList = initTotalList(columns);

  // }


  handleTableChange: TableProps<TableListItem>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  render() {
    const { data, rowKey, ...rest } = this.props;
    console.log("data",data);
    // const { list = [], pagination = false } = data || {};

    // const paginationProps = pagination
    //   ? {
    //       showSizeChanger: true,
    //       showQuickJumper: true,
    //       ...pagination,
    //     }
    //   : false;
    let dataArray:TableListItem[] = [];
    for(let i = 0;i< data.length;i++){
      let productClassification = (data[i].productClassification).join("/");
      let obj = {
        produceName:data[i].produceName,
        productClassification:productClassification,
        productManufacturer:data[i].productManufacturer,
        productType:data[i].productType,
        productDesc:data[i].productDesc,
        productKey:data[i].productID
      }
      dataArray.push(obj);
    }
    console.info(dataArray);

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'key'}
          dataSource={dataArray}
          // pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;
