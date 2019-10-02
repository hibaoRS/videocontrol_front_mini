import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'

import styles from './menu.module.scss'

class Menu extends Component {
  render() {
    return (
      <View className={styles.main + " " + this.props.className}>
        <Text className={styles.title}>{this.props.title}</Text>
        <View className={styles.content}>{this.props.children}</View>
      </View>
    )
  }
}

export default Menu
