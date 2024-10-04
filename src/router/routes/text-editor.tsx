import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

// text-editor module page
const TextEditorRoute: RouteObject = {
  path: '/editor',
  name: 'Editor',
  element: <LayoutGuard />,
  meta: {
    title: 'Text Editor',
    icon: 'editor',
    orderNo: 7,
  },
  children: [
    {
      path: 'markdown',
      name: 'Markdown',
      element: LazyLoad(lazy(() => import('@/views/editor/markdown'))),
      meta: {
        title: 'Markdown Editor',
        key: 'markdown',
      },
    },
    {
      path: 'rich-text',
      name: 'RichText',
      element: LazyLoad(lazy(() => import('@/views/editor/rich-text'))),
      meta: {
        title: 'Rich Text Editor',
        key: 'richText',
      },
    },
    {
      path: 'code-editor',
      name: 'CodeEditor',
      element: LazyLoad(lazy(() => import('@/views/editor/code-mirror'))),
      meta: {
        title: 'Code Editor',
        key: 'codeEditor',
      },
    },
  ],
};

export default TextEditorRoute;
