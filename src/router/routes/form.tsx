import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

// form module page
const FormRoute: RouteObject = {
  path: '/form',
  name: 'Form',
  element: <LayoutGuard />,
  meta: {
    title: 'Form',
    icon: 'form',
    orderNo: 2,
  },
  children: [
    {
      path: 'basic-form',
      name: 'BasicForm',
      element: LazyLoad(lazy(() => import('@/views/form/basic-form'))),
      meta: {
        title: 'Basic Form',
        key: 'basicForm',
      },
    },
    {
      path: 'form-designer',
      name: 'FormDesigner',
      element: LazyLoad(lazy(() => import('@/views/blank'))),
      meta: {
        title: 'Form Designer',
        key: 'formDesigner',
      },
    },
  ],
};

export default FormRoute;
