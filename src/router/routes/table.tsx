import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

// table module page
const TableRoute: RouteObject = {
  path: '/table',
  name: 'Table',
  element: <LayoutGuard />,
  meta: {
    title: 'Table',
    icon: 'table',
    orderNo: 3,
  },
  children: [
    {
      path: 'table-basic',
      name: 'TableBasic',
      element: LazyLoad(lazy(() => import('@/views/table/table-basic'))),
      meta: {
        title: 'Basic Table',
        key: 'tableBasic',
      },
    },
    {
      path: 'table-edit-row',
      name: 'TableEditRow',
      element: LazyLoad(lazy(() => import('@/views/table/table-edit-row'))),
      meta: {
        title: 'Editable Row Table',
        key: 'tableEditRow',
      },
    },
  ],
};

export default TableRoute;
