import { PageWrapper } from '@/components/Page';
import { XLSX_PLUGIN } from '@/settings/websiteSetting';
import { Button, Card, Form, Input, Radio, Select, Space, Table, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useState } from 'react';
import type { DataToSheet } from '../types';
import { useExcel } from '../useExcel';
import { tableData } from './data';

type FileType = 'xlsx' | 'csv' | 'txt';

interface FormState {
  fileName: string;
  autoWidth: boolean;
  fileType: FileType;
}

const ExportExcel = () => {
  const { Item } = Form;
  const { Group } = Radio;

  const { exportDataToExcel } = useExcel();

  const formParam = {
    fileName: '',
    autoWidth: true,
    fileType: 'xlsx',
  };

  const tableColumns: ColumnType<any>[] = [
    { title: 'ID', dataIndex: 'key', align: 'center' },
    { title: 'Name', dataIndex: 'name', align: 'center' },
    { title: 'Gender', dataIndex: 'sex', align: 'center' },
    { title: 'Phone', dataIndex: 'phone', align: 'center' },
    { title: 'Education', dataIndex: 'education', align: 'center' },
    { title: 'Hobbies', dataIndex: 'hobby', align: 'center' },
  ];

  const [tableSelectedKeys, setTableSelectedKeys] = useState<number[]>([]);
  const [tableSelectedRows, setTableSelectedRows] = useState<object[]>([]);

  function handleTableChange(selectedKeys: any[]) {
    setTableSelectedKeys(selectedKeys);
  }

  function handleTableSelect(_record: object, _selected: boolean, selectedRows: object[]) {
    setTableSelectedRows(selectedRows);
  }

  function handleTableSelectAll(_selected: boolean, selectedRows: object[]) {
    setTableSelectedRows(selectedRows);
  }

  function handleExport(values: FormState) {
    console.log('values', values);
    if (!tableSelectedRows.length) {
      message.warning('Please select the data items to export!');
      return;
    }
    const { fileName, autoWidth, fileType: bookType } = values;

    const params: DataToSheet = {
      data: tableSelectedRows,
      header: ['ID', 'Name', 'Gender', 'Phone', 'Education', 'Hobbies'],
      key: ['key', 'name', 'sex', 'phone', 'education', 'hobby'],
      fileName,
      autoWidth,
      bookType,
    };
    exportDataToExcel(params);
    setTableSelectedKeys([]);
    setTableSelectedRows([]);
  }

  return (
    <PageWrapper plugin={XLSX_PLUGIN}>
      <Card bordered={false}>
        <Space direction='vertical' size={16} style={{ width: '100%' }}>
          <Form layout='inline' autoComplete='off' initialValues={formParam} onFinish={handleExport}>
            <Item label='File Name:' name='fileName'>
              <Input placeholder='File Name' />
            </Item>
            <Item label='Auto Width:' name='autoWidth'>
              <Group
                options={[
                  { label: 'Auto', value: true },
                  { label: 'Fixed', value: false },
                ]}
              />
            </Item>
            <Item label='File Type:' name='fileType'>
              <Select
                options={[
                  { label: 'xlsx', value: 'xlsx' },
                  { label: 'csv', value: 'csv' },
                  { label: 'txt', value: 'txt' },
                ]}
                style={{ width: '180px' }}
              />
            </Item>
            <Item>
              <Button type='primary' htmlType='submit'>
                Export Excel
              </Button>
            </Item>
          </Form>
          <Table
            dataSource={tableData}
            columns={tableColumns}
            rowSelection={{
              selectedRowKeys: tableSelectedKeys,
              onChange: handleTableChange,
              onSelect: handleTableSelect,
              onSelectAll: handleTableSelectAll,
            }}
            pagination={false}
          />
        </Space>
      </Card>
    </PageWrapper>
  );
};

export default ExportExcel;
