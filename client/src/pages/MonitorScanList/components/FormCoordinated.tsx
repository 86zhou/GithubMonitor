import React from "react";
import styles from "./FormCoordinated.less";
import { Form, Select, Input, Button, message } from "antd";
import { gettasklist} from '../service';


const { Option } = Select;

class App extends React.Component {

  //父组件给子组件传递参数
  constructor(props) {

    super(props);
    this.state = {
      data: props.data,
    }
  }

  //向父组件传递信息
  sendMessage(msg) {
    this.props.onSendmsg(msg);
    this.setState({
      visible: false,
    });
  }



  handleSubmit = e => {
    e.preventDefault();
    const taskname = this.props.form.getFieldValue('taskname');
    //使用父组件传递的信息
    // console.log('data', this.state.data);
    //调用sendMessage向父组件传递信息
    const msg = { 'FormCoordinated': taskname };

    this.sendMessage(msg);
  };

  handleSelectChange = value => {

  };

  //获取scantask任务列表
  const tasklists = [];
  const tasknamelist = [];



  getScantaskList = async () => {

    // console.log("getScantaskList", 'getScantaskList');
    try {
      this.asklists = [];
      this.tasknamelist = [];
      this.tasklists = await gettasklist();

      for (let i = 0; i < this.tasklists.length; i++) {
        this.tasknamelist.push(<Option key={this.tasklists[i]['key']}>{this.tasklists[i]['key'] + '\t' + this.tasklists[i]['name']}</Option>);
      }

      // console.log('getScantasklist=>tasknamelist', this.tasknamelist);
      return true;

    } catch (error) {
      message.error('获取扫描任务列表失败，请重试');
      return false;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    this.getScantaskList();

    return (
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onSubmit={this.handleSubmit}

      >

        <Form.Item label="请选择监控任务" >
          {getFieldDecorator("taskname", {
            rules: [{ required: true, message: "Please select your monitor task!" }]
          })(
            <Select
              placeholder="Select a monitor task"
              style={{ width: "100%" }}
              onChange={this.handleSelectChange}
            >

              {this.tasknamelist}

            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedApp = Form.create({ name: "coordinated" })(App);

export default WrappedApp;