import { lazy } from '@loadable/component';
import type { RouteObject } from '../types';
import { LayoutGuard } from '../guard';
import { LazyLoad } from '@/components/LazyLoad';

const VideoRoute: RouteObject = {
  path: '/video',
  name: 'Video',
  element: <LayoutGuard />,
  meta: {
    title: 'Video Processing',
    icon: 'video',
    orderNo: 5,
  },
  children: [
    {
      path: 'video-player',
      name: 'VideoPlayer',
      element: LazyLoad(lazy(() => import('@/views/video/video-player'))),
      meta: {
        title: 'Video Player',
        key: 'videoPlayer',
      },
    },
    {
      path: 'video-watermark',
      name: 'VideoWatermark',
      element: LazyLoad(lazy(() => import('@/views/video/video-watermark'))),
      meta: {
        title: 'Video Watermark',
        key: 'videoWatermark',
      },
    },
  ],
};

export default VideoRoute;
