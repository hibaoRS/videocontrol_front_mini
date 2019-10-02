import Taro, {Component} from '@tarojs/taro'
import {View, Image, Button} from '@tarojs/components'
import {AtButton, AtModal, AtModalAction, AtModalHeader} from "taro-ui";
import {inject} from "@tarojs/mobx";

import styles from './tabbar.module.scss'
import logoImg from '../../static/img/logo.png'
import {logout} from "../../utils/ApiUtils";
import globalStore from "../../store/globalStore";

@inject('globalStore')
class TabBar extends Component {
  state = {requestLogout: false}

  handleLogout = () => {
    this.props.globalStore.logout()
    this.requestLogout(false)
  }


  requestLogout = (requestLogout) => {
    this.setState({requestLogout: requestLogout})
  }

  render() {
    return (
      <View className={styles.main}>
        <AtModal isOpened={this.state.requestLogout}>
          <AtModalHeader>确认注销登录？</AtModalHeader>
          <AtModalAction>
            <Button onClick={this.requestLogout.bind(this, false)}>取消</Button>
            <Button onClick={this.handleLogout}>确认</Button>
          </AtModalAction>
        </AtModal>

        <Image src={logoImg} className={styles.logo} />
        <View className={styles.title} style={{paddingBottom: "10px"}}>
          <AtButton onClick={this.requestLogout.bind(this, true)} size='small'>注销</AtButton>
        </View>
      </View>
    )
  }
}

export default TabBar
