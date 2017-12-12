import React,{Component} from 'react';
import { Radio, Icon,Button,Input,Switch,message,Tooltip,Select } from 'antd';
import 'whatwg-fetch';
import Page from 'framework/page'
import {local, session} from 'common/util/storage.js'
import {hashHistory} from 'react-router'
const { TextArea } = Input;
import Autocomplete from 'react-autocomplete'



class InterfaceDetail extends React.Component{
    state = {
        keyInput :'',
        test_name:'',
        project :'',
        path:'',
        method:'post',
        datatype:'test',
        parms:",,,0,",
        verif_code:'',
        need_save_response:'0',
        need_verif_value:'0',
        verif_key:'',
        verif_value_from_file:'0',
        verif_value:'',
        test_description:'',
        isLoading:false,
        entry:'',
        autoCompleteItems:[],
        projects:[],
    }

    componentDidMount() {
        var entry = this.props.params.entry
        const userInfo = session.get('userInfo') || {userID: 0}
        this.setState({
            userID : userInfo.userID,
            userName : userInfo.userName,
        },()=> {
            this.fetchDetail(entry)
            this.fetchPorjectlist()
        })
    }

    //获取项目列表
    fetchPorjectlist=()=>{
        var par = "userName="+this.state.userName
        fetch('http://127.0.0.1:5000/projectList',{
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
                        projects:responseData.content
                    },()=>{console.log('projects',this.state.projects)})
                }
                if (responseData.code === 10001) {
                    this.setState({
                        projects:[]
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

    fetchDetail=(entry)=>{
        var entry = entry.toString()
        this.setState({
            entry: entry,
        })
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
                    var DetailContent = responseData.content[0]
                    this.setState({
                        project:DetailContent.project,
                        test_name:DetailContent.test_name,
                        path:DetailContent.path,
                        method:DetailContent.method,
                        verif_code:DetailContent.verif_code,
                        need_save_response:DetailContent.need_save_response.toString(),
                        need_verif_value:DetailContent.need_verif_value.toString(),
                        verif_key:DetailContent.verif_key,
                        verif_value_from_file:DetailContent.verif_value_from_file.toString(),
                        verif_value:DetailContent.verif_value,
                        test_description:DetailContent.test_description,
                        parms:DetailContent.parms,
                        datatype:DetailContent.datatype,
                    })
                }
                if (responseData.code === 10001) {
                    message.error("未获取到详情信息！")
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

    handleMethodChange = (e) => {
        this.setState({ method: e.target.value },()=>{console.log('method',this.state.method)});
    }

    //数据类型
    handleDatatypeChange = (e) => {
        this.setState({ datatype: e.target.value },()=>{console.log('method',this.state.datatype)});
    }

    //所属项目
    handleProjectChange = (value) => {
        this.setState({ project: value },()=>{console.log('method',this.state.project)});
    }

    //格式化上传参数，提交数据
    handleSubmit =()=>{
        if (this.state.entry != ""){
            if(this.state.test_name != '' && this.state.path != ''&& this.state.verif_code.toString() != '' && this.state.test_description != ''){
                this.setState({
                    isLoading:true,
                },()=>{this.fetchUpdate()})
            }else {
                message.error('请填写完整数据')
            }
        }else {
            message.error('数据异常，请回到列表重新进入！')
        }

    }

    //发送数据
    fetchUpdate = () =>{
        var par = 'entry='+this.state.entry+'&test_name='+this.state.test_name+'&path='+this.state.path+'&method='+this.state.method+'&parms='+this.state.parms+'&verif_code='+this.state.verif_code+'&need_save_response='+this.state.need_save_response+'&need_verif_value='+this.state.need_verif_value+'&verif_key='+this.state.verif_key+'&verif_value_from_file='+this.state.verif_value_from_file+'&verif_value='+this.state.verif_value+'&test_description='+this.state.test_description+'&project='+this.state.project+'&datatype='+this.state.datatype
        console.log('_par:',par)
        fetch('http://127.0.0.1:5000/updateInterface',{
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
                    isLoading: false
                })
                if (responseData.code === 0) {
                    message.success("修改用例，成功！")
                    hashHistory.push('/source/interface-list')
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
                    isLoading: false
                })
            })
    }

    //获取联想词
    fetchAutoCompleteWords = () =>{
        var par = "project="+this.state.project
        fetch('http://127.0.0.1:5000/getAutocompleteWords',{
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
                        autoCompleteItems:responseData.content
                    })
                }else {
                    message.warning(responseData.msg)
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

    //增加参数
    add_parms = () =>{
        const empty_data = ",,,,"
        var parms_items = this.state.parms
        var new_parms_items = parms_items.split('|~|')
        new_parms_items.push(empty_data)
        var new_format_item = ""
        for(var i=0;i<new_parms_items.length;i++){
            new_format_item = new_format_item + new_parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{console.log('new format parms:',this.state.parms)})
    }


    //删除key值
    remove_key = (key_index) =>{
        const parms_items = this.state.parms
        const array_parms_items = parms_items.split('|~|')
        console.log('array_parms_items:',array_parms_items)
        array_parms_items.splice(key_index,1);
        console.log('new parms_items:',array_parms_items)
        var new_format_item = ""
        for(var i=0;i<array_parms_items.length;i++){
            new_format_item = new_format_item + array_parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{console.log('new format parms:',this.state.parms)})
    }


    //参数key输入获取
    getParmsKeyInput = (key_index,key_input) =>{
        var parms_items = this.state.parms
        parms_items = parms_items.split('|~|')
        var parms_edit_item = parms_items[key_index]
        var new_parms_edit_item = parms_edit_item.split(',')
        new_parms_edit_item[1] = key_input.target.value
        parms_items[key_index] = new_parms_edit_item.toString()
        var new_format_item = ""
        for(var i=0;i<parms_items.length;i++){
            new_format_item = new_format_item + parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{console.log('new format parms:',this.state.parms)})

    }

    //参数value输入获取
    getParmsValueInput = (key_index,key_input) =>{
        var parms_items = this.state.parms
        parms_items = parms_items.split('|~|')
        var parms_edit_item = parms_items[key_index]
        var new_parms_edit_item = parms_edit_item.split(',')
        new_parms_edit_item[2] = key_input.target.value.replace(/,/g,'#`#')
        new_parms_edit_item[4] = key_input.target.value.replace(/,/g,'#`#')
        parms_items[key_index] = new_parms_edit_item.toString()
        var new_format_item = ""
        for(var i=0;i<parms_items.length;i++){
            new_format_item = new_format_item + parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{this.fetchAutoCompleteWords()
            console.log('new format parms:',this.state.parms)
        })

    }

    //参数value输入获取
    getParmsValueSelect = (key_index,key_input) =>{
        console.log('key_index:',key_index)
        console.log('key_input:',key_input)
        var parms_items = this.state.parms
        parms_items = parms_items.split('|~|')
        var parms_edit_item = parms_items[key_index]
        var new_parms_edit_item = parms_edit_item.split(',')
        new_parms_edit_item[2] = key_input
        new_parms_edit_item[4] = key_input
        parms_items[key_index] = new_parms_edit_item.toString()
        var new_format_item = ""
        for(var i=0;i<parms_items.length;i++){
            new_format_item = new_format_item + parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{console.log('new format parms:',this.state.parms)})

    }


    //获取参数开关状态
    getParmsIsValueFromFile = (key_index,e) =>{
        var parms_items = this.state.parms
        parms_items = parms_items.split('|~|')
        var parms_edit_item = parms_items[key_index]
        var new_parms_edit_item = parms_edit_item.split(',')
        if (new_parms_edit_item[3] === '0'){
            new_parms_edit_item[3] = '1'
        }else {
            new_parms_edit_item[3] = '0'
        }
        parms_items[key_index] = new_parms_edit_item.toString()
        var new_format_item = ""
        for(var i=0;i<parms_items.length;i++){
            new_format_item = new_format_item + parms_items[i] + '|~|'
        }
        var format_parms = new_format_item.substr(0, new_format_item.length - 3);
        this.setState({
            parms:format_parms,
        },()=>{console.log('new format parms:',this.state.parms)})
    }

    //是否保存请求返回值
    isNeedSaveResponse = (e) =>{
        if (this.state.need_save_response === '0'){
            this.setState({
                need_save_response:'1'
            },()=>{console.log('need save response :',this.state.need_save_response)})
        }else {
            this.setState({
                need_save_response:'0'
            },()=>{console.log('need save response :',this.state.need_save_response)})
        }
    }

    //是否校验请求返回值
    isNeedVerifResponse = (e) =>{
        if (this.state.need_verif_value === '0'){
            this.setState({
                need_verif_value:'1'
            },()=>{console.log('need_verif_value 1 :',this.state.need_verif_value)})
        }else {
            this.setState({
                need_verif_value:'0'
            },()=>{console.log('need_verif_value 2:',this.state.need_verif_value)})
        }
    }

    //是否从保存文件中校验请求返回值
    isNeedVerifFromFile = (e) =>{
        if (this.state.verif_value_from_file === '0'){
            this.setState({
                verif_value_from_file:'1'
            },()=>{console.log('verif_value_from_file :',this.state.verif_value_from_file)})
        }else {
            this.setState({
                verif_value_from_file:'0'
            },()=>{console.log('verif_value_from_file :',this.state.verif_value_from_file)})
        }
    }

    //字符转换
    fomatStr =(str)=>{
        var new_str = str.replace(/#`#/g,',')
        console.log('str:',new_str)
        return new_str

    }

    render(){
        const {project,method,datatype } = this.state;
        const parms_items = this.state.parms.split("|~|")
        return(
            <Page title="用例详情" loading={this.state.isLoading} >
                <div style={{flex:1,display:'flex',justifyContent:'flex-end',marginRight:50,}}>
                    <Button style={{marginLeft:10,marginBottom:20,backgroundColor:'#49a9ee'}} onClick={this.handleSubmit}>保存修改</Button>
                </div>
                <div style={{marginBottom:100}}>
                    <div style={{marginLeft:50,marginRight:50}}>
                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>所属项目:
                                </span>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',flex:6}}>
                                <Select  defaultValue={project} style={{ minWidth: 120 }} onChange={this.handleProjectChange}>
                                    {this.state.projects.map((item)=>{
                                        return(
                                            <Select.Option value={item.project_key}>{item.project_key}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>数据类型:
                                </span>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',flex:6}}>
                                <Radio.Group value={datatype} onChange={this.handleDatatypeChange}>
                                    <Radio.Button value="test">测试版数据</Radio.Button>
                                    <Radio.Button value="release">正式版数据</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                        <div style={{marginTop:40,marginBottom:40,height:1,backgroundColor:'#d9d9d9',width:'80%'}}></div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>用例名称:
                                </span>
                            </div>
                            <div style={styles.input_box_back}>
                                <Input
                                    value={this.state.test_name}
                                    onChange = {(value)=>{this.setState({test_name:value.target.value})}}
                                    style={{ width: '60%' }}
                                    placeholder="请输入英文用例名称"
                                />
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-start'}}>
                                <span style={{marginRight:30,fontSize:15,whiteSpace:'nowrap',marginTop:10,display:'flex',flexDirection:'row'}}>
                                    <p style={{color:'red',marginRight:5}}>*</p>用例描述:
                                </span>
                            </div>
                            <div style={styles.input_box_back}>
                                <TextArea
                                    value={this.state.test_description}
                                    onChange = {(value)=>{this.setState({test_description:value.target.value},()=>{console.log('test_description :',this.state.test_description)})}}
                                    placeholder="请输入用例描述信息..."
                                    autosize={{ minRows: 2, maxRows: 6 }}
                                    style={{ width: '60%' }}
                                />
                            </div>
                        </div>

                        <div style={{marginTop:40,marginBottom:40,height:1,backgroundColor:'#d9d9d9',width:'80%'}}></div>


                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>接口路径:
                                </span>
                            </div>
                            <div style={styles.input_box_back}>
                                <Input
                                    value={this.state.path}
                                    onChange = {(value)=>{this.setState({path:value.target.value},()=>{console.log('path :',this.state.path)})}}
                                    style={{ width: '60%' }}
                                    placeholder="请输入接口路径，eg: '/test/path'"
                                />
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>请求方式:
                                </span>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',flex:6}}>
                                <Radio.Group value={method} onChange={this.handleMethodChange}>
                                    <Radio.Button value="post">POST</Radio.Button>
                                    <Radio.Button value="post_and_save_cookie">POST and save cookie</Radio.Button>
                                    <Radio.Button value="post_with_cookie">POST with cookie</Radio.Button>
                                    <Radio.Button value="get">GET</Radio.Button>
                                    <Radio.Button value="post_file">POST file</Radio.Button>
                                </Radio.Group>
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    是否保存返回数据:
                                </span>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',flex:6}}>
                                <div style={{marginLeft:10,padding:3}}>
                                    <Switch checked={this.state.need_save_response==="1"} onChange={(e)=>this.isNeedSaveResponse(e)}></Switch>
                                </div>
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-start'}}>
                                <span style={{marginRight:30,fontSize:15,whiteSpace:'nowrap',marginTop:10}}>
                                    请求参数:
                                </span>
                            </div>
                            <div style={styles.input_box_back}>
                                {parms_items.map((item_value,index)=>{
                                    item_value = item_value.split(",")
                                    return(
                                        <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                                            <div>
                                                <Input
                                                    value={item_value[1]}
                                                    onChange = {(e)=>this.getParmsKeyInput(index,e)}
                                                    style={{ width: '100%' }}
                                                    placeholder="key"/>
                                            </div>
                                            <div style={{marginLeft:10}}>
                                                {item_value[3]==="1"?
                                                    <Autocomplete
                                                        getItemValue={(item) => item.label}
                                                        items={this.state.autoCompleteItems}
                                                        renderItem={(item, isHighlighted) =>
                                                            <div style={{ background: isHighlighted ? 'lightgray' : 'white'}}>
                                                                {item.label}
                                                            </div>
                                                        }
                                                        value={this.fomatStr(item_value[2])}
                                                        wrapperStyle={{ position: 'relative', display: 'inline-block',zIndex:'99'}}
                                                        onChange = {(e)=>this.getParmsValueInput(index,e)}
                                                        onSelect={(e)=>this.getParmsValueSelect(index,e)}
                                                        inputProps = {{ style:{width: 200,height:28,border:'1px solid #d9d9d9',borderRadius:4}}}

                                                    />
                                                    :
                                                    <Input
                                                        value={this.fomatStr(item_value[2])}
                                                        onChange = {(e)=>this.getParmsValueInput(index,e)}
                                                        style={{ width: 200 }}
                                                        placeholder="value"/>
                                                }
                                            </div>
                                            <div style={{marginLeft:10,padding:3}}>
                                                <Switch checked={item_value[3]==="1"} onChange={(e)=>this.getParmsIsValueFromFile(index,e)}></Switch>
                                            </div>
                                            <Tooltip placement="top"  title={<span>是否需要从保存数据中取参数值:  开启开关,则value取保存数据的指定字段,eg: 'login.companyInfo.companyId'</span>}>
                                                <a style={{marginLeft:10,padding:3}}>提示</a>
                                            </Tooltip>
                                            <div style={{marginLeft:10,padding:3}}>
                                                {parms_items.length > 1 ?
                                                    <Icon type="minus-circle-o" onClick={() => this.remove_key(index)}></Icon>:<div/>}
                                            </div>
                                        </div>
                                    )
                                })}

                                <div style={{marginTop:20}}>
                                    <Button type="dashed" onClick={this.add_parms} style={{ width: '60%' }}>
                                        <Icon type="plus" /> 新增参数
                                    </Button>
                                </div>

                            </div>
                        </div>

                        <div style={{marginTop:40,marginBottom:40,height:1,backgroundColor:'#d9d9d9',width:'80%'}}></div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    <p style={{color:'red',marginRight:5}}>*</p>校验code值:
                                </span>
                            </div>
                            <div style={styles.input_box_back}>
                                <Input
                                    value={this.state.verif_code}
                                    onChange = {(value)=>{this.setState({verif_code:value.target.value},()=>{console.log('verif_code :',this.state.verif_code)})}}
                                    style={{ width: '60%' }}
                                    placeholder="请输入需要校验的code值，eg：0"
                                />
                            </div>
                        </div>

                        <div style={styles.input_box}>
                            <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    是否校验返回数据:
                                </span>
                            </div>
                            <div style={{display:'flex',flexDirection:'row',flex:6}}>
                                <div style={{marginLeft:10,padding:3}}>
                                    <Switch checked={this.state.need_verif_value==="1"} onChange={(e)=>this.isNeedVerifResponse(e)}></Switch>
                                </div>
                            </div>
                        </div>

                        {this.state.need_verif_value === '1'?
                            <div style={styles.input_box}>
                                <div style={styles.input_box_font}>
                                <span style={styles.input_box_font_text}>
                                    返回值校验:
                                </span>
                                </div>
                                <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
                                    <div>
                                        <Input
                                            value={this.state.verif_key}
                                            onChange = {(value)=>{this.setState({verif_key:value.target.value},()=>{console.log('verif_key :',this.state.verif_key)})}}
                                            style={{ width: '100%' }}
                                            placeholder="key"/>
                                    </div>
                                    <div style={{marginLeft:10}}>
                                        {this.state.verif_value_from_file === '0'?
                                            <Input
                                                value={this.state.verif_value}
                                                onChange = {(value)=>{this.setState({verif_value:value.target.value},()=>{console.log('verif_value :',this.state.verif_value)})}}
                                                style={{ width: '100%' }}
                                                placeholder="value"/>
                                            :
                                            <Input
                                                value={this.state.verif_value}
                                                onChange = {(value)=>{this.setState({verif_value:value.target.value},()=>{console.log('verif_value :',this.state.verif_value)})}}
                                                style={{ width: '100%' }}
                                                placeholder="value from file path , eg: userInfo.content.companyId "/>}

                                    </div>
                                    <div style={{marginLeft:10,padding:3}}>
                                        <Switch checked={this.state.verif_value_from_file==='1'} onChange={(e)=>this.isNeedVerifFromFile(e)}></Switch>
                                    </div>
                                    <Tooltip placement="top"  title={<span>是否需要从保存数据中取value值:  开启开关,则value取保存数据的指定字段,eg: 'login.companyInfo.companyId'</span>}>
                                        <a style={{marginLeft:10,padding:3}}>提示</a>
                                    </Tooltip>
                                </div>
                            </div>
                            :
                            <div />}


                    </div>
                </div>

            </Page>
        );
    }
}

var styles = {
    input_box:{
        display:'flex',flexDirection:'row',marginTop:10
    },
    input_box_font:{
        display:'flex',justifyContent:'flex-end',alignItems:'center'
    },
    input_box_font_text:{
        marginRight:30,fontSize:15,whiteSpace:'nowrap',display:'flex',flexDirection:'row'
    },
    input_box_back:{
        flex:6
    }
}

export default InterfaceDetail;
