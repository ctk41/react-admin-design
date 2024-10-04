import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

// image module page
const ImageRoute: RouteObject = {
  path: '/image',
  name: 'Image',
  element: <LayoutGuard />,
  meta: {
    title: 'Image Processing',
    icon: 'image',
    orderNo: 4,
  },
  children: [
    {
      path: 'image-cropper',
      name: 'ImageCropper',
      element: LazyLoad(lazy(() => import('@/views/image/image-cropper'))),
      meta: {
        title: 'Image Cropping',
        key: 'imageCropper',
      },
    },
    {
      path: 'image-compress',
      name: 'ImageCompress',
      element: LazyLoad(lazy(() => import('@/views/image/image-compress'))),
      meta: {
        title: 'Image Compression',
        key: 'imageCompress',
      },
    },
    {
      path: 'image-composition',
      name: 'ImageComposition',
      element: LazyLoad(lazy(() => import('@/views/image/image-composition'))),
      meta: {
        title: 'Image Composition',
        key: 'imageComposition',
      },
    },
  ],
};

export default ImageRoute;
