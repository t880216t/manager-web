import React,{Component} from 'react';
import { Table, Icon,Button,message,Popconfirm,Modal,Input} from 'antd';
import 'whatwg-fetch';
import Page from 'framework/page'
import {local, session} from 'common/util/storage.js'
import {hashHistory} from 'react-router'

class InterfaceList extends React.Component{
    state = {
        selectedRowKeys: [],
        selectedRowEntry: [],
        //初始表数据
        fetch_data:[],
        isLoading:false,
        isVisibleModal:false,
        isConfirmLoading:false,
        task_name:'',
        userID:'',
        userName:'',
        taskState:0

    }

    componentDidMount(){
        const userInfo = session.get('userInfo') || {userID: 0}
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
        },()=> {this.fetchList()})
    }

    //清楚定时器
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchList=()=>{
        var par = ""
        fetch('http://127.0.0.1:5000/interfaceTaskList',{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: par
        }).then((response) => {
            return response.json()}) //把response转为json
            .then((responseData) => { // 上面的转好的json
                if (responseData.code === 0) {
                    this.setState({
                        fetch_data:responseData.content
                    })
                }
                if (responseData.code === 10001) {
                    this.setState({
                        fetch_data:[]
                    })
                }
            })
            .catch((error)=> {
                if (error.statusText){
                    message.error(error.statusText)
                }else{
                    message.error("网络异常，请检查您的办公网络！")
                }
            })
    }

    //克隆
    clickExec=(e)=>{
        //解决获取undefinded
        console.log(' e.currentTarget.value', e.currentTarget.value)
        if(e.currentTarget.value){
            this.fetchScript(e.currentTarget.value)
            this.setState({
                taskState:1
            })
        }else{
            message.warning("没点上，再试试！")
        }
    }

    //生成脚本
    fetchScript =(entry)=>{
        var par = "entry="+entry
        fetch('http://127.0.0.1:5000/build',{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: par
        }).then((response) => {
            return response.json()}) //把response转为json
            .then((responseData) => { // 上面的转好的json
                if (responseData.code === 0) {
                    message.success(responseData.msg)
                    this.timer = setInterval(() => this.fetchList(), 2000);
                } else {
                    message.error(responseData.msg)
                }
            })
            .catch((error)=> {
                if (error.statusText){
                    message.error(error.statusText)
                }else{
                    message.error("网络异常，请检查您的办公网络！")
                }
            })
    }

    //关闭定时任务
    closeSetTimeTask =(entry)=>{
        if(entry){
            var par = "taskId="+entry
            fetch('http://127.0.0.1:5000/closeSetTimeTask',{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: par
            }).then((response) => {
                return response.json()}) //把response转为json
                .then((responseData) => { // 上面的转好的json
                    if (responseData.code === 0) {
                        message.success(responseData.msg)
                        this.fetchList()
                    } else {
                        message.error(responseData.msg)
                    }
                })
                .catch((error)=> {
                    if (error.statusText){
                        message.error(error.statusText)
                    }else{
                        message.error("网络异常，请检查您的办公网络！")
                    }
                })
        }else{
            message.warning("没点上，再试试！")
        }

    }

    getStateButton =(entry,task_status,is_settime_task,settime_task_status)=>{
        if (is_settime_task===1){
            if(settime_task_status===1){
                return(
                    <Popconfirm title="确认关闭该定时任务?" onConfirm={() => this.closeSetTimeTask(entry)}>
                        <span><Button value={entry}>定时任务执行中</Button></span>
                    </Popconfirm>
                )
            }else{
                return(<span><Button value={entry}>已关闭定时任务</Button></span>)
            }
        }else {
            if (task_status === 0){
                return(<span><Button value={entry} onClick={this.clickExec}>待执行</Button></span>)
            }
            else if (task_status === 1){
                return(<span><Button value={entry}>正在执行</Button></span>)
            }
            else if (task_status === 3){
                return(<span><Button value={entry} >已完成</Button></span>)
            }
            else{
                return(<span><Button value={entry} >未知状态</Button></span>)
            }
        }
    }

    getReportUrl=(entry,task_status,is_settime_task,start_time)=>{
        if(is_settime_task===1){
            return(<span>{start_time}</span>)
        }else {
            const url = "http://127.0.0.1:5000/static/interface_auto/test_src/"+entry+"/result/result.html"
            if (task_status === 3){
                return(<a href={url} target="_blank">查看报告</a>)
            }
            else{
                return(<span></span>)
            }
        }
    }

    //详情
    clickDetail =(entry)=>{
        //解决获取undefinded
        if(entry.currentTarget.value){
            hashHistory.push('/source/interface-task-detail/'+entry.currentTarget.value)
        }else{
            message.warning("没点上，再试试！")
        }
    }

    render(){
        const { fetch_data,} = this.state;

        const columns = [{
            title: '任务编号',
            dataIndex: 'entry',
            key: 'entry',
            render: text => <span style={{marginLeft:20}}>{text}</span>,
        }, {
            title: '任务名称',
            width: '30%',
            dataIndex: 'task_name',
            key: 'task_name',
            render:(text, record) => {
                const entry = record.entry
                return(<Button style={{borderColor:'white',color:'#108ee9'}} value={entry} onClick={this.clickDetail} >{text}</Button>
                )}
        }, {
            title: '新建用户',
            dataIndex: 'create_user',
            key: 'create_user',
        }, {
            title: '新建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                const entry = record.entry
                const task_status = record.task_status
                const is_settime_task = record.is_settime_task
                const settime_task_status = record.settime_task_status
                return(this.getStateButton(entry,task_status,is_settime_task,settime_task_status))
            },
        }, {
            title: '备注',
            dataIndex: '',
            key: '',
            render: (text, record) => {
                const entry = record.entry
                const task_status = record.task_status
                const is_settime_task = record.is_settime_task
                const start_time = record.start_time
                return(this.getReportUrl(entry,task_status,is_settime_task,start_time))}
        }];

        return(
            <Page title="接口任务列表" loading={this.state.isLoading}>
                <Table columns={columns} dataSource={fetch_data} />
            </Page>
        );
    }
}

export default InterfaceList;
