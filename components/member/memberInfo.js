import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { MemberWrapper , Clearfix} from '../../styled/memberStyled';
import IoEdit from 'react-icons/lib/io/edit';
import IoLoadA from 'react-icons/lib/io/load-a';
import timeFormat from '../common/timeFormat';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {memberSite} from '../common/memberSite';

//api
import * as memberAPI from '../../actions/memberAPI';

class MemberInfo extends React.Component {
	constructor(props){
		super(props);

		this.onLogoFileChange = this.onLogoFileChange.bind(this);
		this.readFileSourceToURL = this.readFileSourceToURL.bind(this);
		this.dataURLtoBlob = this.dataURLtoBlob.bind(this);

		this.editBtnClick = this.editBtnClick.bind(this);
		this.cancelBtnClick = this.cancelBtnClick.bind(this);
		this.emailOnChange = this.emailOnChange.bind(this);
		this.nameOnChange = this.nameOnChange.bind(this);
		this.birthdayOnChange = this.birthdayOnChange.bind(this);
		this.asiaOnChange = this.asiaOnChange.bind(this);
		this.updateMemberDetail = this.updateMemberDetail.bind(this);
		this.updateMemberNickName = this.updateMemberNickName.bind(this);


		this.state = {
			isLoading:this.props.isLoading,
			isSubmitLoading:false,
			isError:this.props.isError,
			memberDetail:'',
			propsMemberDetail:'',
			nickname:'',
			propsNickName:'',
			isEditMode:false,
			startDate:moment().utcOffset('+0800'),
			photo:'./static/member/default-avatar.png',
			updatePhoto:"",
			file:'',
			location:'http://localhost:3000'
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.memberDetail !== this.state.memberDetail && nextProps.nickname !== this.state.nickname){

			this.setState({
				isLoading:nextProps.isLoading,
				isError:nextProps.isError,
				memberDetail:Object.assign({},nextProps.memberDetail),
				nickname:Object.assign({},nextProps.nickname),

			},()=>{
				let deepCopyNickname = JSON.parse(JSON.stringify(this.state.nickname));
				let deepCopyDetail = JSON.parse(JSON.stringify(this.state.memberDetail));

				this.setState({
					propsMemberDetail:deepCopyDetail,
					propsNickName:deepCopyNickname
				})
			})
		}

	}

	componentDidMount(){
		this.setState({
			location:window.location
		})
	}

	onLogoFileChange(e) {

		var files = e.target.files;
	    if(files.length > 0) {

	    	var file = files[0];
	    	this.readFileSourceToURL(file);

	    }
	}

	readFileSourceToURL(file, callback) {

    	var fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
            var source = this.dataURLtoBlob(e.target.result);
            var imageurl = window.URL.createObjectURL(source);

            this.setState({
    			updatePhoto: imageurl,
    			file: fileReader.result,
    		});

        }
    }

    dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    }

	editBtnClick(){
		this.setState({
			isEditMode:true
		},()=>{
			document.getElementById("pickerMember").readOnly = true;
		});
	}

	cancelBtnClick(){

		let deepCopyNickname = JSON.parse(JSON.stringify(this.state.propsNickName));

		this.setState({
			isEditMode:false,
			memberDetail:this.state.propsMemberDetail,
			nickname:deepCopyNickname,
			updatePhoto: this.state.memberDetail.photo_url ? `https://img.ezding.com.tw${this.state.memberDetail.photo_url}?${Date.now()}` : this.state.photo
		});
	}

	emailOnChange(e){
		const memberDetail = this.state.memberDetail;
		memberDetail.email = e.target.value;
		this.setState({
			memberDetail,
		});
	}

	nameOnChange(e){
		const nickname = this.state.nickname;
		nickname.inv_data.nick_name = e.target.value;

		this.setState({
			nickname,
		});
	}

	birthdayOnChange(date){

		const memberDetail = this.state.memberDetail;
		memberDetail.birthday = moment.utc(date);

		this.setState({
	      startDate: date,
	      memberDetail
	    });
	}

	asiaOnChange(e){
		const memberDetail = this.state.memberDetail;
		memberDetail.asiamiles_no = e.target.value;
		this.setState({
			memberDetail,
		});
	}

	updateMemberDetail(){
		const memberDetail = this.state.memberDetail;

		let token = localStorage.getItem('accessToken');
		let name = memberDetail.name;
		let email = memberDetail.email;
		let birthday = memberDetail.birthday;
		let asiamiles_no = memberDetail.asiamiles_no;
		let base64_image = this.state.file;

		if(asiamiles_no.length !== 10 && asiamiles_no.length > 0){
				alert('亞洲萬里通卡號格式錯誤');
		}else{
			this.setState({
				isSubmitLoading:true,
			});

			memberAPI.updateMemberDetail(token,name,email,birthday,asiamiles_no,base64_image)
			.then((result)=>{

				if(result.code !== "200" && result.code !== "401.103"){
					alert(result.message);
					this.setState({
						isSubmitLoading:false,
					});
				}else if(result.code === "401.103"){
					this.props.alertShow(true);
					this.setState({
						isSubmitLoading:false,
					});
				}else{
					this.updateMemberNickName(token);
				}
			})
			.catch(error=>{
				this.props.alertShow(true);

			})
		}
	}
	updateMemberNickName(token){
		let inv_receiver = this.props.nickname.inv_data.inv_receiver;
		let inv_gender = this.props.nickname.inv_data.inv_gender;
		let inv_zip = this.props.nickname.inv_data.inv_zip;
		let inv_city_id = this.props.nickname.inv_data.inv_city_id;
		let inv_town_id = this.props.nickname.inv_data.inv_town_id;
		let inv_address = this.props.nickname.inv_data.inv_address;
		let cinema_id = this.props.nickname.inv_data.cinema_id;
		let nick_name = this.state.nickname.inv_data.nick_name;


		memberAPI.updateMemberNickName(token,inv_receiver,inv_gender,inv_zip,inv_city_id,inv_town_id,inv_address,cinema_id,nick_name)
		.then((result)=>{
			if(result.code === "401.103"){
				this.props.alertShow(true);
				this.setState({
					isSubmitLoading:false,
				});

			}else{
				this.setState({
					isEditMode:false,
					isSubmitLoading:false
				})
			}
		})
		.catch(error=>{
			this.props.alertShow(true);
		})
	}

	render () {

		if(this.state.isLoading){
			 return (
			    <MemberWrapper part={this.props.part}>
			    	<div className="infoWrapper">
			    		<div className="infoBox">
			    			<div className="info">個人資訊</div>
							{
								!this.state.isEditMode?
								<IoEdit className="editIcon" onClick={this.editBtnClick}/>
								:
								null
							}
			    		</div>

			    		<div className="photo"></div>

			    		<div className="section name">
			    			<div className="title">暱稱</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section mail">
			    			<div className="title">E-mail</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section birthday">
			    			<div className="title">出生日期</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section card">
			    			<div className="title">亞洲萬里通卡號</div>
			    			<div className="content"></div>
			    		</div>

				    	<Clearfix />
					    <div className="wrapper phone">
					    	<div className="text">帳號</div>
					    </div>

				    	<Clearfix />
			    	</div>
			    </MemberWrapper>
		    )
		}
		else if(this.state.memberDetail){

			let photo = this.state.updatePhoto ? this.state.updatePhoto : this.state.memberDetail.photo_url ? `https://img.ezding.com.tw${this.state.memberDetail.photo_url}?${Date.now()}` : this.state.photo;
			let birthday = this.state.memberDetail.birthday ? timeFormat.birthday(this.state.memberDetail.birthday): "";

			let endpoint = memberSite(this.state.location.host);
  			let passwordUrl = `${endpoint}/MemberUI/users/password?redirect_uri=${this.state.location.origin}/&access_token=${localStorage.getItem('accessToken')}`;
			return (
				<div>
				    <MemberWrapper part={this.props.part}>
				    	<div className="infoWrapper">
				    		<div className="infoBox">
				    			<div className="info">個人資訊</div>
								{
									!this.state.isEditMode?
									<IoEdit className="editIcon" onClick={this.editBtnClick}/>
									:
									null
								}
				    		</div>


							{ this.state.isEditMode ?
								<div className="photo file" style={{backgroundImage:`url(${photo})`}}>
									<input type="file" onChange={this.onLogoFileChange}/>
									<div className="mask"></div>
								</div>
								:
								<div className="photo" style={{backgroundImage:`url(${photo})`}}></div>
							}

							<div className="section name">

				    			<div className="title">暱稱</div>
				    			{ this.state.isEditMode ?
									<input type="text" onChange={this.nameOnChange} value={this.state.nickname.inv_data.nick_name == null ? '' : this.state.nickname.inv_data.nick_name} maxLength="20" />
									:
									<div className="content">{this.state.nickname.inv_data.nick_name}</div>}
				    		</div>
				    		<div className="section mail">
				    			<div className="title">E-mail</div>
				    			{ this.state.isEditMode ? <input type="text" onChange={this.emailOnChange} value={this.state.memberDetail.email} /> : <div className="content">{this.state.memberDetail.email}</div>}
				    		</div>
				    		<div className="section birthday">
				    			<div className="title">出生日期</div>
				    			{ this.state.isEditMode ?
				    				<DatePicker id="pickerMember"
										dateFormat={"YYYY"+'年'+"MM"+'月'+"DD"+'日'}
										selected={this.state.startDate}
										onChange={this.birthdayOnChange}
										className="date"
										peekNextMonth
									    showYearDropdown
									    showMonthDropdown
									    scrollableYearDropdown
									    yearDropdownItemNumber={5}
										onKeyDown={e => e.preventDefault()}
									/>
				    				:
				    				<div className="content">{birthday}</div>}
				    		</div>
				    		<div className="section card">
				    			<div className="title">亞洲萬里通卡號</div>
				    			{ this.state.isEditMode ? <input type="text" onChange={this.asiaOnChange} value={this.state.memberDetail.asiamiles_no} maxLength="10" /> : <div className="content">{this.state.memberDetail.asiamiles_no}</div>}
				    		</div>
				    		{ this.state.isEditMode ?
					    		<div className="section submitbox">
					    			<div className="submit" onClick={this.updateMemberDetail}>確認
					    				{this.state.isSubmitLoading ? <IoLoadA className="loadingIcon"/> : null}
					    			</div>
					    			<div className="cancel" onClick={this.cancelBtnClick}>取消</div>
					    		</div>
					    		:
					    		null
					    	}
					    	<Clearfix />
						    <div className="wrapper phone">
						    	<div className="text">帳號 <span>{this.state.memberDetail.mobile}</span></div>
						    	<a href={passwordUrl}>
						    		<div className="pswBtn">修改密碼</div>
						    	</a>
						    </div>
						    <Clearfix />
				    	</div>
				    	<Clearfix />
				    </MemberWrapper>

			    </div>
		    )
		}
	   else if(this.state.isError){
			return (
			    <MemberWrapper part={this.props.part}>
			    	<div className="infoWrapper">
			    		<div className="infoBox">
			    			<div className="info">個人資訊</div>
							{
								!this.state.isEditMode?
								<IoEdit className="editIcon" onClick={this.editBtnClick}/>
								:
								null
							}
			    		</div>

			    		<div className="photo"></div>

			    		<div className="section name">
			    			<div className="title">暱稱</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section mail">
			    			<div className="title">E-mail</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section birthday">
			    			<div className="title">出生日期</div>
			    			<div className="content"></div>
			    		</div>

			    		<div className="section card">
			    			<div className="title">亞洲萬里通卡號</div>
			    			<div className="content"></div>
			    		</div>

				    	<Clearfix />
					    <div className="wrapper phone">
					    	<div className="text">帳號</div>
					    </div>

				    	<Clearfix />
			    	</div>
			    </MemberWrapper>
		    )
		}
  }
}

export default MemberInfo;
