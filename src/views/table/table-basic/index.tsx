import { PageWrapper } from '@/components/Page';
import { getTableList } from '@/service';
import { TABLE_COMPO } from '@/settings/websiteSetting';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  type TableProps,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Popover,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { type FC, useEffect, useState } from 'react';
import type { APIResult, PageState, TableDataType } from './types';

const marriedOptions = [
  { label: 'Single', value: 0 },
  { label: 'Unmarried', value: 1 },
  { label: 'Married', value: 2 },
  { label: 'Divorced', value: 3 },
];

const TableBasic: FC = () => {
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [tableTotal, setTableTotal] = useState<number>(0);
  const [tableQuery, setTableQuery] = useState<PageState>({ current: 1, pageSize: 10 });

  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editHobbies, setEditHobbies] = useState<string[]>([]);

  const columns: ColumnsType<TableDataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      render: (_, record: any) => {
        const content = (
          <div>
            <p>Name: {record.name}</p>
            <p>Phone: {record.phone}</p>
            <p>Hobbies: {record.hobby.join(', ')}</p>
          </div>
        );
        return (
          <Popover content={content}>
            <Tag color='blue'>{record.name}</Tag>
          </Popover>
        );
      },
    },
    {
      title: 'Gender',
      dataIndex: 'sex',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: 'Education',
      dataIndex: 'education',
      align: 'center',
    },
    {
      title: 'Marital Status',
      dataIndex: 'married',
      align: 'center',
      render: (text, record: any) => (
        <Select options={marriedOptions} defaultValue={record.married} onChange={value => (record.married = value)} />
      ),
    },
    {
      title: 'Edit Forbidden',
      dataIndex: 'forbid',
      align: 'center',
      render: (_, record: any) => (
        <Switch defaultChecked={record.forbid} onChange={checked => (record.forbid = checked)} />
      ),
    },
    {
      title: 'Hobbies',
      dataIndex: 'hobby',
      align: 'center',
      render: (_, record: any) => <span>{record.hobby.join(', ')}</span>,
    },
    {
      title: 'Actions',
      key: 'action',
      align: 'center',
      render: (_, record: any) => (
        <Space>
          <Button disabled={record.forbid} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const tableSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: any[]) => {
      console.log(selectedRowKeys);
    },
  };

  useEffect(() => {
    fetchData();
  }, [tableQuery]);

  async function fetchData() {
    setTableLoading(true);
    const data = await getTableList(tableQuery);
    const { list, total } = data as unknown as APIResult;
    setTableData(list);
    setTableTotal(total);
    setTableLoading(false);
  }

  function handlePageChange(page: number, pageSize: number) {
    setTableQuery({ ...tableQuery, current: page, pageSize });
  }

  function handleDelete() {
    Modal.confirm({
      title: 'This action will delete the selected data, do you want to continue?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function handleEdit(record: TableDataType) {
    form.setFieldsValue({ ...record });
    setEditHobbies(record.hobby);
    setModalVisible(true);
  }

  function handleConfirm() {
    // Call API here
    setModalVisible(false);
  }

  function handleCancel() {
    setEditHobbies([]);
    setModalVisible(false);
  }

  return (
    <PageWrapper plugin={TABLE_COMPO}>
      <Card bordered={false}>
        <Table
          rowKey='id'
          rowSelection={tableSelection}
          columns={columns}
          dataSource={tableData}
          loading={tableLoading}
          pagination={{
            current: tableQuery.current,
            pageSize: tableQuery.pageSize,
            total: tableTotal,
            showTotal: () => `Total ${tableTotal} items`,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: handlePageChange,
          }}
        />
        <Modal
          open={modalVisible}
          title='Edit'
          width='600px'
          okText='Confirm'
          cancelText='Cancel'
          onCancel={handleCancel}
          onOk={handleConfirm}
        >
          <Form
            form={form}
            colon={false}
            labelCol={{ span: 4 }}
            labelAlign='left'
            style={{ width: '80%', margin: '0 auto' }}
          >
            <Form.Item label='Name' name='name'>
              <Input disabled />
            </Form.Item>
            <Form.Item label='Phone' name='phone'>
              <Input placeholder='Please enter the phone number' />
            </Form.Item>
            <Form.Item label='Education' name='education'>
              <Select
                options={['Middle School', 'High School', 'Associate Degree', 'Bachelor’s Degree'].map(item => ({
                  value: item,
                }))}
              />
            </Form.Item>
            <Form.Item label='Hobbies' name='hobby'>
              <Checkbox.Group options={editHobbies.map(item => ({ label: item, value: item }))} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </PageWrapper>
  );
};

export default TableBasic;
