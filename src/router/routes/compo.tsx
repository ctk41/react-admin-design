import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

const CompoRoute: RouteObject = {
  path: '/compo',
  name: 'Compo',
  element: <LayoutGuard />,
  meta: {
    title: 'Components',
    icon: 'compo',
    orderNo: 6,
  },
  children: [
    {
      path: 'image-upload',
      name: 'ImageUpload',
      element: LazyLoad(lazy(() => import('@/views/compo/image-upload'))),
      meta: {
        title: 'Image Upload',
        key: 'imageUpload',
      },
    },
    {
      path: 'drag',
      name: 'Drag',
      meta: {
        title: 'Drag',
      },
      children: [
        {
          path: 'drag-list',
          name: 'DragList',
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-list'))),
          meta: {
            title: 'Drag List',
            key: 'dragList',
          },
        },
        {
          path: 'drag-resize',
          name: 'DragResize',
          element: LazyLoad(lazy(() => import('@/views/compo/drag/drag-resize'))),
          meta: {
            title: 'Component Drag',
            key: 'dragResize',
          },
        },
      ],
    },
    {
      path: 'transfer',
      name: 'Transfer',
      element: LazyLoad(lazy(() => import('@/views/compo/transfer'))),
      meta: {
        title: 'Transfer Box',
      },
    },
    {
      path: 'count-up',
      name: 'CountUp',
      element: LazyLoad(lazy(() => import('@/views/compo/count-up'))),
      meta: {
        title: 'Number Scroll',
        key: 'countUp',
      },
    },
  ],
};

export default CompoRoute;
