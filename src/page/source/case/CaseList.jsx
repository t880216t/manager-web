import React,{Component} from 'react';
import { Table, Select,Button,message,Popconfirm,Modal,Input,Icon,Popover} from 'antd';
import 'whatwg-fetch';
import Page from 'framework/page'
import {local, session} from 'common/util/storage.js'
import {hashHistory} from 'react-router'

class CaseList extends React.Component{
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
        project:'mic_buyer_app'

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
                        isLoading:false
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



    render(){
        const { fetch_data} = this.state;

        const columns = [ {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            render:  (text, record) => {
                return(
                    record.status === 2?
                        <a style={{color:'red',marginLeft:30,fontSize:16}}>{text}</a>
                        :
                        record.status === 1?
                            <a style={{color:'green',marginLeft:30,fontSize:16}}>{text}</a>
                            :
                            <a style={{marginLeft:30,fontSize:16}}>{text}</a>

                )}
        }];

        return(
            <Page title="case列表" loading={this.state.isLoading}>
                <Table rowKey="entry" columns={columns} dataSource={fetch_data} indentSize={50} scroll={{ x: '130%', y: 1000 }}  />
            </Page>
        );
    }
}

export default CaseList;
