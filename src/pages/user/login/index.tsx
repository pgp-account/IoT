import { Alert, Checkbox, Icon } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import Link from 'umi/link';
import { connect } from 'dva';
import { StateType } from './model';
import LoginComponents from './components/Login';
import logo from '../../../../public/logo/logo1.png';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

interface LoginProps {
  dispatch: Dispatch<any>;
  userAndlogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
}
export interface FormDataType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

@connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: string;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: any, values: FormDataType) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }
      this.loginForm.validateFields(['mobile'], {}, (err: any, values: FormDataType) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          ((dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          }) as unknown) as Promise<any>)
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = (content: string) => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div>
        <div className={styles.main}>
          <div className={styles.left}>
            <img alt="logo" className={styles.logo} src={logo} />
          </div>
          <div className={styles.right}>
            <div className={styles.header}>
              <span className={styles.title}>WeShare大数据物联网平台</span>
            </div>

            <LoginComponents
              defaultActiveKey={type}
              onTabChange={this.onTabChange}
              onSubmit={this.handleSubmit}
              ref={(form: any) => {
                this.loginForm = form;
              }}
            >
              <UserName
                name="userName"
                placeholder={`${formatMessage({ id: 'userandlogin.login.userName' })}: admin`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandlogin.userName.required' }),
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={`${formatMessage({ id: 'userandlogin.login.password' })}: admin`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({ id: 'userandlogin.password.required' }),
                  },
                ]}
                onPressEnter={e => {
                  e.preventDefault();
                  this.loginForm.validateFields(this.handleSubmit);
                }}
              />
              <div>
                <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                  <span style={{ color:'rgba(255,255,255,0.65)' }}><FormattedMessage id="userandlogin.login.remember-me" /></span>
                </Checkbox>
                <a style={{ float: 'right', color:'rgba(255,255,255,0.65)' }} href="">
                  <FormattedMessage id="userandlogin.login.forgot-password" />
                </a>
              </div>
              <Link to="/">
                <Submit loading={submitting}>
                  <FormattedMessage id="userandlogin.login.login" />
                </Submit>
              </Link>
              <div className={styles.other}>
                <Link className={styles.register} to="/user/register">
                  <FormattedMessage id="userandlogin.login.signup" />
                </Link>
              </div>
            </LoginComponents>
          </div>
        </div>
        <div className={styles.footer}>
          <p>WeShare物联网大数据平台让您的数据焕发全新生产力</p>
          <p>版权所有@河钢数字技术股份有限公司 | 版本1.0.0</p>
        </div>
      </div>
    );
  }
}

export default Login;
