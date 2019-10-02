import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {observer, inject} from '@tarojs/mobx'

import styles from './index.module.scss'
import TabBar from "../tabbar/tabbar";
import Main from "../main/main";
import Login from "../login/login";
import {AtMessage} from "taro-ui";


@inject('globalStore')
@observer
class Index extends Component {


  config = {
    navigationBarTitleText: '首页'
  }


  render() {
    const {globalStore: {user}} = this.props
    return (
      <View className={styles.main}>
        <View>
          <AtMessage />
          <TabBar />
          <Main />
          <Login />
        </View>

      </View>
    )
  }
}

export default Index
