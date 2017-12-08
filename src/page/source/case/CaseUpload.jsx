import React,{Component} from 'react';
import { Upload, Button, Icon, message } from 'antd';
import 'whatwg-fetch';
import Page from 'framework/page'
import {local, session} from 'common/util/storage.js'
import {hashHistory} from 'react-router'

class CaseUpload extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        isLoading:false,
        userID:'',
        userName:'',
    }

    componentDidMount(){
        const userInfo = session.get('userInfo') || {userID: 0}
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
        })
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('file', file);
            formData.append('userID', this.state.userID);
        });

        this.setState({
            uploading: true,
        });

        fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            //设置请求头，请求体为json格式，identity为未压缩
            headers: {},
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                if(responseData.code === 0){
                    this.setState({
                        uploading: false,
                    },()=>{message.success(responseData.msg)});
                }else {
                    this.setState({
                        uploading: false,
                    },()=>{message.error(responseData.msg)});
                }
            }).catch((error)=> {
            this.setState({
                uploading: false,
            })
            if (error.statusText){
                message.error(error.statusText)
            }else{
                message.error("网络异常，请检查您的办公网络！")
            }
        })

        // // You can use any AJAX library you like
        // reqwest({
        //     url: '//127.0.0.1:5000/upload',
        //     method: 'post',
        //     processData: false,
        //     data: formData,
        //     success: () => {
        //         this.setState({
        //             fileList: [],
        //             uploading: false,
        //         });
        //         message.success('upload successfully.');
        //     },
        //     error: () => {
        //         this.setState({
        //             uploading: false,
        //         });
        //         message.error('upload failed.');
        //     },
        // });
    }

    render() {
        const { uploading } = this.state;
        const props = {
            action: '//127.0.0.1:5000/upload',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };

        return (
            <Page title="上传导出文件" loading={this.state.isLoading}>
                <div style={{alignItems:'center', justifyContent:"center",display:'flex',flex:1, flexDirection:'column',
                    marginTop:"20%"}}>
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> Select File
                        </Button>
                    </Upload>
                    <Button
                        className="upload-demo-start"
                        type="primary"
                        onClick={this.handleUpload}
                        disabled={this.state.fileList.length === 0}
                        loading={uploading}
                        style={{marginTop:20}}
                    >
                        {uploading ? 'Uploading' : 'Start Upload' }
                    </Button>
                </div>
            </Page>
        );
    }
}


export default CaseUpload;
