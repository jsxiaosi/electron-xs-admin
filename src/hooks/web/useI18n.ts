import zh_Cn from 'element-plus/lib/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import { computed } from 'vue';
import i18n, { availableLocales } from '@/locales/index';

export const useI18n = () => i18n.global;

export const t = (key: string) => key;

export const localesList = availableLocales;

export const deffElementLocale = () => {
  const { locale } = useI18n();

  const tolocale = computed(() => {
    if (locale.value == 'en') return en;
    else return zh_Cn;
  });

  return { tolocale };
};

// 转换国际化，适用于不在i18n配置的国际化语言
export function translateI18n(message: any = '') {
  if (!message) {
    return '';
  }
  const locale = i18n.global.locale.value;
  if (typeof message === 'object') {
    return message[locale];
  }
  const key = message.split('.')[0];
  if (key && Object.keys(i18n.global.messages.value[locale]).includes(key)) {
    // @ts-expect-error: 类型实例化过深，且可能无限
    return i18n.global.t(message);
  }
  return message;
}
