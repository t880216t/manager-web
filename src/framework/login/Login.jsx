import React from 'react'
import {Form, Input, Button, Checkbox, Spin, message} from 'antd'
const FormItem = Form.Item;
const createForm = Form.create;
import DocumentTitle from 'react-document-title'
import './index.scss'
import {hashHistory} from 'react-router'
import request from 'common/request/request.js'
import {local, session} from 'common/util/storage.js'
import 'whatwg-fetch';

import logoImg from './logo.png'

@createForm()
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            isRegister:false,
        }
        this.login = this.login.bind(this)
        this.fecthlogin = this.fecthlogin.bind(this)
        this.fecthRegister = this.fecthRegister.bind(this)
        this.onKeyPressLogin = this.onKeyPressLogin.bind(this)
        this.registerPage = this.registerPage.bind(this)
        this.backlogin = this.backlogin.bind(this)
    }

    componentDidMount() {
        session.removeAll()
    }

    registerPage(){
        this.setState({
            isRegister:true,
        })
    }

    backlogin(){
        this.setState({
            isRegister:false,
        })
    }

    fecthlogin(){
        this.props.form.validateFields((err,values) => {
            if (err) return
            this.setState({
                loading: true
            })
            var par = "username="+values.userName+"&password="+values.password;
            fetch('http://127.0.0.1:5000/signin',{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: par
            }).then((response) => {
                console.log('response:',response.Cookies)
                return response.json()}) //把response转为json
                .then((responseData) => { // 上面的转好的json
                    this.setState({
                        loading: false
                    })
                    if (responseData.code === 0) {
                        session.set('isLogin', true)
                        session.set('userInfo', {userName: responseData.userName,userID: responseData.userID})
                        hashHistory.push('/home')
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
                    this.setState({
                        loading: false
                    })
                })
        })

    }

    fecthRegister(){
        this.props.form.validateFields((err,values) => {
            if (err) return
            this.setState({
                loading: true
            })
            var par = "username="+values.userName+"&password="+values.password+"&email="+values.email;
            fetch('http://127.0.0.1:5000/register',{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: par
            }).then((response) => {
                console.log('response:',response.Cookies)
                return response.json()}) //把response转为json
                .then((responseData) => { // 上面的转好的json
                    this.setState({
                        loading: false
                    })
                    if (responseData.code === 0) {
                        message.success('注册成功，请登录！')
                        this.setState({isRegister:false})
                    } else {
                        message.error(responseData.msg)
                    }
                })
                .catch((error)=> {
                    message.error(error.statusText)
                    this.setState({
                        loading: false
                    })
                })
        })

    }

    login() {
        this.props.form.validateFields((err, values) => {
            if (err) return

            this.setState({
                loading: true
            })

            let loginData = values
            this.setState({
                loading: false
            })
            session.set('isLogin', true)
            hashHistory.push('/home')
            return

            request({
                url: '/login',
                type: 'post',
                dataType: 'json',
                data: loginData
            })
                .then(res => {
                    console.log(res)
                    this.setState({
                        loading: false
                    })
                    if (res.code === '0') {
                        session.set('isLogin', true)
                        session.set('userInfo', res.data.user)
                        session.set('menuInfo', res.data.menu)
                        hashHistory.push('/home')
                    } else {
                        message.error(res.msg)
                    }

                })
                .catch(err => {

                    message.error(err.statusText)
                    this.setState({
                        loading: false
                    })
                })
        })
    }

    onKeyPressLogin(event) {
        if (event.which === 13) {
            this.fecthlogin();
        }
    }

    render() {

        const {getFieldDecorator} = this.props.form
        const ButtonState = this.state.isRegister?<Button type="primary" onClick={this.fecthRegister}>注册</Button>:<Button type="primary" onClick={this.fecthlogin}>登录</Button>
        const EmailState = this.state.isRegister?<FormItem>
                {getFieldDecorator('email', {
                    rules: [
                        {
                            required: true,
                            message: '请输入邮箱'
                        }
                    ],
                })(
                    <Input placeholder="邮箱"/>
                )}
            </FormItem>:<div></div>
        const BottomState = this.state.isRegister ? <div style={{display:'flex',marginTop:10,marginRight:10,justifyContent:'flex-end'}}><span style={{color:'blue',fontSize:14}} onClick={this.backlogin}>返回登录</span></div>:<div style={{display:'flex',marginTop:10,marginRight:10,justifyContent:'flex-end'}}><span style={{color:'blue',fontSize:14}} onClick={this.registerPage}>去注册</span></div>

        return (
            <div className="login-page">
                <DocumentTitle title="管理台"/>
                <div className="login-box">
                    <img src={logoImg} alt="logo" className="logo"/>
                    <Spin spinning={this.state.loading} size="large">
                        <Form className="login-form" onKeyPress={this.onKeyPressLogin}>
                            {EmailState}
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入账户名'
                                        }
                                    ],
                                })(
                                    <Input placeholder="账户"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入密码'
                                        }
                                    ],
                                })(
                                    <Input autoComplete="off" type="password" placeholder="密码"/>
                                )}
                            </FormItem>
                            {ButtonState}
                        </Form>
                    </Spin>
                    {BottomState}
                </div>
            </div>
        )
    }
}

export default Login
