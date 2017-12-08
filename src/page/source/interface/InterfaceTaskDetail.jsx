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
        base_host:'',
        isShowCloneModal:false,
        cloneEntry:'',
        clone_task_name:'',

    }

    componentDidMount(){
        const userInfo = session.get('userInfo') || {userID: 0}
        const entry = this.props.params.entry
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
        },()=> {this.fetchTaskDetail(entry)})
    }

    fetchTaskDetail=(entry)=>{
        var entry = entry.toString()
        var par = "entry="+entry
        fetch('http://127.0.0.1:5000/interfaceTaskDetail',{
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

    fetchList=(entry)=>{
        var entry = entry.toString()
        var par = "entry="+entry
        fetch('http://127.0.0.1:5000/interfaceList',{
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

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    handleAdd =()=> {
        hashHistory.push('/source/interface-add')
    }

    handleAddScript =()=> {
        var selectRowEntry = []
        for(var i = 0 ;i<this.state.selectedRowKeys.length;i++){
            var entry = this.state.fetch_data[this.state.selectedRowKeys[i]].entry
            selectRowEntry.push(entry)
        }
        this.setState({
            selectedRowEntry:selectRowEntry.toString(),
            isVisibleModal:true
        },()=>{
            console.log('selectRowEntry:'+this.state.selectedRowEntry)
            //this.fetchScript(this.state.selectedRowEntry)
        })
    }

    handleOk =()=>{
        if(this.state.task_name != ''){
            if(this.state.selectedRowEntry.length >1){
                if(this.state.base_host != ''){
                    this.setState({
                        isConfirmLoading:true,
                    })
                    this.fetchTask()
                }else {
                    message.warning("请填写测试host!")
                    this.setState({
                        isConfirmLoading:false,
                    })
                }
            }else {
                message.warning("请先选择用例!")
                this.setState({
                    isConfirmLoading:false,
                })
            }

        }else {
            message.warning("请填写任务名称!")
            this.setState({
                isConfirmLoading:false,
            })
        }
    }

    handleCancel=()=>{
        this.setState({
            isConfirmLoading:false,
            isVisibleModal:false,
            task_name:''
        })
    }

    //生成测试任务
    fetchTask =()=>{
        var par = "entry="+this.state.selectedRowEntry+"&task_name="+this.state.task_name+"&create_user="+this.state.userName+'&base_host='+this.state.base_host
        fetch('http://127.0.0.1:5000/addInterfaceTask',{
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: par
        }).then((response) => {
            return response.json()}) //把response转为json
            .then((responseData) => { // 上面的转好的json
                this.setState({
                    isConfirmLoading:false,
                    isVisibleModal:false
                })
                if (responseData.code === 0) {
                    message.success(responseData.msg)
                    hashHistory.push('/source/interface-task-list')
                } else {
                    message.error(responseData.msg)
                }
            })
            .catch((error)=> {
                this.setState({
                    isConfirmLoading:false,
                    isVisibleModal:false
                })
                if (error.statusText){
                    message.error(error.statusText)
                }else{
                    message.error("网络异常，请检查您的办公网络！")
                }
            })
    }

    //克隆
    clickClone =(entry)=>{
        //解决获取undefinded
        if(entry.currentTarget.value){
            this.setState({
                cloneEntry:entry.currentTarget.value,
                isShowCloneModal:true
            })
        }else{
            message.warning("没点上，再试试！")
        }
    }

    handleCloneOk =()=>{
        if(this.state.cloneEntry != '' && this.state.clone_task_name != ''){
            this.fetchClone()
        }else {
            message.warning("请填写用例名称")
        }
    }

    handleCloneCancel =()=>{
        this.setState({
            cloneEntry:'',
            isShowCloneModal:false,
            clone_task_name:''
        })
    }

    fetchClone=()=>{
        var par = "entry="+this.state.cloneEntry+"&clone_task_name="+this.state.clone_task_name
        fetch('http://127.0.0.1:5000/cloneInterface',{
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
                        cloneEntry:'',
                        clone_task_name:'',
                        isShowCloneModal:false
                    })
                    message.success("克隆成功")
                    this.fetchList()
                }
                if (responseData.code === 10001) {
                    message.error("用例名称重复")
                }
            })
            .catch((error)=> {
                this.setState({
                    cloneEntry:'',
                    clone_task_name:'',
                    isShowCloneModal:false
                })
                if (error.statusText){
                    message.error(error.statusText)
                }else{
                    message.error("网络异常，请检查您的办公网络！")
                }
            })
    }

    //详情
    clickDetail =(entry)=>{
        //解决获取undefinded
        if(entry.currentTarget.value){
            hashHistory.push('/source/interface-detail/'+entry.currentTarget.value)
        }else{
            message.warning("没点上，再试试！")
        }
    }

    //删除
    clickDelete =(entry)=>{
        if(entry){
            var par = "entry="+entry
            fetch('http://127.0.0.1:5000/deleteInterface',{
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

    //任务名称
    taskInputChange=(e)=>{
        this.setState({
            task_name : e.target.value
        })
    }

    render(){
        const { isShowCloneModal,selectedRowKeys,fetch_data,isVisibleModal,isConfirmLoading } = this.state;
        const keys = []
        for (var i = 0 ;i<  fetch_data.length;i++){
            keys.push(i)
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: '全部选择',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: keys,
                    });
                },
            }],
            onSelection: this.onSelection,
        };

        const columns = [{
            title: '用例名称',
            dataIndex: 'test_name',
            key: 'test_name',
            render:(text, record) => {
                const entry = record.entry
                return(<Button style={{borderColor:'white',color:'#108ee9'}} value={entry} onClick={this.clickDetail} >{text}</Button>
                )}
        }, {
            title: '用例描述',
            dataIndex: 'test_description',
            key: 'test_description',
        }, {
            title: '接口路径',
            dataIndex: 'path',
            key: 'path',
        }, {
            title: '新建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        } ];

        return(
            <Page title="任务详情列表" loading={this.state.isLoading}>
                <div style={{marginTop:20,marginBottom:20}}></div>
                <Table columns={columns} dataSource={fetch_data} />
                <Modal title={"请输入任务名称"}
                       visible={isVisibleModal}
                       onOk={this.handleOk}
                       confirmLoading={isConfirmLoading}
                       onCancel={this.handleCancel}
                >
                    <Input value={this.state.task_name} placeholder="输入任务名称" onChange={this.taskInputChange} />
                    <Input value={this.state.base_host} onChange = {(value)=>{this.setState({base_host:value.target.value},()=>{console.log('base_host :',this.state.base_host)})}}
                           style={{ marginTop:20}}
                           placeholder="请输入接口域名或IP，eg: 'http://app.made-in-china.com'"
                    />
                </Modal>
                <Modal title={"请输入新的英文用例名称"}
                       visible={isShowCloneModal}
                       onOk={this.handleCloneOk}
                       onCancel={this.handleCloneCancel}
                >
                    <Input
                        value={this.state.clone_task_name}
                        onChange = {(value)=>{this.setState({clone_task_name:value.target.value},()=>{console.log('clone_task_name :',this.state.clone_task_name)})}}
                        style={{ marginTop:20}}
                        placeholder="请输入新的英文用例名称"
                    />
                </Modal>
            </Page>
        );
    }
}

export default InterfaceList;
