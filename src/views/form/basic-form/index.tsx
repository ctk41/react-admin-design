import { PageWrapper } from '@/components/Page';
import { FORM_COMPO } from '@/settings/websiteSetting';
import type { CascaderProps, TreeSelectProps } from 'antd';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import type { Rule } from 'antd/es/form';
import { type FC, useState } from 'react';
import { cascaderData, checkboxData, cityData, provinceData, radioData, treeData } from './data';

const BasicForm: FC = () => {
  const [form] = Form.useForm();

  const province = provinceData[0];
  const [formState] = useState({
    inputLimit: '',
    inputNum: '',
    password: '',
    selectProvince: province,
    selectCity: cityData[province][0],
    dateVal: '',
    timeVal: '',
    switchVal: true,
    sliderVal: 32,
    cascaderVal: [],
    cascaderLazy: [],
    treeVal: ['0-0-1'],
    treeLazy: '1',
    radioVal: 'offline',
    checkboxVal: ['read'],
    textareaVal: '',
  });

  const formRules: Record<string, Rule[]> = {
    inputLimit: [{ required: true, message: 'Content cannot be empty' }],
    inputNum: [
      { required: true, message: 'Content cannot be empty' },
      { type: 'number', message: 'Content must be a numeric value' },
    ],
    password: [
      { required: true, message: 'Content cannot be empty' },
      { min: 6, max: 16, message: 'Password length must be between 6 and 16 characters' },
      { pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: 'Password can only contain letters, numbers, and underscores' },
    ],
  };

  const switchVal = Form.useWatch('switchVal', form);

  const [cascaderLazyData, setCascaderLazyData] = useState<CascaderProps['options']>([
    { value: 1, label: 'Option 1', isLeaf: false },
  ]);

  const [treeLazyData, setTreeLazyData] = useState<TreeSelectProps['treeData']>([
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ]);

  const handleProvinceChange = (value: any) => {
    form.setFieldsValue({ selectCity: cityData[value][0] });
  };

  const loadCascaderLazy = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    setTimeout(() => {
      targetOption.loading = false;
      let id = selectedOptions.length;
      const level = selectedOptions.length;
      targetOption.children = Array.from({ length: level + 1 }).map(() => ({
        value: ++id,
        label: `Option ${id}`,
        isLeaf: level >= 2,
      }));
      setCascaderLazyData([...cascaderLazyData!]);
    }, 1000);
  };

  const loadTreeLazy: TreeSelectProps['loadData'] = ({ id }) => {
    const genTreeNode = (parentId: number, isLeaf = false) => {
      const random = Math.random().toString(36).substring(2, 6);
      return {
        id: random,
        pId: parentId,
        value: random,
        title: isLeaf ? 'Tree Node' : 'Expand to load',
        isLeaf,
      };
    };

    return new Promise(resolve => {
      setTimeout(() => {
        setTreeLazyData(treeLazyData?.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]));
        resolve(undefined);
      }, 500);
    });
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const resetForm = () => {
    form.resetFields();
  };

  return (
    <PageWrapper plugin={FORM_COMPO}>
      <Card bordered={false}>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ ...formState }}
          style={{ width: '40%', margin: '0 auto' }}
          onFinish={onFinish}
        >
          <Form.Item label='Input Box (Length Limit):' name='inputLimit' rules={formRules.inputLimit}>
            <Input showCount maxLength={20} placeholder='Please enter content' />
          </Form.Item>
          <Form.Item label='Input Box (Numeric Only):' name='inputNum' rules={formRules.inputNum}>
            <InputNumber style={{ width: '100%' }} placeholder='Please enter a number' />
          </Form.Item>
          <Form.Item label='Input Box (Password Hidden):' name='password' rules={formRules.password}>
            <Input.Password maxLength={16} autoComplete='off' placeholder='Please enter password' />
          </Form.Item>
          <Form.Item label='Select Picker (Cascading):'>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item name='selectProvince'>
                  <Select options={provinceData.map((pro: any) => ({ value: pro }))} onChange={handleProvinceChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='selectCity'>
                  <Select options={cityData[formState.selectProvince].map((city: any) => ({ value: city }))} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label='Date and Time Picker:' name='dateVal'>
            <Row gutter={12}>
              <Col span={12}>
                <DatePicker placeholder='Select date' style={{ width: '100%' }} />
              </Col>
              <Col span={12}>
                <Form.Item name='timeVal'>
                  <TimePicker placeholder='Select time' style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label='Switch (Show/Hide):' name='switchVal' valuePropName='checked'>
            <Switch />
          </Form.Item>
          {!switchVal ? null : (
            <>
              <Form.Item label='Slider (Initial Value):' name='sliderVal'>
                <Slider />
              </Form.Item>
              <Form.Item label='Cascader:'>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item name='cascaderVal'>
                      <Cascader options={cascaderData} placeholder='Please select' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name='cascaderLazy'>
                      <Cascader
                        options={cascaderLazyData}
                        loadData={loadCascaderLazy}
                        changeOnSelect
                        placeholder='Please enter'
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label='Tree Selector (Selectable):' name='treeVal'>
                <Row gutter={12}>
                  <Col span={12}>
                    <TreeSelect
                      treeData={treeData}
                      treeCheckable
                      allowClear
                      showCheckedStrategy={TreeSelect.SHOW_PARENT}
                      placeholder='Please select'
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item name='treeLazy'>
                      <TreeSelect
                        treeDataSimpleMode
                        treeData={treeLazyData}
                        loadData={loadTreeLazy}
                        placeholder='Please select'
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label='Radio Button (With Disable):' name='radioVal'>
                <Radio.Group options={radioData} />
              </Form.Item>
              <Form.Item label='Checkbox (With Disable):' name='checkboxVal'>
                <Checkbox.Group options={checkboxData} />
              </Form.Item>
              <Form.Item label='Text Area (Length Limit):' name='textareaVal'>
                <Input.TextArea maxLength={50} rows={3} placeholder='Please enter content' />
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
            <Button style={{ marginLeft: '12px' }} onClick={resetForm}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageWrapper>
  );
};

export default BasicForm;
