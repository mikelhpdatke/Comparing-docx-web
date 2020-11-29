import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#ED1C23',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Chấm thi C500',
  pwa: false,
  logo:
    'https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_H%E1%BB%8Dc_vi%E1%BB%87n_an_ninh_nh%C3%A2n_d%C3%A2n.jpg',
  iconfontUrl: '',
};

export default Settings;
