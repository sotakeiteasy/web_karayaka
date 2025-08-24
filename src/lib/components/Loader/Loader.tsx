import { DeviceContext } from '@/lib/contexts/DeviceContext';
import styles from './Loader.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useContext } from 'react';
const Loader = () => {
  const { isMobile } = useContext(DeviceContext);
  if (isMobile)
    return (
      <div className={styles.loaderContainer}>
        <Spin
          className={styles.spinner}
          size="large"
          fullscreen
          indicator={<LoadingOutlined style={{ fontSize: 90, color: '#f5f6fa' }} spin />}
        />
      </div>
    );
  else return null;
};

export default Loader;
