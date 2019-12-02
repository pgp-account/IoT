export interface TableListItem {
  key?: number;
  // disabled?: boolean;
  // href: string;
  // avatar: string;
  productName: string;
  // title: string;
  // owner: string;
  productDesc: string;
  productManufacturer: string;
  productType: string;
  productKey: string;
  productId:string;
  // createdAt: Date;
  // progress: number;
  productClassification:string[]
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  productId: string;
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  current: number;
}
