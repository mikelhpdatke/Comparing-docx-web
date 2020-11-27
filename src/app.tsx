import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings, PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import defaultSettings from '../config/defaultSettings';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: LayoutSettings;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrent();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { currentUser } = initialState;
      const { location } = history;
      if (!currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: 'Lỗi 200',
  201: 'Lỗi 201',
  202: 'Lỗi 202',
  204: 'Lỗi 204',
  400: 'Lỗi 400',
  401: 'Lỗi 401',
  403: 'Lỗi 403',
  404: 'Lỗi 404',
  405: 'Lỗi 405',
  406: 'Lỗi 406',
  410: 'Lỗi 410',
  422: 'Lỗi 422',
  500: 'Lỗi 500',
  502: 'Lỗi 502',
  503: 'Lỗi 503',
  504: 'Lỗi 504',
};

const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Gặp lỗi ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: 'Đã xảy ra lỗi',
      message: 'Vui lòng kiểm tra lại',
    });
  }
  throw error;
};

export const request: RequestConfig = {
  errorHandler,
};
