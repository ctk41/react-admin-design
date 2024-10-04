import type { PageTransitionEnum, PermissionModeEnum, ThemeEnum } from '../enums/appEnum';
import type { CacheTypeEnum } from '../enums/cacheEnum';
import type { MenuFoldBtnEnum, MenuModeEnum, MenuTypeEnum } from '../enums/menuEnum';

export interface AppConfig {
  themeColor: string;
  permissionCacheType: CacheTypeEnum;
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
  transitionSetting: TransitionSetting;
  permissionMode: PermissionModeEnum;
  tagsCached: boolean;
  openKeepAlive: boolean;
  lockScreenTime: number;
  showFooter: boolean;
  colorWeak: boolean;
  grayMode: boolean;
}

export interface HeaderSetting {
  showBreadCrumb: boolean;
  showTags: boolean;
  showSearch: boolean;
  showFullScreen: boolean;
  showLocale: boolean;
  showDoc: boolean;
  showGithub: boolean;
}

export interface MenuSetting {
  menuType: MenuTypeEnum;
  menuMode: MenuModeEnum;
  menuTheme: ThemeEnum;
  menuSplit: boolean;
  menuCanDrag: boolean;
  menuFold: boolean;
  menuFoldBtn: MenuFoldBtnEnum;
  menuFoldShowTitle: boolean;
  menuWidth: number;
  menuFixed: boolean;
  menuHidden: boolean;
}

export interface TransitionSetting {
  openNProgress: boolean;
  openPageLoading: boolean;
  openTransition: boolean;
  basicTransition: PageTransitionEnum;
}
