import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

// tree module page
const TreeRoute: RouteObject = {
  path: '/tree',
  name: 'Tree',
  element: <LayoutGuard />,
  meta: {
    title: 'Tree Structure',
    icon: 'tree',
    orderNo: 9,
  },
  children: [
    {
      path: 'org-tree',
      name: 'OrgTree',
      element: LazyLoad(lazy(() => import('@/views/tree/org-tree'))),
      meta: {
        title: 'Organization Tree',
        key: 'orgTree',
      },
    },
    {
      path: 'antd-tree',
      name: 'AntdTree',
      element: LazyLoad(lazy(() => import('@/views/tree/antd-tree'))),
      meta: {
        title: 'Component Tree',
        key: 'antdTree',
      },
    },
  ],
};

export default TreeRoute;
