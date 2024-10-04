import { PageWrapper } from '@/components/Page';
import { TABLE_EDIT_COMPO } from '@/settings/websiteSetting';
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Space,
  Switch,
  Table,
} from 'antd';
import type { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { tableData, type DataItem } from './data';

type CellType = 'number' | 'text' | 'radio' | 'date' | 'select' | 'checkbox' | 'switch';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  cellType: CellType;
  record: DataItem;
  index: number;
  children: React.ReactNode;
}

type theadKey = Record<string, { title: string; type: string }>;
const theadMap: theadKey = {
  key: { title: 'Number Input', type: 'number' },
  name: { title: 'Input', type: 'text' },
  sex: { title: 'Radio', type: 'radio' },
  birth: { title: 'Date Picker', type: 'date' },
  education: { title: 'Select', type: 'select' },
  hobby: { title: 'Checkbox', type: 'checkbox' },
  forbid: { title: 'Switch', type: 'switch' },
  action: { title: 'Button', type: 'button' },
};

const nodeType = (type: CellType, record: DataItem) => {
  switch (type) {
    case 'number':
      return <InputNumber min={1000} max={2000} />;
    case 'text':
      return <Input />;
    case 'radio':
      return <Radio.Group options={['Male', 'Female'].map(item => ({ value: item, label: item }))} />;
    case 'date':
      return (
        <div>
          <DatePicker defaultValue={dayjs(record.birth, 'YYYY-MM-DD')} format='YYYY-MM-DD' />
        </div>
      );
    case 'select':
      return (
        <Select
          options={['Junior High', 'High School', 'College', 'Bachelor'].map(item => ({ value: item }))}
          style={{ width: '80px' }}
        />
      );
    case 'checkbox':
      return <Checkbox.Group options={record.hobby.split('、')} defaultValue={record.hobby.split('、')} />;
    case 'switch':
      return <Switch defaultChecked={record.forbid} />;
  }
};

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  cellType,
  record,
  children,
  ...restProps
}) => {
  const cellNode = nodeType(cellType, record);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} style={{ margin: 0 }}>
          {cellNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableEditRow: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(tableData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: DataItem) => record.key === editingKey;

  const edit = (record: Partial<DataItem>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key!);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as DataItem;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // @ts-ignore
  const columns: ColumnType[] = [
    {
      title: () => {
        return (
          <>
            <span>Number</span>
            <p className='sub-title'>(Number Input)</p>
          </>
        );
      },
      dataIndex: 'key',
      width: 70,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Name</span>
            <p className='sub-title'>(Input)</p>
          </>
        );
      },
      dataIndex: 'name',
      width: 110,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Gender</span>
            <p className='sub-title'>(Radio)</p>
          </>
        );
      },
      dataIndex: 'sex',
      width: 120,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Birthday</span>
            <p className='sub-title'>(Date Picker)</p>
          </>
        );
      },
      dataIndex: 'birth',
      width: 140,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Education</span>
            <p className='sub-title'>(Select)</p>
          </>
        );
      },
      dataIndex: 'education',
      width: 80,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Hobbies</span>
            <p className='sub-title'>(Checkbox)</p>
          </>
        );
      },
      dataIndex: 'hobby',
      width: 250,
      editable: true,
      align: 'center',
    },
    {
      title: () => {
        return (
          <>
            <span>Editable Forbidden</span>
            <p className='sub-title'>(Switch)</p>
          </>
        );
      },
      dataIndex: 'forbid',
      width: 70,
      editable: true,
      align: 'center',
      render: (text: string, record: DataItem) => {
        return <span>{record.forbid ? 'Yes' : 'No'}</span>;
      },
    },
    {
      title: () => {
        return (
          <>
            <span>Action</span>
            <p className='sub-title'>(Button)</p>
          </>
        );
      },
      dataIndex: 'action',
      width: 70,
      align: 'center',
      render: (_: any, record: DataItem) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type='primary' ghost onClick={() => save(record.key)}>
              Save
            </Button>
            <Popconfirm title='Cancel editing?' onConfirm={cancel}>
              <Button type='primary' danger ghost>
                Cancel
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Button>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataItem) => ({
        record,
        cellType: theadMap[col.dataIndex].type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <PageWrapper plugin={TABLE_EDIT_COMPO}>
      <Card bordered={false}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            dataSource={data}
            columns={mergedColumns}
            pagination={false}
          />
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default TableEditRow;
