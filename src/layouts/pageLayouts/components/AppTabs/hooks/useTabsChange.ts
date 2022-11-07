import type { Ref } from 'vue';
import { unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import qs from 'qs';
import { removeClass, toggleClass } from '@/utils/operate';
import type { MultiTabsType } from '@/store/types';
import { usePermissionStoreHook } from '@/store/modules/permission';
import { findRouteByPath } from '@/router/utils';
import { isUrl } from '@/utils/is';
import type { AppRouteRecordRaw } from '#/route';

export const useTabsChange = (multiTabs: Ref<MultiTabsType[]>) => {
  const route = useRoute();
  const router = useRouter();

  const setTabPaneKey = (item: MultiTabsType): string => {
    return `${item.path}${
      item.query && Object.keys(item.query).length ? '?' + qs.stringify(item.query) : ''
    }`;
  };

  // 添加标签
  const addRouteTabs = (routeRaw: MultiTabsType) => {
    const { path, name, meta } = routeRaw;
    const currentRoute = { path, meta, name };
    usePermissionStoreHook().handleMultiTabs('add', currentRoute);
  };

  // 关闭标签
  const closeTabsRoute = (e: MultiTabsType, type: 'other' | 'left' | 'right') => {
    const item = multiTabs.value.findIndex((i) => setTabPaneKey(i) === setTabPaneKey(e));
    const mapList = multiTabs.value.filter((i, index) => {
      if (i.path !== e.path && type === 'other') return true;
      else if (index < item && type === 'left') return true;
      else if (index > item && type === 'right') return true;
      return false;
    });
    if (mapList.find((i) => i.path === route.path)) {
      const { path, query } = multiTabs.value[item];
      router.push({
        path,
        query,
      });
    }
    mapList.forEach((i) => {
      usePermissionStoreHook().cacheOperate({
        mode: 'delete',
        name: i.name || '',
      });
      usePermissionStoreHook().handleMultiTabs('delete', i);
    });
  };

  // 关闭当前导航
  const removeTab = (e: MultiTabsType) => {
    const item = multiTabs.value.findIndex((i) => setTabPaneKey(i) === setTabPaneKey(e));
    const tabsLength = multiTabs.value.length;
    let value, toRoute;
    if (multiTabs.value[item].name === route.name) {
      if (item === tabsLength - 1) {
        value = multiTabs.value[item - 1];
      } else {
        value = multiTabs.value[tabsLength - 1];
      }
      toRoute = {
        path: value.path,
        query: value.query,
      };
      router.push(toRoute);
    }
    usePermissionStoreHook().cacheOperate({
      mode: 'delete',
      name: multiTabs.value[item].name || '',
    });
    usePermissionStoreHook().handleMultiTabs('delete', multiTabs.value[item]);
  };

  // 重新加载
  function onFresh(item?: MultiTabsType) {
    const refreshButton = 'refresh-button';
    toggleClass(true, refreshButton, document.querySelector('.rotate'));
    const { path, query } = unref(item || route);
    router.replace({
      path: '/redirect' + path,
      query: query,
    });
    setTimeout(() => {
      removeClass(document.querySelector('.rotate'), refreshButton);
    }, 600);
  }

  const selectMenu = (path: string) => {
    const routerinfo = (router.options.routes.find((i) => i.path === '/') ||
      []) as AppRouteRecordRaw;
    const findRoute = findRouteByPath(path, routerinfo.children || []);
    if (findRoute) {
      if (findRoute.redirect && findRoute.children && findRoute.children.length) {
        selectMenu(findRoute.children[0].path);
        return;
      }

      if (isUrl(findRoute.path)) return;
      addRouteTabs(route);
    }
  };

  // const logout = () => {
  //   usePermissionStoreHook().handleRemoveMultiTabs();
  // };

  return { setTabPaneKey, addRouteTabs, onFresh, closeTabsRoute, removeTab, selectMenu };
};
