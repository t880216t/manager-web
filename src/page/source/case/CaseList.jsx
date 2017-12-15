import React,{Component} from 'react';
import { Table, Select,Tooltip ,Button,message,Popconfirm,Modal,Input,Icon,Popover} from 'antd';
import 'whatwg-fetch';
import Page from 'framework/page'
import {local, session} from 'common/util/storage.js'
import {hashHistory} from 'react-router'

class CaseList extends React.Component{
    state = {
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
        showMoreAction:false,
        showAdd:false,
        newCase:'',

    }

    componentDidMount(){
        const userInfo = session.get('userInfo') || {userID: 0}
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
            isLoading:true,
        },()=> {this.fetchList()})
    }


    fetchList=()=>{
        var par = "entry=0&userID="+this.state.userID
        fetch('http://127.0.0.1:5000/gettasklist',{
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
                        fetch_data:responseData.content,
                        isLoading:false
                    })
                }
                if (responseData.code === 10001) {
                    this.setState({
                        fetch_data:[],
                        isLoading:false,

                    })
                }
            })
            .catch((error)=> {
                this.setState({
                    isLoading:false
                })
                if (error.statusText){
                    message.error(error.statusText)
                }else{
                    message.error("网络异常，请检查您的办公网络！")
                }
            })
    }

    //置用例状态
    setCaseStatus=(status)=>{
        var par = "entry="+this.state.showModelEntry+"&status="+status.toString()
        fetch('http://127.0.0.1:5000/settaskstatus',{
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
                    this.setState({
                        showMoreAction:false,
                    },()=>{this.fetchList()})
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

    //更多操作
    handleMoreAction = (entry,text) =>{
        this.setState({
            showMoreAction:true,
            showModelTitle:text,
            showModelEntry:entry,
            newCase:'',
        })
    }

    //新建子用例
    handleSubmit=()=>{
        var par = "entry="+this.state.showModelEntry+"&newCase="+this.state.newCase
        fetch('http://127.0.0.1:5000/addcase',{
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
                    this.setState({
                        showMoreAction:false,
                    },()=>{this.fetchList()})
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

    //删除用例
    handleDelete=()=>{
        var par = "entry="+this.state.showModelEntry
        fetch('http://127.0.0.1:5000/deletecase',{
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
                    this.setState({
                        showMoreAction:false,
                    },()=>{this.fetchList()})
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

    render(){
        const { fetch_data} = this.state;

        const columns = [ {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render:  (text, record) => {
                return(
                    record.status === 2?
                        <a style={{color:'red',marginLeft:30,fontSize:16}}onClick={()=>{this.handleMoreAction(record.entry,text)}}>{text}</a>
                        :
                    record.status === 1?
                        <a style={{color:'green',marginLeft:30,fontSize:16}} onClick={()=>{this.handleMoreAction(record.entry,text)}}>{text}</a>
                        :
                        record.children.length > 0?
                            <a style={{marginLeft:30,fontSize:16}} onClick={()=>{this.handleMoreAction(record.entry,text)}}>{text}</a>
                            :
                            <a style={{marginLeft:30,fontSize:16,color:'#454545'}} onClick={()=>{this.handleMoreAction(record.entry,text)}}>{text}</a>
                )}
        }];

        return(
            <Page title="case列表" loading={this.state.isLoading}>
                <Table rowKey="entry" columns={columns} dataSource={fetch_data} indentSize={50} scroll={{ x: '130%', y: 1000 }}  />
                <Modal title={this.state.showModelTitle}
                       visible={this.state.showMoreAction}
                       onOk={()=>{console.log('handle ok')}}
                       onCancel={()=>{this.setState({showMoreAction:false,showAdd:false})}}
                       footer={null}
                >
                    {this.state.showAdd?
                        <div style={{display:"flex",flexDirection:'row', marginTop:20,marginBottom:30}}>
                            <Input value={this.state.newCase} onChange = {(value)=>{this.setState({newCase:value.target.value},()=>{console.log('newCase :',this.state.newCase)})}}
                                   placeholder="新建当前case的子用例"
                                   autosize={true}
                                   autoFocus={true}
                                   onPressEnter={()=>{this.handleSubmit()}}
                            />
                            <Button style={{backgroundColor:"#108ee9",marginLeft:10}} onClick={()=>{this.handleSubmit()}}>
                                提交
                            </Button>
                        </div>
                        :
                        <div style={{display:"flex",flexDirection:'row',justifyContent:"space-around"}}>
                            <Tooltip placement="bottomRight" title={"新建子用例"}>
                                <Icon type="plus-circle" style={{ fontSize: 40, color: '#c2c5cc' }} onClick={()=>{this.setState({showAdd:true,})}}/>
                            </Tooltip>
                            <Popconfirm title="你确定要删除这条用例?" onConfirm={()=>{this.handleDelete()}} okText="确定" cancelText="取消">
                                <Tooltip placement="bottomRight" title={"删除用例"}>
                                    <Icon type="minus-circle" style={{ fontSize: 40, color: '#cc0227' }} />
                                </Tooltip>
                            </Popconfirm>
                            <Tooltip placement="bottomRight" title={"用例测试失败"}>
                                <Icon type="close-circle" style={{ fontSize: 40, color: '#ccc006' }} onClick={()=>{this.setCaseStatus(2)}}/>
                            </Tooltip>
                            <Tooltip placement="bottomRight" title={"用例测试通过"}>
                                <Icon type="check-circle" style={{ fontSize: 40, color: '#0acc38' }} onClick={()=>{this.setCaseStatus(1)}}/>
                            </Tooltip>
                        </div>
                    }

                </Modal>
            </Page>
        );
    }
}

export default CaseList;
