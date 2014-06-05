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

//显示下拉框
//$value为二维数组，每一维需要 title, value, selected 三个键
function dropbox($name='', $id='', $value=array(), $changejs = '')
{
    if(!empty($value))
    {
        foreach($value as $k => $v)
        {
            if(empty($v['title']) || empty($v['value']))    unset($value[$k]);
            
            $value[$k] = array(
                'title' => $v['title'],
                'value' => $v['value'],
                'selected' => !empty($v['selected']) ? true : false,
            );
        }
    }
    
    $str = '<div class="oType" id="'.$id.'"></div>';
    $str .= '<input type="hidden" name="'.$name.'" value="">';
    $str .= '<script type="text/javascript">';
    $str .= 'dp'.$id.' = new ucd.Droplist({
                container:$("#'.$id.'"),
                data:'.json_encode(array_values($value)).',
                width:"190",
                inputEnable:false,
                onValueChange:function(){
                    $(\'input[name="'.$name.'"]\').val( this.getValueString() );
                    '.$changejs.'
                }
            });';
    $str .= '</script>';
    
    return $str;
}

$info = $this->getIcpInfo();
$allip = $this->getData('allIp');
$icpinfo = $this->getData('icpinfo');

$area = $this->getCompArea();
$province = array();
foreach(array_keys($area) as $v)
{
    $province[] = array(
        'title' => $v,
        'value' => $v,
        'selected' => ($v==$icpinfo['enterpriseInfo']['province']?true:false),
    );
}
if(empty($icpinfo['enterpriseInfo']['province']))
{
    $firstprovince = current($province);
    $firstprovince = $this->getCompArea($firstprovince['value']);
}
else
{
    $firstprovince = $this->getCompArea($icpinfo['enterpriseInfo']['province']);
}

$city = array();
foreach($firstprovince as $v)
{
    $city[] = array(
        'title' => $v,
        'value' => $v,
        'selected' => ($v==$icpinfo['enterpriseInfo']['city'] ? true : false )
    );
}

$info['_servertype']['value'] = '';
$info['_boforecheck']['value'] = '';
$issame = 0;
if(!empty($allip)) $info['_ip']['value'] = $allip;
if(!empty($icpinfo))
{
    $info['_ip']['value'] = $icpinfo['icpInfo']['publicIp'];
    $info['_type']['value'] = $icpinfo['icpInfo']['icpType'];
    $info['_code']['value'] = $icpinfo['icpInfo']['icpCode'];
    $info['_domain']['value'] = $icpinfo['icpInfo']['domain'];
    $info['_icpno']['value'] = $icpinfo['icpInfo']['icpNum'];
    $info['_certtype']['value'] = $icpinfo['icpInfo']['certificateType'];
    $info['_certno']['value'] = $icpinfo['icpInfo']['certificateNum'];
    $info['_sitename']['value'] = $icpinfo['icpSiteInfo']['name'];
    $info['_existsdomain']['value'] = $icpinfo['icpSiteInfo']['domain'];
    $info['_siteurl']['value'] = $icpinfo['icpSiteInfo']['homeUrl'];
    $info['_servertype']['value'] = $icpinfo['icpSiteInfo']['serviceContent'];
    $info['_boforecheck']['value'] = $icpinfo['icpSiteInfo']['preApproval'];
    $info['_servertyperemark']['value'] = $icpinfo['icpSiteInfo']['otherSC'];
	
	$info['_enterprisecerttype']['value'] = $icpinfo['enterpriseInfo']['certificateType'];
	$info['_enterprisecertno']['value'] = $icpinfo['enterpriseInfo']['certificateNum'];
	$info['_name']['value'] = $icpinfo['enterpriseInfo']['name'];
	
	$info['_legalcerttype']['value'] = $icpinfo['siteChargeInfo']['legalCerType'];
	$info['_legalcertno']['value'] = $icpinfo['siteChargeInfo']['legalCerNum'];
	$info['_legalname']['value'] = $icpinfo['siteChargeInfo']['legalName'];
	
	$info['_chargecerttype']['value'] = $icpinfo['siteChargeInfo']['chargeCerType'];
    $info['_chargecernum']['value'] = $icpinfo['siteChargeInfo']['chargeCerNum'];
    $info['_orgtype']['value'] = $icpinfo['enterpriseInfo']['orgType'];
    $info['_chargename']['value'] = $icpinfo['siteChargeInfo']['chargeName'];
    $info['_certificateaddr']['value'] = $icpinfo['enterpriseInfo']['certificateAddr'];
    $info['_address']['value'] = $icpinfo['enterpriseInfo']['address'];
    $info['_investor']['value'] = $icpinfo['enterpriseInfo']['investor'];
   
    $info['_officetel']['value'] = $icpinfo['siteChargeInfo']['officeTel'];
    $info['_mobile']['value'] = $icpinfo['siteChargeInfo']['mobile'];
    $info['_email']['value'] = $icpinfo['siteChargeInfo']['email'];
    $info['_remark']['value'] = $icpinfo['siteChargeInfo']['remark'];
    
    if(($info['_legalcerttype']['value']==$info['_chargecerttype']['value'])&&($info['_chargecernum']['value']==$info['_legalcertno']['value'])&&($info['_chargename']['value']==$info['_legalname']['value']))
    {
    	$issame = 1;
    }else if (!empty($info['_chargename']['value']) && !empty($info['_chargecernum']['value'])){
    	$issame = 0;
    }
}
$icptype = $this->getIcpType($info['_type']['value']);

$sitetype = $this->getWebsiteType($info['_servertype']['value']);
$approve = $this->getApprove($info['_boforecheck']['value']);

$legalcerttype = $this->getCertType($info['_legalcerttype']['value']);
$chargecertype = $this->getCertType($info['_chargecerttype']['value']);
$orgtype = $this->getOrgType($info['_orgtype']['value']);
$enterprisecerttype = $this->getEnterpriseCertType($info['_enterprisecerttype']['value']);
?>

<style type="text/css">
	.formInputText > span .textInput { border:none; display:inline-block;overflow:hidden;padding:0 5px; height:20px; line-height:20px; padding-top:3px;padding-bottom:5px; font-size:13px;margin:0;background:#F9F9F9;resize:none;border-top:2px solid #ECECEC; overflow-y:auto;}
    .checkbox{ display:inline-block; *display:inline; *zoom:1; padding-left:22px; line-height:18px; min-height:18px; background:url(<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/checkbox_unselect.png) no-repeat 0 center }
    .checkbox.checked{ background-image:url(<?php echo $this->getBaseUrl() ?>skin/frontend/default/default/images/checkbox_select.png);}
    .checkbox > input{ display:none;}
    label.error{display:block;background-position:0 2px;margin-top:3px;}
    label.ok{display:inline-block;vertical-align:middle;}
    .remarkList .textRight{padding-top:15px;vertical-align:top;}
    .formInputText{vertical-align:middle;}
    .remarkList .qianzhishenpi li .checkbox {
	    width: 87px;
	}
</style>
<script type="text/javascript" src="/js/basic.js"></script>
<script src="<?php echo Mage::getBaseUrl('js').'jquery.validate.min.js'?>"></script>
<script type="text/javascript">
var dp<?php echo $info['_city']['name'];?>;
function show_error(msg)
{
    dialog_alert(msg, '', '提示', '确定');
}
</script>

<div class="main vBg ">
	<div class="layout clearfix">
		<div class="leftPanel">
			<dl class="typeList">
                <dt><a href="javascript:void(0);">备案管理</a></dt>
				<dd class="selected"><a href="/customer/consoleicp/icpconsole">我的备案</a></dd>
				<dd><a href="/customer/consoleicp/insconsole">备案指导</a></dd>
			</dl>
		</div>
		<div class="rightPanel">
			<div class="headline"><b>新增备案</b><a id="listurl" class="tinyBtn" href="/customer/consoleicp/icpconsole"><span><strong><ins class="ico whiteIndex"></ins>返回列表</strong></span></a><p><i></i></p></div>                  
            <div class="stepCon">
                <dl class="flowpath">
                    <dd>
                        <ul class="step1">
                            <li class="first sel"><div><p><i>1</i></p><span>填写备案信息</span></div></li>
                            <li class="col2"><div><p><i>2</i></p><span>上传资料</span></div></li>
                            <li class="last"><div><p><i>3</i></p><span>发布网站</span></div></li>
                        </ul>
                    </dd>
                </dl>
            </div>
 					
            <div class="copyrightItem newRemark">
				<div class="topLeft"><div class="topRight"><div class="topCenter"></div></div></div>
				<div class="centerWarp">
				   <form name="stepform" id="stepform" method="post" action="/customer/consoleicp/fileconsole/">
                	<ul class="caseList">
                		<li>
                        	<h1 class="caption">备案信息</h1>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarkList">
                              <tr>
                                <td class="textRight" width="25%">申请备案的公网IP</td>
                                <td>
                                    <?php
                                    	if(isset($_GET['allIp']) && !empty($_GET['allIp'])){
                                    		echo $_GET['allIp'];
                                    		echo input('hidden', $info['_ip']['name'], '', $_GET['allIp']);
                                    	}else{
                                       		echo $info['_ip']['value'];
                                        	echo input('hidden', $info['_ip']['name'], '', $info['_ip']['value']);
                                    	}
                                    ?>
                                </td>
                              </tr>
                              <tr>
                                <td class="textRight">备案类型</td>
                                <td>
                                    <?php
                                    echo dropbox($info['_type']['name'], $info['_type']['name'], $icptype,'if($(\'input[name="icpType"]\').val()==1){$(\'#icpNum\').val("");$(\'#icpNum\').parents("tr").hide();}else{$(\'#icpNum\').parents("tr").find("label.error").remove();$(\'#icpNum\').parents("tr").show(); }');
                                    ?>
                                    </td>
                              </tr>
							 <tr>
                                <td class="textRight"><font color="red">*</font>备案域名</td>
                                <td><label class="formInputText markInput">
                                    <span style="background:none;width:30px;color:#000;line-height:31px;font-size:13px;">www.</span>
                                    <span>
                                     <?php
								    	if(isset($_GET['domain']) && !empty($_GET['domain'])){
								    		echo input('text', $info['_domain']['name'], '', $_GET['domain'] ,array('class' => 'textInput','style' => 'width:350px;'));
								    	}else{
								        	echo input('text', $info['_domain']['name'], '', $info['_domain']['value'], array('class' => 'textInput','style' => 'width:350px;'));
								    	}
							    	?>
                                    </span></label></td>
                              </tr>
							
                              <tr>
                                <td class="textRight"><font color="red">*</font>备案许可证号</td>
                                <td><label class="formInputText markInput"><span>
                                    <?php
                                    	if(isset($_GET['icpNum']) && !empty($_GET['icpNum'])){
                                    		echo input('text', $info['_icpno']['name'], '', $_GET['icpNum'] ,array('class' => 'textInput'));
                                    	}else{
                                        	echo input('text', $info['_icpno']['name'], '', $info['_icpno']['value'], array('class' => 'textInput'));
                                    	}
                                    ?>
                                    </span></label></td>
                              </tr>
                            
                            </table>
                        </li>
                         <li>
                       		 <h1 class="caption">网站信息</h1>	
                             <table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarkList">
                              <tr>
                                <td class="textRight" width="25%"><font color="red">*</font>网站名称</td>
                                <td><label class="formInputText markInput"><span>
                                    <?php
                                    	if(isset($_GET['name']) && !empty($_GET['name'])){
                                    		echo input('text', $info['_sitename']['name'], '', $_GET['name'], array('class' => 'textInput'));
                                    	}else{
                                        	echo input('text', $info['_sitename']['name'], '', $info['_sitename']['value'], array('class' => 'textInput'));
                                    	}
                                    ?>
                                    </span></label></td>
                              </tr>
                              <tr>
                                <td class="textRight"><font color="red">*</font>网站域名</td>
                                <td><label class="formInputText markInput">
                                    <span style="background:none;width:30px;color:#000;line-height:31px;font-size:13px;">www.</span>
                                    <span>
                                    <?php
                                    	if(isset($_GET['domain2']) && !empty($_GET['domain2'])){
                                    		echo input('text', $info['_existsdomain']['name'], '', $_GET['domain2'], array('class' => 'textInput','style' => 'width:350px;'));
                                    	}else{
                                        	echo input('text', $info['_existsdomain']['name'], '', $info['_existsdomain']['value'], array('class' => 'textInput','style' => 'width:350px;'));
                                    	}
                                    ?>
                                    </span></label></td>
                              </tr>
                              <tr>
                                <td class="textRight"><font color="red">*</font>网站首页URL</td>
                                <td><label class="formInputText markInput">
                                    <span style="background:none;width:40px;color:#000;line-height:31px;font-size:13px;">http://</span>
                                    <span>
                                    <?php
                                    	if(isset($_GET['homeUrl']) && !empty($_GET['homeUrl'])){
                                    		echo input('text', $info['_siteurl']['name'], '', $_GET['homeUrl'], array('class' => 'textInput','style' => 'width:340px;'));
                                    	}else{
                                    		echo input('text', $info['_siteurl']['name'], '', $info['_siteurl']['value'], array('class' => 'textInput','style' => 'width:340px;'));
                                    	}
                                    ?>
                                    </span></label></td>
                              </tr>
                              <tr>
                                <td class="textRight textTop">网站服务内容</td>
                                <td><ul class="boxLayout clearfix">
                                      <?php
                                      echo input('hidden', $info['_servertype']['name'], '', $info['_servertype']['value']);
                                      if(!empty($sitetype))
                                      {
                                        $c = 0;
                                        foreach($sitetype as $v)
                                        {
                                        	$servercontent = $info['_servertype']['value'];
                                        	$servercontentArr = explode(';', $servercontent);
                                            if($c%4==0) echo '<li '.(floor($c/4)!=0 ? 'class="lastBox"':'').'>';
                                      ?>
                                        <label class="checkbox <?php if(!empty($info['_servertype']['value']) && in_array($v['value'], $servercontentArr) || (isset($_GET['icpCode']) && $servercontentArr[0]=='0' && $info['_servertype']['value']==$v['value'])){echo  'checked';}else{ echo  '';}?>">
                                            <input type="checkbox" value="<?php echo $v['value'];?>" <?php  if(!empty($info['_servertype']['value']) && in_array($v['value'], $servercontentArr) || (isset($_GET['icpCode']) && $servercontentArr[0]=='0' && $info['_servertype']['value']==$v['value'])){echo  'checked';}else{ echo  '';}?>><?php echo $v['title'];?>
                                        </label>
                                        <?php
                                        if($v['value']==-1)
                                        {
                                        ?>
                                        <label class="formInputText boxInput">
                                            <span>
                                            	<?php 
                                            		if(!empty($info['_servertyperemark']['value']))
                                            		{
                                            			$_servertyperemark_value = $info['_servertyperemark']['value'];
                                            		}
                                            		if($v['selected'])
                                            		{
                                            			echo '<input class="textInput" name="'.$info['_servertyperemark']['name'].'" type="text" maxlength="30" value="'.$_servertyperemark_value.'">';
                                            		}else{
                                            			echo '<input class="textInput" disabled="disabled" name="'.$info['_servertyperemark']['name'].'" type="text" maxlength="30" value="'.$_servertyperemark_value.'">';
                                            		}
                                            	?>
                                            </span>
                                        </label>
                                        <?php
                                        }
                                        ?>
                                      <?php
                                            if($c%4==3) echo '</li>';
                                            
                                            $c++;
                                        }
                                      }
                                      ?>
                                     </ul></td>
                              </tr>
                              <tr>
                                <td class="textRight textTop"><font color="red">*</font>前置审批内容或类型</td>
                                <td><ul class="boxLayout clearfix qianzhishenpi">
                                      <?php
                                      echo input('hidden', $info['_boforecheck']['name'], '', $info['_boforecheck']['value']);
                                      
                                      if(!empty($approve))
                                      {
                                        $c = 0;
                                        foreach($approve as $v)
                                        {
                                            if($c%4==0) echo '<li '.(floor($c/4)!=0 ? 'class="lastBox"':'').'>';
                                      ?>
                                        <label class="checkbox <?php echo $v['selected']?'checked':'';?>">
                                            <input type="checkbox" value="<?php echo $v['value'];?>" <?php echo $v['selected']?'checked':'';?>><?php echo $v['title'];?>
                                        </label>
                                      <?php
                                            if($c%4==3) echo '</li>';
                                            
                                            $c++;
                                        }
                                      }
                                      ?>
                                     </ul></td>
                              </tr>
                            </table>
                        </li>
                    	<li>
                        	<h1 class="caption">企业信息</h1>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarkList">
                              
                              <tr>
                                <td class="textRight" width="25%">主办单位证件类型</td>
                                <td>
                                    <?php
                                    	echo dropbox($info['_enterprisecerttype']['name'], $info['_enterprisecerttype']['name'], $enterprisecerttype);
                                    ?>
                                </td>
                              </tr>
                              <tr>
                                <td class="textRight"><font color="red">*</font>主办单位证件号码</td>
                                <td><label class="formInputText markInput"><span>
	                                <?php 
                                		echo input('text', $info['_enterprisecertno']['name'], '', $info['_enterprisecertno']['value'], array('class' => 'textInput'));
                                    ?>	
                                   </span></label></td>
                              </tr>
                              <tr>
                                <td class="textRight">主办单位性质</td>
                                <td>
                                    <?php
                                    	echo dropbox($info['_orgtype']['name'], $info['_orgtype']['name'], $orgtype);
                                    ?>
                                </td>
                              </tr>
                              
                              <tr>
                                <td class="textRight">所属区域</td>
                                <td>
                                    <div class="oType" id="<?php echo $info['_province']['name'];?>"></div>
                                    <input type="hidden" name="<?php echo $info['_province']['name'];?>" value="">
                                    <script type="text/javascript">
                                    //var init = false;
                                    dp<?php echo $info['_province']['name'];?> = new ucd.Droplist({
                                                container:$("#<?php echo $info['_province']['name'];?>"),
                                                data:<?php echo json_encode($province)?>,
                                                width:"190",
                                                inputEnable:false,
                                                onValueChange:function(){
                                                    $('input[name="<?php echo $info['_province']['name'];?>"]').val( this.getValueString() );
                                                    //if(init==false) return false;
                                                    
                                                    $.getJSON('/customer/consoleicp/getarea?city='+encodeURIComponent(this.getValueString()), function(data){
                                                        if(data)
                                                        {
                                                            dp<?php echo $info['_city']['name'];?>.setData(data);
                                                        }
                                                        else
                                                        {
                                                        }
                                                    });
                                                }
                                            });
                                            var init = true;
                                    </script>

                                    <?php
                                    	echo dropbox($info['_city']['name'], $info['_city']['name'], $city);
                                    ?>
                                </td>
                              </tr>
                              <tr>
						        <td class="textRight"><font color="red">*</font>主办单位名称</td>
						        <td><label class="formInputText markInput"><span>
						        	 <?php 
                                		    echo input('text', $info['_name']['name'], '', $info['_name']['value'], array('class' => 'textInput'));
                                    ?>	
						        	
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>证件住所</td>
						        <td><label class="formInputText markInput"><span>
						        	 <?php 
                                		    echo input('text', $info['_certificateaddr']['name'], '', $info['_certificateaddr']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>主办单位通信地址</td>
						        <td><label class="formInputText markInput"><span>
						        	 <?php 
                                		    echo input('text', $info['_address']['name'], '', $info['_address']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>投资者或上级主管单位名称</td>
						        <td><label class="formInputText markInput"><span>
						        	<?php 
                                		    echo input('text', $info['_investor']['name'], '', $info['_investor']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
                              
                            </table>
                        </li>
						<li>
							<h1 class="caption">网站负责人信息</h1>
						    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="remarkList">
						      <tr>
                                <td class="textRight" width="25%"><font color="red">*</font>单位法人代表姓名</td>
                                <td><label class="formInputText markInput"><span>
	                                <?php 
                                		    echo input('text', $info['_legalname']['name'], '', $info['_legalname']['value'], array('class' => 'textInput'));
                                    ?>	
                                   </span></label></td>
                              </tr>
						      <tr>
						        <td class="textRight">法人代表证件类型</td>
						        <td>
						            <?php
						            	echo dropbox($info['_legalcerttype']['name'], $info['_legalcerttype']['name'], $legalcerttype);
						            ?>
						        </td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>法人代表证件号码</td>
						        <td><label class="formInputText markInput"><span>
						            <?php 
						        		    echo input('text', $info['_legalcertno']['name'], '', $info['_legalcertno']['value'], array('class' => 'textInput'));
						            ?>	
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight">负责人与单位法人代表相同</td>
						        <td>
						        	<input type="hidden" value="<?php echo $issame;?>" id="issame" name="issame">
						        	<ul class="clearfix issamecheckbox">
                                      <li>   
                                      	<label class="checkbox <?php if($issame==0){?>checked<?php }?>">
                                            <input type="checkbox" value="0">否
                                        </label>
                                        <label class="checkbox <?php if($issame==1){?>checked<?php }?>" >
                                            <input type="checkbox" value="1">是                                        
                                        </label>
                                      </li>
                                    </ul>
						        </td>
						      </tr>
						      <tr>
                                <td class="textRight"><font color="red">*</font>网站负责人姓名</td>
                                <td><label class="formInputText markInput"><span>
                                	<?php 
                                		    echo input('text', $info['_chargename']['name'], '', $info['_chargename']['value'], array('class' => 'textInput'));
                                    ?>
                                   </span></label></td>
                              </tr>
						      <tr>
						        <td class="textRight">负责人证件类型</td>
						        <td>
						            <?php
						            	echo dropbox($info['_chargecerttype']['name'], $info['_chargecerttype']['name'], $chargecertype);
						            ?>
						        </td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>负责人证件号码</td>
						        <td><label class="formInputText markInput"><span>
						        	<?php 
                                		    echo input('text', $info['_chargecernum']['name'], '', $info['_chargecernum']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>办公电话</td>
						        <td><label class="formInputText markInput"><span>
						        	<?php 
                                		    echo input('text', $info['_officetel']['name'], '', $info['_officetel']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>移动电话</td>
						        <td><label class="formInputText markInput"><span>
						        	<?php 
                                		    echo input('text', $info['_mobile']['name'], '', $info['_mobile']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>电子邮箱地址</td>
						        <td><label class="formInputText markInput"><span>
						            <?php 
                                		    echo input('text', $info['_email']['name'], '', $info['_email']['value'], array('class' => 'textInput'));
                                    ?>
						           </span></label></td>
						      </tr>
						      <tr>
						        <td class="textRight"><font color="red">*</font>备注</td>
						        <td>
						        	<label class="formInputText heightInput"><span ><textarea name="remark" id="remark"   cols="60" class="textInput"><?php if(!empty($info['_remark']['value'])){ echo $info['_remark']['value'];} ?></textarea></span></label>
						        </td>
						      </tr>
						      
						    </table>
						</li>
                    </ul>
                   <div class="actionBtn">
                        <?php
                        echo input('hidden', $info['_opertype']['name'], '', $info['_opertype']['value']);
                        
                        echo input('hidden', $info['_code']['name'], '', $info['_code']['value']);
                        ?>
                        <input type="hidden" name="preurl" value="<?php echo $_SERVER['REQUEST_URI'];?>" />
                   		<a id="draftbtn" class="fnBtn formSubmit" href="javascript:void(0)"><span class="endCorner"><span class="text">保存草稿</span></span></a>
                   		<a id="sbmbtn" class="fnBtn" href="javascript:void(0)"><span class="endCorner"><span class="text">下一步</span></span></a>  
                   </div>
                   </form>
				</div>
				<div class="bottomLeft"><div class="bottomRight"><div class="bottomCenter"></div></div></div>
			</div>
		</div>
	</div>
</div>
<div id="dialog_alert">
</div>
<script language="javascript" type="text/javascript">
$(function(){
	$("#consoleicp_icpconsole").addClass('sel');
	$('.issamecheckbox .checkbox').click(function(){
		var checkbox = $(this).find('input[type="checkbox"]').val();
		if(!$(this).hasClass("checked")){
			$('.issamecheckbox .checkbox').removeClass('checked');
			$(this).addClass("checked");
			$('#issame').val(checkbox);
		}
		if(checkbox==1){
			$('#chargeName').parents("tr").hide();
			$('#chargeCerttype').parents("tr").hide();
			$('#chargeCerNum').parents("tr").hide();
		}else{
			$('#chargeName').parents("tr").show();
			$('#chargeCerttype').parents("tr").show();
			$('#chargeCerNum').parents("tr").show();
		}
	});
	<?php if($issame == 0){?>
		$("#issame").val('0');
		$('#chargeName').parents("tr").show();
		$('#chargeCerttype').parents("tr").show();
		$('#chargeCerNum').parents("tr").show();
	<?php }else{?>
		$("#issame").val('1');
		$('#chargeName').parents("tr").hide();
		$('#chargeCerttype').parents("tr").hide();
		$('#chargeCerNum').parents("tr").hide();
	<?php }?>
});
</script>
<script type="text/javascript">

function checkform()
{
    //if(mod==0)  return true;
    //输入框非空
    <?php
        $ids = array('_ip', '_icpno', '_domain', '_certno', '_sitename', '_sitedomain', '_siteurl');
        $checks = array();
        foreach($ids as $v)
        {
            $checks[] = '"'.$info[$v]['name'].'"';
        }
    ?>
    var textnames = [<?php echo implode(',',$checks);?>];
    var flag;
    for(var i in textnames)
    {
        $('input[name="'+textnames[i]+'"]').val( $.trim($('input[name="'+textnames[i]+'"]').val()) );
    }
    
    //规则
    if( $('input[name="<?php echo $info['_domain']['name'];?>"]').val().length>128 || $('input[name="<?php echo $info['_domain']['name'];?>"]').val().match(/^[a-zA-Z0-9-\.]+$/)==null || $('input[name="<?php echo $info['_domain']['name'];?>"]').val().match(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){0,}\.[a-zA-Z]+$/)==null )
    {
        show_error('请输入规范的域名，如ecloud.10086.cn');
        flag = false;
    }
    
    if( $('input[name="<?php echo $info['_icpno']['name'];?>"]').val().length > 50)
    {
        show_error('请输入规范的备案许可证号');
        flag = false;
    }
    
    if( $('input[name="<?php echo $info['_certno']['name'];?>"]').val()=='' || $('input[name="<?php echo $info['_certno']['name'];?>"]').val()==';' )
    {
        show_error('请填写证件号码');
        flag = false;
    }
    if( $('input[name="<?php echo $info['_certtype']['name'];?>"]').val()== '0' ) //身份证
    {
        var idnum = $('input[name="<?php echo $info['_certno']['name'];?>"]').val().toLowerCase();
        var cert_reg =/^[0-9]{6}(19[0-9]{2}|20[01]{1}[0-9]{1})(((0[469]{1}|(11))([0]{1}[1-9]{1}|[12]{1}[0-9]{1}|(30))|[02]{2}(([0]{1}[1-9]{1}|[1]{1}[0-9])|[2]{1}[0-8]{1})|(0[13578]{1}|(10)|(12))([0]{1}[1-9]{1}|[12]{1}[0-9]{1}|(30)|(31))))[0-9]{3}[0-9x]{1}$/;

        if(!cert_reg.test(idnum))
        {
            show_error('请输入正确的身份证号码');
            flag = false;
        }
    }
    else if( $('input[name="<?php echo $info['_certtype']['name'];?>"]').val()== '3' ) //军官证
    {
        if( $('input[name="<?php echo $info['_certno']['name'];?>"]').val().length != 8 )
        {
            show_error('请输入正确的军官证号码');
            flag = false;
        }
    }
    
    if( $('input[name="<?php echo $info['_sitename']['name'];?>"]').val()=='' || $('input[name="<?php echo $info['_sitename']['name'];?>"]').val().length>128 )
    {
        show_error('请输入1-128个字符的网站名称');
        flag = false;
    }
    
    //规则
    if($('input[name="<?php echo $info['_existsdomain']['name'];?>"]').val()){
	    if( $('input[name="<?php echo $info['_existsdomain']['name'];?>"]').val().length>128 || $('input[name="<?php echo $info['_existsdomain']['name'];?>"]').val().match(/^[a-zA-Z0-9-\.]+$/)==null || $('input[name="<?php echo $info['_existsdomain']['name'];?>"]').val().match(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){0,}\.[a-zA-Z]+$/)==null )
	    {
	        show_error('请输入规范的域名，如ecloud.10086.cn');
	        flag = false;
	    }
	}
    
    if( $('input[name="<?php echo $info['_siteurl']['name'];?>"]').val()=='' || $('input[name="<?php echo $info['_siteurl']['name'];?>"]').val().length>128 )
    {
        show_error('请输入规范的网站首页URL，如10086.cn');
        flag = false;
    }
    var icpType = $('input[name="icpType"]').val();
    if(icpType!=1){
	    if( $('input[name="<?php echo $info['_boforecheck']['name'];?>"]').val()=='' || $('input[name="<?php echo $info['_boforecheck']['name'];?>"]').val()==';' )
	    {
	        show_error('请选择前置审批内容或类型！');
	        flag = false;
	    }
	}
	if(flag == false){
		return false;
	}else{
    	return true;
	}
}


$('#draftbtn').click(function(){
	$('input[name="<?php echo $info['_opertype']['name'];?>"]').val(0);
	jQuery("#stepform").submit();
});
$('#sbmbtn').click(function(){
	$('input[name="<?php echo $info['_opertype']['name'];?>"]').val(1);
	jQuery("#stepform").submit();
});

//获得焦点的文本框样式
$(".formInputText").focusin(function(){
	$(this).addClass("focus");
}).focusout(function(e) {
	$(this).removeClass("focus");
});

//只有选中“其他”，才能输入文字
$('input[name="<?php echo $info['_servertyperemark']['name'];?>"]').keyup(function(){
    var par = $(this).parent().parent();
    if(!par.prev().hasClass("checked"))
    {
        $(this).val('');
    }
});

$('.remarkList .checkbox').click(function(){
	var checkbox = $(this).find('input[type="checkbox"]').val();
	if(checkbox=='-1'){
		if(!$(this).hasClass("checked")){
			$('input[name="otherSC"]').removeAttr("disabled");
		}else{
			$('input[name="otherSC"]').val('');
			$('input[name="otherSC"]').attr("disabled","disabled");
		}
	}
});

var browser = $.browser;
var isIE = browser.msie;
var browserVersion = browser.version;
var needToFix = (isIE && browserVersion < 9);
//checkbox交互
function syncChk($chk){
	var $c = $chk.parent();
	var action = $chk.is(":checked")?"addClass":"removeClass";
	$c[action]("checked");
}
function checkbox($label,checkFn){
	$label.each(function(){
		var $label = $(this);
		var $checkbox = $label.children(":checkbox");
		syncChk($checkbox);
		var $eventTatget = $checkbox;
		if( needToFix ){
			$eventTatget = $label;
		}
		$eventTatget.bind("click",function(e){
			needToFix && $checkbox.prop("checked",!$checkbox.prop("checked"));
			syncChk($checkbox);
			_callback(checkFn,$label[0],[$label.is(".checked"),$checkbox]);
			e.stopPropagation();
		});
	});
}
//执行一个回调
function _callback(fn,context,args){
	if(typeof fn == "function"){
		if($.type(args) != "array"){
			return fn.call(context,args);
		}
		var aLen = args.length,a1 = args[0],a2 = args[1],a3 = args[2];
		switch(aLen){
			case 1:
				return fn.call(context,a1);
				break;
			case 2:
				return fn.call(context,a1,a2);
				break;
			case 3:
				return fn.call(context,a1,a2,a3);
				break;
			default:
				return fn.apply(context,args);
				break;
		}
	}
}
//数据表格交互
(function(){
	$('.boxLayout label').each(function(){
	    var $label = $(this);
		var $checkbox = $label.children(":checkbox");

		var $eventTatget = $checkbox;
		if( needToFix ) $eventTatget = $label;

		$eventTatget.bind("click",function(e){
		    var me = needToFix ? $(this) : $(this).parent();
		    var $label = me;
    		var $checkbox = me.children(":checkbox");

		    var datafield = me.parent().parent().children(':hidden');
			
		    if(me.parent().parent().children(':hidden').attr('name')=='<?php echo $info['_boforecheck']['name'];?>') //单选
		    {
		        datafield.val('');
		        me.parent().parent().find('label').removeClass('checked');
		    }

		    var t = $checkbox.prop("checked");
			needToFix && $checkbox.prop("checked",!t);
			syncChk($checkbox);
			e.stopPropagation();
			
			if(datafield.val()=='')
			{
			    datafield.val(';');
			}
			else
		    {
    			if(datafield.val().substr(datafield.val().length-1, 1)!=';')
    			{
    			    datafield.val(datafield.val()+';');
    			}
    			if(datafield.val().substr(0, 1)!=';')
    			{
    			    datafield.val(';'+datafield.val());
    			}
    		}
			
			if($checkbox.prop("checked"))
			{
			    datafield.val( datafield.val()+$checkbox.val()+';' );
			}
			else
		    {
		        datafield.val( datafield.val().replace(';'+$checkbox.val()+';', ';') );
		    }
		});
	});
})();

function setissame(){
	var issame = $('#issame').val();
	var legalCerttype = $('input[name="legalCerttype"]').val();
	var legalCerNum = $('#legalCerNum').val();
	var legalName = $('#legalName').val();
	if(issame==1){
		$('#chargeName').val(legalName);
		$('#chargeCerNum').val(legalCerNum);
		$('input[name="chargeCerttype"]').val(legalCerttype);
	}
}
$(function(){
	jQuery.validator.addMethod( "mobilephoneCheck" ,  function (value, element)  {  
          return   /^(1)[0-9]{10}$/ .test(value);  
	 	 } ,  "<?php echo $this->__('Please input correct mobilephone number.')?>" );
	jQuery.validator.addMethod( "getRealLen" ,  function (value, element,param)  {  
          var str = value.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了  
	 	  if(str>param){
	 	  	 return false;
	 	  }else{
	 	  	 return true;
	 	  }
	});
	jQuery.validator.addMethod( "isTel" ,  function (value, element,param)  {  
	 	  var patrn=/^(([0-9]{6,20})|((([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?))$/;
		  if (!patrn.exec(value)){ 
		  	return false;
		  }else{
			return true;
		  }
	});
	jQuery.validator.addMethod( "domainCheck" ,  function (value, element,param)  {  
	 	  var patrn1=/^[a-zA-Z0-9-\.]+$/;
	 	  var patrn2=/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+){0,}\.[a-zA-Z]+$/;

		  if (!patrn1.exec(value)||!patrn2.exec(value)){ 
		  	return false;
		  }else{
			return true;
		  }
	});
	jQuery.validator.addMethod("legalcertcardCheck",function (value, element)  { 
		if($('input[name="legalCerttype"]').val()!=0){
			return true;
		}
		var strIDno = value.replace(/\s/g,'');          
	    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};    
	    var iSum = 0;    
	    var info = "";    
	    var idCardLength = strIDno.length;      
	    if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))     
	    {    
	        return false;    
	    }    
	     
	    //在后面的运算中x相当于数字10,所以转换成a    
	    strIDno = strIDno.replace(/x$/i,"a");    
	   
	    if(aCity[parseInt(strIDno.substr(0,2))]==null)    
	    {    
	        return false;    
	    }    
	        
	    if (idCardLength == 18)    
	    {    
	        sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));    
	        var d = new Date(sBirthday.replace(/-/g,"/"))    
	        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))    
	        {           
	            return false;    
	        }    
	   
	        for(var i = 17;i>=0;i --)    
	            iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);    
	   
	        if(iSum%11!=1)    
	        {    
	              return false;    
	        }    
	    }    
	    else if (idCardLength == 15)    
	    {    
	        strIDno=strIDno+"";     
	        for(var i=0;i<strIDno.length;i++){     
	            if(strIDno.charAt(i)<'0'||strIDno.charAt(i)>'9'){     
	                return false;     
	                break;     
	            }     
	        }     
	        var year=strIDno.substr(6,2);     
	        var month=strIDno.substr(8,2);     
	        var day=strIDno.substr(10,2);     
	        var sexBit=strIDno.substr(14);     
	      
	        if(year<'01'||year >'90')return false;     
	      
	        if(month<'01'||month >'12')return false;     
	      
	        if(day<'01'||day >'31')return false;  
	    }    
	    return true; 
	});
	jQuery.validator.addMethod("chargecertcardCheck",function (value, element)  { 
		if($('#issame').val()==1){
			return true;
		}
		if($('input[name="chargeCerttype"]').val()!=0){
			return true;
		}
		var strIDno = value.replace(/\s/g,'');          
	    var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};    
	    var iSum = 0;    
	    var info = "";    
	    var idCardLength = strIDno.length;      
	    if(!/^\d{17}(\d|x)$/i.test(strIDno)&&!/^\d{15}$/i.test(strIDno))     
	    {    
	        return false;    
	    }    
	     
	    //在后面的运算中x相当于数字10,所以转换成a    
	    strIDno = strIDno.replace(/x$/i,"a");    
	   
	    if(aCity[parseInt(strIDno.substr(0,2))]==null)    
	    {    
	        return false;    
	    }    
	        
	    if (idCardLength == 18)    
	    {    
	        sBirthday=strIDno.substr(6,4)+"-"+Number(strIDno.substr(10,2))+"-"+Number(strIDno.substr(12,2));    
	        var d = new Date(sBirthday.replace(/-/g,"/"))    
	        if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))    
	        {           
	            return false;    
	        }    
	   
	        for(var i = 17;i>=0;i --)    
	            iSum += (Math.pow(2,i) % 11) * parseInt(strIDno.charAt(17 - i),11);    
	   
	        if(iSum%11!=1)    
	        {    
	              return false;    
	        }    
	    }    
	    else if (idCardLength == 15)    
	    {    
	        strIDno=strIDno+"";     
	        for(var i=0;i<strIDno.length;i++){     
	            if(strIDno.charAt(i)<'0'||strIDno.charAt(i)>'9'){     
	                return false;     
	                break;     
	            }     
	        }     
	        var year=strIDno.substr(6,2);     
	        var month=strIDno.substr(8,2);     
	        var day=strIDno.substr(10,2);     
	        var sexBit=strIDno.substr(14);     
	      
	        if(year<'01'||year >'90')return false;     
	      
	        if(month<'01'||month >'12')return false;     
	      
	        if(day<'01'||day >'31')return false;  
	    }    
	    return true; 
	});
	jQuery("#stepform").validate({
		success:function(label){
		    if (label.prev("br"))
		    {
		        label.prev("br").remove();
		    }
			label.addClass("ok").html('&nbsp;');
		},
		errorPlacement: function(error, element) {
			error.appendTo(element.parents(".formInputText").parent());
	    },
		rules:{
	    	icpNum:{
				required:function(element){if($('input[name="icpType"]').val()==1){return false;}else{return true;}},
				getRealLen:128
            },
            name:{
				required:true,
				getRealLen:128
            },
            domain2:{
				required:true,
				domainCheck:true,
				getRealLen:128
            },
            domain:{
				required:true,
				domainCheck:true,
				getRealLen:128
            },
            homeUrl:{
				required:true,
				domainCheck:true,
				getRealLen:128
            },
            enterpriseCertificateNum:{
				required:true,
				getRealLen:128
            },
            enterpriseName:{
				required:true,
				getRealLen:256
				
            },
            certificateAddr:{
				required:true,
				getRealLen:512
            },
            address:{
				required:true,
				getRealLen:512
            },
            investor:{
				required:true,
				getRealLen:1024
            },
            legalName:{
				required:true,
				getRealLen:64
            },
            legalCerNum:{
            	required:true,
				getRealLen:128,
				legalcertcardCheck:true
            },
            chargeName:{
            	required:function(element){if($('#issame').val()==0){return true;}else{return false;}},
				getRealLen:64
            },
            chargeCerNum:{
				required:function(element){if($('#issame').val()==0){return true;}else{return false;}},
				chargecertcardCheck:true,
				getRealLen:128
            },
            officeTel:{
				required:true,
				isTel:true
            },
            mobile:{
				required:true,
				minlength:11,
				maxlength:11,
				digits:true,
				mobilephoneCheck:true
            },
            email:{
			  required:true,
				email:true,
				minlength:5,
				maxlength:64
            },
            remark:{
				required:true,
				getRealLen:1024
            }
		},
		messages:{
			icpNum:{
				required:"请填写备案许可号",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            name:{
				required:"请填写网站名称",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            domain2:{
				required:"请填写网站域名，不要加www，如没有域名请填写IP地址",
				domainCheck:"请输入规范的域名,如example.com",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            domain:{
				required:"请填写备案域名,不要加www.",
				domainCheck:"请输入规范的域名，如example.com",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            homeUrl:{
				required:"请填写网站首页URL，如www.10086.cn",
				domainCheck:"请输入规范的网站首页URL,如www.10086.cn",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            enterpriseCertificateNum:{
				required:"请输入与您单位证件一致的证件号码",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            enterpriseName:{
				required:"请输入与您单位证件一致的单位名称",
				getRealLen:"请输入少于128个汉字或256字符"
				
            },
            certificateAddr:{
				required:"请输入与您单位证件一致的单位地址",
				getRealLen:"请输入少于256个汉字或512字符"
            },
            address:{
				required:"请输入真实详细的地址，地址详细到门牌号或信箱号",
				getRealLen:"请输入少于256个汉字或512字符"
            },
            investor:{
				required:"企业请填写法人姓名或单位全称，其他类型单位请填写上级主管单位名称，如有多个上级主管单位请用半角“;”号分割",
				getRealLen:"请输入少于512个汉字或1024字符"
            },
            legalName:{
				required:"请填写单位法人代表姓名",
				getRealLen:"请输入少于32个汉字或64字符"
            },
            legalCerNum:{
            	required:"请输入与证件一致的证件号码",
            	legalcertcardCheck:"请输入正确的证件号码",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            chargeName:{
            	required:"请填写网站负责人姓名",
				getRealLen:"请输入少于32个汉字或64字符"
            },
            chargeCerNum:{
				required:"请输入与您单位证件一致的证件号码",
				chargecertcardCheck:"请输入正确的证件号码",
				getRealLen:"请输入少于64个汉字或128字符"
            },
            officeTel:{
				required:"请输入您的办公电话号码",
				isTel:"请输入正确的办公电话号码"
            },
			mobile:{
				required:"<?php echo $this->__('Please input mobilephone.') ?>",
				minlength:"<?php echo $this->__('Please input at lease {0} mobilephone number.') ?>",
				maxlength:"<?php echo $this->__('Please input at lease {0} mobilephone number.') ?>",
				digits:"<?php echo $this->__('please input digits.') ?>",
				mobilephoneCheck:"<?php echo $this->__('Please input correct mobilephone number.')?>"
            },
			email:{
			    required: "<?php echo $this->__('please enter email') ?>",
				email: "<?php echo $this->__('make sure correct format,for example: test@huawei.com') ?>",
				minlength:"<?php echo $this->__('Please input at least {0} characters.')?>",
				maxlength:"<?php echo $this->__('Please input at most {0} characters.')?>"
            },
            remark:{
				required:"请填写备注信息",
				getRealLen:"请输入少于1024字符"
            }
		},
		submitHandler: function(form) {
			if( $('input[name="<?php echo $info['_boforecheck']['name'];?>"]').val()=='' || $('input[name="<?php echo $info['_boforecheck']['name'];?>"]').val()==';' )
		    {
		        show_error('请选择前置审批内容或类型！');
		        return false;
		    }
		    var opertype= $('input[name="<?php echo $info['_opertype']['name'];?>"]').val();
		    setissame();
		    if(opertype==1){
			    form.submit();
			}else{
				$.ajax({
					url : "/customer/consoleicp/saveicp/",
					type : "post",
					dataType : "json",
					data: $('#stepform').serializeArray(),
					success : function(data) {
						if(data.status==1)
				        {
				            document.location.href = '/customer/consoleicp/icpconsole';
				        }
				        else
				        {
				            show_error('系统繁忙，请稍后再试，如果再次出现此错误提示，请联系客服');
				        }
					}
				});
				
			}
		}
	});
	if($('input[name="icpType"]').val()==1){
		$('#icpNum').parents("tr").hide();
	}
	
});
</script>
