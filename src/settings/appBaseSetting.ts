import { PageTransitionEnum, PermissionModeEnum, ThemeEnum } from '@/enums/appEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';
import { MenuFoldBtnEnum, MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import type { AppConfig } from '@/types/config';

export const appSetting: AppConfig = {
  themeColor: '#1890ff',
  permissionCacheType: CacheTypeEnum.LOCAL,
  headerSetting: {
    showBreadCrumb: true,
    showTags: true,
    showSearch: true,
    showFullScreen: true,
    showLocale: false,
    showDoc: false,
    showGithub: true,
  },
  menuSetting: {
    menuType: MenuTypeEnum.SIDER_MENU,
    menuMode: MenuModeEnum.INLINE,
    menuTheme: ThemeEnum.DARK,
    menuSplit: false,
    menuCanDrag: false,
    menuFold: false,
    menuFoldBtn: MenuFoldBtnEnum.HEADER,
    menuFoldShowTitle: false,
    menuWidth: 210,
    menuFixed: false,
    menuHidden: false,
  },
  transitionSetting: {
    openNProgress: false,
    openPageLoading: false,
    openTransition: true,
    basicTransition: PageTransitionEnum.FADE,
  },
  permissionMode: PermissionModeEnum.MAPPING,
  tagsCached: false,
  openKeepAlive: true,
  lockScreenTime: 0,
  showFooter: false,
  colorWeak: false,
  grayMode: false,
};
