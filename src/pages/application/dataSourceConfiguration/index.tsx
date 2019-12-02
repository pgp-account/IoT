import React, { Component, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';

class dataSource extends Component{

  render() {

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          尚未开发
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default dataSource;
