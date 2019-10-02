import Taro, {Component} from '@tarojs/taro'
import {Button} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'
import {AtForm, AtInput, AtModal, AtModalAction, AtModalContent, AtModalHeader, AtSwitch} from "taro-ui";

import {login} from "../../utils/ApiUtils";
import ToastUtils from "../../utils/ToastUtils";


@inject('globalStore')
@observer
class Login extends Component {


  state = {
    loading: true,
    form: {
      password: "",
      name: "",
      keepLogin: true,
    }
  }


  componentDidMount() {
    document.addEventListener("keydown", this.handleEnterKey);

    let user = Taro.getStorageSync("user");
    if (user != null) {
      let loginTime = Taro.getStorageSync("loginTime")
      if ((new Date().getTime() - loginTime) < 1000 * 60 * 60 * 24) {
        this.props.globalStore.login(user)
      }
    }
    this.setState({loading: false})
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnterKey);
  }

  handleEnterKey = (e) => {
    const {globalStore: {user}} = this.props

    if (e.keyCode === 13) {
      if (!user) {
        this.handleLogin()
      }
    }
  }


  handleLogin = () => {
    login(this.state.form).then(res => {
      if (res.data.code === 1) {
        this.props.globalStore.login(res.data.data)
        this.setState({form: {}})
        if (this.state.form.keepLogin) {
          Taro.setStorage({key: "user", data: JSON.stringify(res.data.data)})
          Taro.setStorage({key: "loginTime", data: new Date().getTime()})
        }

      } else {
        ToastUtils.error("管理员账号或密码有误")
      }
    })
  }

  render() {
    const {globalStore: {user}} = this.props
    return (
      <AtModal closeOnClickOverlay={false} isOpened={!user && !this.state.loading}>
        <AtModalHeader>请先登录</AtModalHeader>
        <AtModalContent>
          <AtForm>
            <AtInput
              name='name'
              title='账号'
              type='text'
              onChange={(val) => this.setState({form: {...this.state.form, name: val}})}
              value={this.state.form.name}
              placeholder='请输入账号'
            />

            <AtInput
              name='password'
              value={this.state.form.password}
              title='密码'
              type='password'
              placeholder='请输入密码'
              onChange={(val) => this.setState({form: {...this.state.form, password: val}})}
            />

            <AtSwitch
              onChange={(val) => this.setState({form: {...this.state.form, keepLogin: val}})}
              checked={this.state.form.keepLogin}
              title='保持登录'
            />

          </AtForm>
        </AtModalContent>
        <AtModalAction> <Button onClick={this.handleLogin}>登录</Button> </AtModalAction>
      </AtModal>

    )
  }
}

export default Login
