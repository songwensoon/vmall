<style type="text/css">

/****修改样式增加IE7 CSS HACK begin****/
.spanChoise{*width:130px;*float:left;}
.popLayout {*padding:10px 40px 0 40px;}
/****修改样式增加IE7 CSS HACK end****/
.popLayout .actionBtn{padding-bottom:0px;margin-top:20px;}
.popLayout .agreement{padding:10px 35px 20px 35px;border-bottom:1px  dashed #F0F0F0;margin-bottom:25px;}
.popLayout .agreement .agreementInfo{ text-indent:2em;font-size:13px;line-height:25px;}
.popLayout .remarkIP{font-size:14px;font-weight:bold;margin-right:30px;}
.popLayout .IPCount{margin-left:5px;margin-right:15px;}
.popLayout .remarkCount{margin-bottom:10px;font-size:13px;}
.popLayout .agreement .agreenProct{margin:0 auto;width:300px;font-size:13px;color:#1673b7;margin-top:25px;}
.popLayout .agreement .agreenProct .radio{margin-left:25px;}
.popLayout .chooseList{font-size:13px; vertical-align:middle;line-height:27px;margin-bottom: 5px;height: 27px;}
.popLayout .chooseList span{display:inline-block;*display:inline;*zoom:1;background:#E7F1F8;padding:0 5px;border:1px solid #FFFFFF;margin-right:15px;height:25px;line-height:25px;}
.popLayout .chooseList span .ico.closeBt{background-position:-35px -146px;width: 20px;float: right;margin-top: 4px;margin-left:10px; cursor:pointer;}
.popLayout .chooseList span:hover{border:1px solid #1673B7;}
.popLayout .chooseList span:hover .ico.closeBt{background-position: -55px -146px;}


.zAgreementFont {font-family:"微软雅黑";color:#555;font-size:13px; }
.caption{font-family:"微软雅黑";font-size:16px;}
.textRight{font-family:"微软雅黑";color:#555;font-size:13px;}
.reveiwTable td, .fileInfo{font-family:"微软雅黑";color:#555;font-size:13px;}
</style>

<?php
//显示input框
function input($type='text', $name="", $id="", $value="", $attrs=array())
{
    $str = '<input';
    $str .= ' type="'.$type.'"';
    $str .= !empty($name) ? ' name="'.$name.'"' : '';
    $str .= !empty($name) ? ' id="'.(!empty($id) ? $id : $name).'"' : '';
    $str .= ' value="'.$value.'"';
    if (!empty($attrs))
    {
        foreach($attrs as $k => $v)
        {
            $str .= ' '.$k.'="'.addslashes($v).'"';
        }
    }
    $str .= ' />';
    
    return $str;
}
$issame = $this->getRequest()->getParam('issame');
$icpType = $this->getRequest()->getParam('icpType');
if($issame==0)
{
	$uploadfiles = $this->getUploadType(array('_masteridcardup','_certphoto','_owneridcardup','_authbook','_true','_safe','_domaincert','_approve'));
}else
{
	$uploadfiles = $this->getUploadType(array('_certphoto','_owneridcardup','_safe','_domaincert','_approve'));
}

$inputs = $this->getData('inputs');
$preApproval = $this->getRequest()->getParam('preApproval');

$preApproval = preg_replace('/^;+/', '', $preApproval);
$preApproval = preg_replace('/;+$/', '', $preApproval);
?>
<style type="text/css">
    .loginBox .loginMid .greenBtn strong { width: 240px; }
    .remark .caseList p {margin-bottom: 10px;padding-right: 220px;}
    .greenBtn, .greenBtn span, .greenBtn strong, .blueBtn, .blueBtn span, .blueBtn strong { font-size:0; line-height:0;  background-color:transparent; background-image:url(<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/greenBtn.png); background-position:0 0; background-repeat:no-repeat; display:inline-block;height:48px;}
    .greenBtn:hover, .greenBtn:hover span, .greenBtn:hover strong{ background-image:url(<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/greenBtn_hover.png);}
    .greenBtn span, .blueBtn span { background-position:right -100px;}
    .greenBtn strong, .blueBtn strong { color:#fff; font-size:16px; font-weight:normal; line-height:48px; text-align:center; margin:0 10px; background-position:0 -50px; background-repeat:repeat-x;}
    .remark .greenBtn, .remark .greenBtn span,  .remark .greenBtn strong{ font-size:0; line-height:0;  background-color:transparent; background-image:url(<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/greenSmall.png); background-position:0 0; background-repeat:no-repeat; display:inline-block;height:32px;}
    .remark .greenBtn span{ background-position:right -66px;}
    .remark .greenBtn strong{ color:#fff; font-size:14px; font-weight:normal; line-height:32px; text-align:center; margin:0 10px; min-width:80px; background-position:0 -33px; background-repeat:repeat-x;}
    .remark p .greenBtn:first-child{margin-left:30px;margin-right:10px;}
    .blueBtn, .blueBtn span, .blueBtn strong {
        background-image: url("<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/blueBtn.png");
    }
    .remark .detailText {
        margin-bottom: 20px;
        margin-left: 10px;
        margin-right: 40px;
    }
    .remark .detailText span {
        background: url("<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/sure.png") no-repeat scroll 0 0 transparent;
        display: inline-block;
        float: left;
        height: 18px;
        margin-right: 5px;
        margin-top: -2px;
        width: 18px;
    }
    .remark .btnBox {
        margin: 0;
        text-align: center;
    }
    
    .blueBtn, .blueBtn span, .blueBtn strong {
        background-image: url("<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/blueBtn.png");
    }
    .detailItem dd p{height:30px; line-height:30px;} 
    .floatLeft{float:left; padding-left:215px; width:200px; text-align:right;}
</style>

<div class="main vBg ">
	<div class="layout clearfix">
		<div class="leftPanel">
			<dl class="typeList">
                <dt><a href="javascript:void(0);">备案管理</a></dt>
				<dd class="selected"><a href="/customer/consoleicp/icpconsole">我的备案</a></dd>
				<dd><a href="/customer/consoleicp/insconsole">备案指导</a></dd>
			</dl>
		</div>
		 <!--步骤开始-->
        
		<div class="rightPanel remark">
			<div class="headline"><b>新增备案</b><a class="tinyBtn" href="/customer/consoleicp/icpconsole"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/arrow.png" class="arrowLeft"/>返回列表</strong></span></a><p><i></i></p>
            </div>
            <dl class="centerAlign pb0">
    			<dd>
    				<dl class="flowpath">
    					<dd>
    						<ul class="step2">
    							<li class="first sel"><div><p><i>1</i></p><span>填写备案信息</span></div></li>
    							<li class="col2 sel"><div><p><i>2</i></p><span>上传资料</span></div></li>
    							<li class="last"><div><p><i>3</i></p><span>发布网站</span></div></li>
    						</ul>
    					</dd>
    				</dl>
    			</dd>
    		</dl>

			<div class="copyrightItem">
				<div class="topLeft"><div class="topRight"><div class="topCenter"></div></div></div>
				<div class="centerWarp">
				    <form name="stepform" id="stepform" method="post" onsubmit="javascript: return false ;">
					<ul class="caseList">
						<li>
							<h1 class="caption">上传备案资料与图片</h1>
							<span id="icpFileProgressContainerZ" style="display:none;"></span>
							<dl class="detailItem clearfix uploadBlock">
								<dd>
									<p>
									    <span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>法人代表的身份证
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_owneridcardup']['name'];?>" class="greenBtn" href="javascript:void(0);">
									   		<span><strong>
									    	<img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传
									    	</strong></span>
									    	</a>
									    </span><!--<a href="#">查看样例</a>-->
										<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_owneridcardup']['value'];?>]" value="" />
									</p>
									<!--<p>
									    <span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>法人代表的身份证反面
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_owneridcarddown']['name'];?>" class="greenBtn" href="javascript:void(0);">
									   		<span><strong>
									    	<img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传
									    	</strong></span>
									    	</a>
									    </span><a href="#">查看样例</a>
										<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_owneridcarddown']['value'];?>]" value="" />
									</p>-->
									<p>
									    <span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>企业证件照
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_certphoto']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
									<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_certphoto']['value'];?>]" value="" />
									</p>
									<?php 
									if($issame==0)
									{
									?>
									<p>
									    <span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>网站负责人的身份证
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_masteridcardup']['name'];?>" class="greenBtn" href="javascript:void(0);">
									   		<span><strong>
									    	<img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传
									    	</strong></span>
									    	</a>
									    </span><!--<a href="#">查看样例</a>-->
										<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_masteridcardup']['value'];?>]" value="" />
									</p>
									<!--<p>
									    <span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>网站负责人的身份证反面
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_masteridcarddown']['name'];?>" class="greenBtn" href="javascript:void(0);">
									   		<span><strong>
									    	<img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传
									    	</strong></span>
									    	</a>
									    </span><a href="#">查看样例</a>
										<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_masteridcarddown']['value'];?>]" value="" />
									</p>-->
									<p>
										<span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>网站负责人授权书
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_authbook']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
									<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_authbook']['value'];?>]" value="" />
									</p>
									
									<p>
										<span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>网站备案信息真实性核验单
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_true']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
									<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_true']['value'];?>]" value="" />
									</p>
									<?php 
									}
									?>
									<p>
										<span class="floatLeft">
									    	<span class="upresult"></span>
									    	互联网域名证书
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_domaincert']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
									<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_domaincert']['value'];?>]" value="" />
									</p>
									
									<p><span class="floatLeft">
									    	<span class="upresult"></span>
									    	<font color="red">*</font>信息安全责任书
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_safe']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
									<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_safe']['value'];?>]" value="" />
									</p>
									<p>
										<span class="floatLeft">
									    	<span class="upresult"></span>
									    	<?php if($preApproval!=-1){?><font color="red">*</font><?php }?>前置审批材料
									    	<span class="closebtn" style="display:none;"><a href="javascript:;"><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/clearcart.png" /></a></span>
									    </span>
									    <span><a id="<?php echo 'ubtn_'.$uploadfiles['_approve']['name'];?>" class="greenBtn" href="javascript:void(0);"><span><strong><img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/cicle_arrow.png" class="upArrow"/>点击上传</strong></span></a></span><!--<a href="#">查看样例</a>-->
										<input type="hidden" name="uploadfile[<?php echo $uploadfiles['_approve']['value'];?>]" value="" />
									</p>
									
								</dd>
							</dl>

						</li>
						<li>
							<!--<h1 class="caption">备案协议</h1>-->
							<dl class="detailItem clearfix">
								<div class="detailText">请您根据报备网站的服务内容发布网站。您发布网站后，我们会对网站内容进行核查，如果和报备内容不符，我们将对您的网站资源做停封处理</div>
                                
                                <div class="detailText" onclick="checkBoxChange();"><span style="cursor:pointer;"></span><p>我已经阅读了所有的<a id="readICP" href="javascript:void(0);">备案协议</a>,并保证自己所提交的资料合法真实。</p></div>
                                	<input type="hidden" id="checkBoxValue" value="0" />
                                <div class="remarkBox">
                                	
                                <div class="btnBox">
                                <input type="hidden" name="url" value="<?php echo $_SERVER['REQUEST_URI'];?>" />
                                    <a href="/customer/consoleicp/newconsole/backtag/1" style="margin-right:100px;">< 返回<a/>
                                    <a id="submitbtn" class="blueBtn" href="javascript:void(0);"><span><strong>提交备案</strong></span></a>
                                </div>
							</dl>
						</li>
						<?php
						if(!empty($inputs))
						{
						    foreach($inputs as $k => $v)
						    {
						        echo input('hidden', $k, $k, $v);
						    }
						}
						?>
					</ul>
				    </form>
				</div>
				<div class="bottomLeft"><div class="bottomRight"><div class="bottomCenter"></div></div></div>
			</div>
		</div>
	</div>
</div>

<!--备案协议 begin-->
<div id="zAgreement" class="popLayout zAgreementFont" style="display:none;">
	  <div class="agreement">
      		<p class="agreementInfo">中国移动为移动云客户提供免费的ICP代备案服务。客户开通公网IP的http访问权限前，需申请ICP备案，移动
会有专人联系您提供ICP备案服务。</p>
          <p class="agreementInfo">请您根据报备网站的服务内容发布网站。您发布网站后，我们会对网站内容进行核查。如果和报备内容不符，
我们将对您的网站资源做停封处理。</p>
          <p class="agreementInfo">提交备案后，在备案完成前不可通过系统修改备案信息，如需修改信息请联系移动云服务台退回。</p>
		    
      </div>
      
</div>

<script type="text/javascript" src="/js/basic.js"></script>
<div id="dialog_alert">
</div>

<script language="javascript" type="text/javascript">
$(function(){
	$("#consoleicp_icpconsole").addClass('sel');
	$('.detailText span:first').css({'background':'url("/skin/frontend/default/default/images/checkbox_unselect.png") no-repeat scroll 0 0 transparent'});
	})
function checkBoxChange(){
	if($("#checkBoxValue").val()==1){
		$('.detailText span:first').css({'background':'url("/skin/frontend/default/default/images/checkbox_unselect.png") no-repeat scroll 0 0 transparent'});
		$("#checkBoxValue").val("0");
	}else{
		$('.detailText span:first').css({'background':'url("/skin/frontend/default/default/images/sure.png") no-repeat scroll 0 0 transparent'});
		$("#checkBoxValue").val("1");
	}
}

$('#readICP').bind('click',function(){
    dialog_open('zAgreement',600,'auto','备案协议',true,'确定',''); 
    checkBoxChange();  
});
</script>

<style type="text/css">
<?php
for($i=0 ; $i<10; $i++)
{
?>
    #SWFUpload_<?php echo $i;?>{ display:inline-block; background-image:url(/skin/frontend/default/default/images/upload.png);  background-repeat: no-repeat; margin-left:24px;}
	#SWFUpload_<?php echo $i;?>:hover{background-image:url(/skin/frontend/default/default/images/upload.png);  background-repeat: no-repeat; }
<?php
}
?>
</style>

<script type="text/javascript">
    
    $('.closebtn a').click(function(){
        var p = $(this).parent().parent();
        p.find('.upresult').html('');
        $(this).parents("p").find(':hidden').val('');
        $(this).parent().hide();
    });
    
    var send = false;
    $('#submitbtn').click(function(){
        var uploadTag = true ;
        $('.uploadBlock').find('input').each(function(){
            if($(this).val() == '')
            {
            	if($(this).attr("name") == 'uploadfile[6]'){
            		
            	}else{
	            	<?php if($preApproval=='-1'){?>
	            		
	            	if($(this).attr("name") == 'uploadfile[7]'){
	            		
	            	}else{
	            		uploadTag = false;
	            	}
	            	<?php }else{?>
	            	  	uploadTag = false; 
	            	<?php }?>
            	}
            }    
        });
        if(!uploadTag)
        {
            dialog_alert('请上传附件！','','提示','确定');  
            return;  
        }
        var checkBoxValue = $('#checkBoxValue').val();
        if(checkBoxValue==0){
        	dialog_alert('请确认已阅读所有的备案协议，并保证您所提交的资料合法真实！','','提示','确定');  
            return;  
        }
        if(send)    return false;
        
        send = true;
        $.post('/customer/consoleicp/saveicp', $('#stepform').serializeArray(), function(res){
            if(res.status==1)
            {
                document.location.href = '/customer/consoleicp/resconsole/icpType/<?php echo $icpType;?>/';
            }else if(res.status==2)
            {
            	dialog_alert(res.message,'/customer/consoleicp/icpconsole','提示','确定'); 
            }
            else
            {
                dialog_alert(res.message, '', '提示', '确定');
                send = false;
                return;
            }
        },'json');
    });
    
	<?php
	if(!empty($uploadfiles))
	{
	    foreach($uploadfiles as $k => $v)
	    {
	?>
		var swfu<?php echo '_'.$k;?> = new SWFUpload({
			// Backend Settings
			upload_url: "<?php echo $this->getUrl('customer/consoleicp/uploadicpfile') ?>?get"+Math.random(),
			post_params: {"PHPSESSID": "<?php echo session_id(); ?>"},

			// File Upload Settings
			file_size_limit : "2 MB",// 5MB
			file_types : "*.bmp;*.jpg;*.tiff;*.gif;*.jpeg;*.png;*.doc;*.docx",
			file_types_description : "bmp;jpg;tiff;gif;jpeg;png;doc;docx",
			file_upload_limit : "0",
			file_post_name: "icpfilename",
			file_queue_error_handler: function(file, errorCode, message){
				try {
					var errorName = "";
					if (errorCode === SWFUpload.errorCode_QUEUE_LIMIT_EXCEEDED) {
						errorName = '您试图上传的文件太多。';
					}
			
					if (errorName !== "") {
						dialog_alert(errorName);
						return;
					}
					switch (errorCode) {
					case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
						dialog_alert('不能上传小于0字节的文件','','提示','确定');
						break;
					case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
						dialog_alert('文件大小不能超过2M','','提示','确定');
						break;
					case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
						dialog_alert('不支持该类文件格式','','提示','确定');
						break;
					default:
						dialog_alert(message);
						break;
					}
				} catch (ex) {
					this.debug(ex);
				}
			},
			// Event Handler Settings - these functions as defined in Handlers.js
			file_dialog_complete_handler : function(numFilesSelected, numFilesQueued){if (numFilesQueued > 0) {$('input[name="uploadfile[<?php echo $v['value'];?>]"]').parent().find('.upresult').html('');$('input[name="uploadfile[<?php echo $v['value'];?>]"]').parent().find('.closebtn').hide();this.startUpload();}},
			upload_error_handler : function(){},
			upload_success_handler : function(fileObj, server_data){
			    $('input[name="uploadfile[<?php echo $v['value'];?>]"]').val(server_data);
			    $('input[name="uploadfile[<?php echo $v['value'];?>]"]').parent().find('.upresult').html('<img src="<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/checkbox_select.png">');
			    $('input[name="uploadfile[<?php echo $v['value'];?>]"]').parent().find('.closebtn').show();
			},
			upload_complete_handler : function(){},
			
			// Button Settings
			button_image_url : "<?php echo $this->getSkinUrl('images/upload.png')?>",
			button_placeholder_id : "<?php echo 'ubtn_'.$v['name'];?>",
			button_width: 80,
			button_height: 30,
			button_text : '<span class="button"></span>',
			button_text_style : '.button { background-color:#80b13a; font-family: Helvetica, Arial, sans-serif; font-size: 12pt; } .buttonSmall { font-size: 10pt; }',
			button_text_top_padding: 1,
			button_text_left_padding: 20,
			button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor: SWFUpload.CURSOR.HAND,
			button_action: -100,
			// Flash Settings
			flash_url : "<?php echo Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_JS);?>swfupload/swfupload.swf",

			custom_settings : {
				upload_target : "icpFileProgressContainerZ"
			},
			// Debug Settings
			debug: false
		});
	<?php
        }
    }
	?>
</script>
