import React,{Component} from 'react';
import { Table, Select,Button,message,Popconfirm,Modal,Input} from 'antd';
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
        project:'mic_buyer_app',
        datatype:'test',


    }

    componentDidMount(){
        const userInfo = session.get('userInfo') || {userID: 0}
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
        },()=> {this.fetchList()})
    }

    //所属项目
    handleProjectChange = (value) => {
        this.setState({ project: value },()=>{this.fetchList()});
    }

    //数据类型
    handleDatatypeChange = (value) => {
        this.setState({ datatype: value },()=>{this.fetchList()});
    }

    fetchList=()=>{
        var par = "entry=0&project="+this.state.project+'&datatype='+this.state.datatype
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
        var selectRowEntry = this.state.selectedRowKeys;
        this.setState({
            selectedRowEntry:selectRowEntry.toString(),
            isVisibleModal:true
        },()=>{
            console.log('selectRowEntry:'+this.state.selectedRowEntry)
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
            task_name:'',
            base_host:''
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
        const { project,isShowCloneModal,fetch_data,isVisibleModal,isConfirmLoading,datatype } = this.state;
        const keys = []
        for (var i = 0 ;i<  fetch_data.length;i++){
            keys.push(i)
        }
        const rowSelection = {
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys:selectedRowKeys
                });
            },
        };

        const columns = [{
            title: '用例名称',
            dataIndex: 'test_name',
            key: 'test_name',
            render:(text, record) => {
                const entry = record.entry
                return(<Button style={{borderColor:'white',color:'#108ee9'}} value={entry} onClick={this.clickDetail} >{text}</Button>
                )},
            width: '30%',
        }, {
            title: '用例描述',
            dataIndex: 'test_description',
            key: 'test_description',
            width: '30%',
        }, {
            title: '新建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        }, {
            title: '更多操作',
            key: 'action',
            render: (text, record) => {
                const entry = record.entry
                return(
                    <span>
                  <Button value={entry} onClick={this.clickClone}>Clone</Button>
                  <span className="ant-divider" />
				  <Popconfirm title="是否确认删除?" onConfirm={() => this.clickDelete(entry)}>
					<Button >Delete</Button>
				  </Popconfirm>
                </span>
                )},
        }];

        return(
            <Page title="接口用例列表" loading={this.state.isLoading}>
                <div style={{display:'flex', flexDirection:'row', marginTop:20}}>
                    <div style={{marginLeft:30}}>
                        <Select  defaultValue={project} style={{minWidth: 120, height:28}} onChange={this.handleProjectChange}>
                            <Select.Option value="mic_buyer_app">MIC BUYER APP</Select.Option>
                            <Select.Option value="mic_supplier_app">MIC SUPPIER APP</Select.Option>
                            <Select.Option value="mic_oss_app">MIC OSS APP</Select.Option>

                        </Select>
                    </div>
                    <div style={{marginLeft:20}}>
                        <Select  defaultValue={datatype} style={{minWidth: 120, height:28}} onChange={this.handleDatatypeChange}>
                            <Select.Option value="test">测试版参数</Select.Option>
                            <Select.Option value="release">正式版参数</Select.Option>
                        </Select>
                    </div>

                    <div style={{flex:1,display:'flex',justifyContent:'flex-end',marginRight:30,}}>
                        <Button style={{marginBottom:20}} onClick={this.handleAdd}>新建用例</Button>
                        <Button style={{marginLeft:10,marginBottom:20}} onClick={this.handleAddScript}>生成任务脚本</Button>
                        <div style={{marginLeft:30, justifyContent:'center',marginTop:5}}>
                            <text style={{fontSize:14,fontWeight:'bold',}}>已勾选：{this.state.selectedRowKeys.length}   总共：{fetch_data.length}</text>
                        </div>
                    </div>
                </div>


                <Table rowKey="entry" rowSelection={rowSelection} columns={columns} dataSource={fetch_data} pagination={{ pageSize: 50 }} scroll={{ y: 700 }} />
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
