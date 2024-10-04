import type { FC } from 'react';
import { Space } from 'antd';
import classNames from 'classnames';
import styles from './app-logo.module.less';
import logoImg from '@/assets/images/react-logo.svg';
import styled from 'styled-components';

const AppLogo: FC = () => {
  return (
    <Wrapper>
      <Space>
        <ImgLogo src={logoImg} />
        <TitleAdmin>VTI CORP</TitleAdmin>
      </Space>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ImgLogo = styled.img`
  width: 60px;
  animation: logo-spin 10s linear infinite;

  @keyframes logo-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
`;

const TitleAdmin = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 400;
`;

export default AppLogo;
