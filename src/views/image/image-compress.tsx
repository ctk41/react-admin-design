import { PageWrapper } from '@/components/Page';
import SvgIcon from '@/components/SvgIcon';
import { UploadImage } from '@/components/Upload';
import { COMPRESS_IMG_SRC, IMAGE_COMPRESS } from '@/settings/websiteSetting';
import { downloadImgByBase64 } from '@/utils/download';
import { compressImage, getImageSize } from '@/utils/image';
import { Button, Card, Col, Form, InputNumber, Row, Select, Space } from 'antd';
import { type FC, useEffect, useState } from 'react';

interface FormState {
  width: number;
  height: number;
  ratio: number;
  quality: number;
  mimeType: string;
}

interface ImageState {
  width: number;
  height: number;
  aspectRatio: number;
  imgSrc: string;
}

const defaultForm: FormState = {
  width: 1920,
  height: 1080,
  ratio: 100,
  quality: 1,
  mimeType: 'image/png',
};

const defaultImage: ImageState = {
  width: 1920,
  height: 1080,
  aspectRatio: 1920 / 1080,
  imgSrc: COMPRESS_IMG_SRC,
};

const ImageCompress: FC = () => {
  const [form] = Form.useForm<FormState>();
  const [imageInfo, setImageInfo] = useState(defaultImage);

  useEffect(() => {
    getImageSize(COMPRESS_IMG_SRC).then(({ width, height }) => {
      form.setFieldsValue({ width, height });
      setImageInfo({ ...imageInfo, width, height, aspectRatio: width / height });
    });
  }, []);

  const handleSuccess = (url: string) => {
    setImageInfo({ ...imageInfo, imgSrc: url });
    getImageSize(url).then(({ width, height }) => {
      form.setFieldsValue({ width, height });
      setImageInfo({ ...imageInfo, width, height, aspectRatio: width / height });
    });
  };

  const handleChange = (value: number, type: 'width' | 'height') => {
    const getCalcVal =
      type === 'width'
        ? Number(Math.round(value * imageInfo.aspectRatio).toFixed(0))
        : Number(Math.round(value / imageInfo.aspectRatio).toFixed(0));
    const ratio = Number(Math.round((getCalcVal / imageInfo[type]) * 100).toFixed(2));
    form.setFieldsValue({ [type]: getCalcVal, ratio });
  };

  const onFinish = (values: FormState) => {
    const { width, height, quality, mimeType } = values;
    const fileType = mimeType.replace(/image\//, '') || 'png';
    compressImage(imageInfo.imgSrc, { width, height, quality, mimeType }).then((img: string) => {
      downloadImgByBase64(img, `compress-image.${fileType}`);
    });
  };

  return (
    <PageWrapper plugin={IMAGE_COMPRESS}>
      <Row gutter={12}>
        <Col span={16}>
          <Card title='Image Area' bordered={false} bodyStyle={{ height: '500px' }}>
            <div className='flex-center'>
              <div
                style={{
                  width: '800px',
                  height: '450px',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url(${imageInfo.imgSrc})`,
                }}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title='Settings Area' bordered={false} bodyStyle={{ height: '500px' }}>
            <Form
              form={form}
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign='left'
              initialValues={{ ...defaultForm }}
              style={{ width: '300px', margin: '60px auto 0' }}
              onFinish={onFinish}
            >
              <Form.Item label='Image Upload'>
                <UploadImage name='Select Image' isFull onSuccess={handleSuccess} />
              </Form.Item>
              <Form.Item label='Image Size' style={{ marginBottom: 0 }}>
                <Space>
                  <Form.Item name='width'>
                    <InputNumber
                      min={0}
                      max={imageInfo.width}
                      controls={false}
                      addonBefore={<span>Width</span>}
                      onChange={(value: any) => handleChange(value, 'height')}
                    />
                  </Form.Item>
                  <Form.Item>
                    <SvgIcon name='linking' />
                  </Form.Item>
                  <Form.Item name='height'>
                    <InputNumber
                      min={0}
                      max={imageInfo.height}
                      controls={false}
                      addonBefore={<span>Height</span>}
                      onChange={(value: any) => handleChange(value, 'width')}
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item label='Compression Ratio' name='ratio'>
                <InputNumber
                  min={0}
                  max={100}
                  controls={false}
                  formatter={value => `${value}%`}
                  disabled
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item label='Image Quality' name='quality'>
                <Select
                  options={[
                    { value: 1, label: 100 },
                    { value: 0.8, label: 80 },
                    { value: 0.6, label: 60 },
                    { value: 0.4, label: 40 },
                  ]}
                />
              </Form.Item>
              <Form.Item label='Image Format' name='mimeType'>
                <Select
                  options={[
                    { value: 'image/png', label: 'PNG' },
                    { value: 'image/jpg', label: 'JPG' },
                    { value: 'image/bmp', label: 'BMP' },
                  ]}
                />
              </Form.Item>
              <Form.Item label=' '>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                  Compress Image
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default ImageCompress;
