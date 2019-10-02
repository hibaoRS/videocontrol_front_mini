import Taro, {Component} from '@tarojs/taro'
import {AtIcon, AtInputNumber} from "taro-ui";
import {View, Button, Text, Input, Switch} from '@tarojs/components'
import {inject, observer} from "@tarojs/mobx";
import styles from './main.module.scss'
import Menu from "../components/menu/menu";
import {
  remoteLive,
  setRecordName,
  setResourceMode, setSectionTime,
  startLive,
  startRecord,
  stopLive,
  stopRecord
} from "../../utils/ApiUtils";


@observer
@inject("globalStore")
class Main extends Component {


  state = {
    update: false
  }


  componentDidMount() {
    this.fetchStateRoutinely = setInterval(
      () => {
        this.props.globalStore.fetchRecordLiveState()
        this.update()
      }, 1000
    )

    this.fetchConfigRoutinely = setInterval(
      () => {
        this.props.globalStore.fetchConfig()
      }, 10000
    )
  }

  componentWillUnmount() {
    clearInterval(this.fetchStateRoutinely)
    clearInterval(this.fetchConfigRoutinely)
  }

  update = () => {
    this.setState({update: !this.state.update})
  }


  getTimeString = (time) => {
    let date = new Date();
    date.setTime(time);
    let hours = date.getUTCHours() + "";
    let seconds = date.getUTCSeconds() + "";
    let minutes = date.getUTCMinutes() + "";


    hours = this.addZero(hours);
    seconds = this.addZero(seconds);
    minutes = this.addZero(minutes);

    return hours + ":" + minutes + ":" + seconds;
  }

  addZero = (string) => {
    if (string.length === 1) {
      return "0" + string;
    } else {
      return string;
    }
  }


  render() {
    const {recordLiveState, config} = this.props.globalStore;
    return (
      <View className={styles.main}>
        <Menu title='录制控制'>
          <View className={styles.menu}>
            <View className={styles.buttons}>
              {recordLiveState && recordLiveState.recording
                ? <Button onClick={stopRecord}>
                  <AtIcon prefixClass='icon' value='stop' size='15' color='green' />
                  停止录制
                </Button>
                : <Button onClick={startRecord}>
                  <AtIcon prefixClass='icon' value='start' size='15' color='red' />
                  开始录制
                </Button>
              }
              <View className={styles.switch}>
                <Text>资源模式</Text>
                <Switch onChange={val => {
                  setResourceMode(val ? 0 : 1).then(res => {
                    this.props.globalStore.fetchConfig()
                    this.update()
                  })
                }} checked={config && config.configs.misc.resource_mode == '1' ? true : false}
                        disabled={recordLiveState && recordLiveState.recording} />
              </View>
            </View>
            <View className={styles.buttons}>
              <Text> 已录制时间</Text>
              <Text>{recordLiveState && recordLiveState.recording
                ? this.getTimeString(new Date().getTime() - recordLiveState.recordTime)
                : "00:00:00"} </Text>
            </View>
          </View>
        </Menu>


        <Menu title='课程设置' className={styles.space}>
          <View className={styles.buttons}>
            <View className={styles.switch3}>
              <Text>课程名称</Text>
              <Input
                onInput={e => {
                  setRecordName(e.target.value).then(res=>{
                    this.props.globalStore.fetchConfig()
                    this.update()
                  })
                }}
                name='value'
                value={config && config.recordName ? config.recordName : ""} type='text' />
            </View>
            <View>
              <Text>分段时长</Text>
              <AtInputNumber min={10} max={1200} onChange={(val) => {
                setSectionTime(val)
              }} type='number' value={config && config.sectionTime ? config.sectionTime : 45}
              />
              <Text>分钟</Text>
            </View>
          </View>
        </Menu>

        <Menu title='直播控制' className={styles.space}>
          <View className={styles.menu}>
            <View className={styles.buttons}>
              {recordLiveState && recordLiveState.living
                ? <Button onClick={stopLive}>
                  <AtIcon onClick={() => {
                    console.log("okk")
                    stopLive()
                  }} prefixClass='icon' value='stop' size='15' color='green' />
                  停止直播
                </Button>
                : <Button onClick={startLive}>
                  <AtIcon prefixClass='icon' value='start' size='15' color='red' />
                  本地直播
                </Button>
              }


              {recordLiveState && recordLiveState.remoteLiving
                ? <Button onClick={remoteLive.bind(this, 0)}>
                  <AtIcon prefixClass='icon' value='stop' size='15' color='green' />
                  停止直播
                </Button>
                : <Button onClick={remoteLive.bind(this, 1)}>
                  <AtIcon prefixClass='icon' value='start' size='15' color='red' />
                  远程直播
                </Button>
              }
            </View>

            <View className={styles.buttons}>
              <Text> 已直播时间</Text>
              <Text>{recordLiveState && recordLiveState.living
                ? this.getTimeString(new Date().getTime() - recordLiveState.liveTime)
                : "00:00:00"} </Text>
            </View>

          </View>
        </Menu>
      </View>
    );
  }
}


export default Main;
