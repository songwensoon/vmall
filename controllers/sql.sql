/*
MySQL Data Transfer
Source Host: localhost
Source Database: iweb
Target Host: localhost
Target Database: iweb
Date: 2014/6/10 17:31:26
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for iwebshop_msg_template
-- ----------------------------
CREATE TABLE `iwebshop_msg_template` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '模板名称',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` text NOT NULL COMMENT '模板内容',
  `variable` varchar(255) DEFAULT NULL COMMENT '模板中的变量标签',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='消息模板表';

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `iwebshop_msg_template` VALUES ('1', '到货通知', '最近到货通知', '<p>dear：{$user_name}你关注的商品：{$goods_name}已到货，由于此商品近期销售火爆，请及时购买！</p>\n<p>-------IWeb商场</p>', '用户名 {$user_name} 商品名 {$goods_name}');
INSERT INTO `iwebshop_msg_template` VALUES ('2', '网站订阅', '2011年1月最新上架商品', '2011年1月最新上架商品', null);
INSERT INTO `iwebshop_msg_template` VALUES ('3', '找回密码', 'IWeb密码找回', '<p>dear：{$user_name}：</p><br /><p>您的新密码为{$password},请您尽快登陆用户中心，修改为您常用的密码！</p><br /><p>-------IWeb商场</p><br />', '用户名 {$user_name} 新密码 {$password}');
INSERT INTO `iwebshop_msg_template` VALUES ('4', '邮箱验证', '请激活您在{$weburl_name}账户', '<table style=\"background-color:#F3F3F2;font-size:12px;margin:auto;\" cellpadding=\"0\" cellspacing=\"0\" width=\"650\"><tbody><tr><td>\r\n				<div style=\"text-align:center;color:#8c8b8b;font-family:Arial, Helvetica, sans-serif;\">\r\n					为了您能够正常收到来自{$weburl_name}邮件，请将<a href=\"mailto:%7B$weburl_email%7D\" target=\"_blank\">{$weburl_email}</a>添加进您的通讯录\r\n				</div>\r\n				<table style=\"width:630px;background-color:#FFF;margin:0 10px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td valign=\"middle\">\r\n								{$logo}\r\n							</td>\r\n						</tr></tbody></table><table style=\"height:33px;background-color:#80BA2F;color:#FFF;\" cellpadding=\"0\" cellspacing=\"0\" width=\"650\"><tbody><tr><td>\r\n								<img src=\"%7B$weburl_url%7D/image/default/message/l.jpg\" border=\"0\" height=\"33\" width=\"28\" alt=\"l.jpg\" /></td>\r\n							<td style=\"font-size:14px;font-family:\'Microsoft YaHei\';font-weight:bold;\" align=\"center\">\r\n								{$menu}\r\n							</td>\r\n							<td>\r\n								<img src=\"%7B$weburl_url%7D/image/default/message/r.jpg\" border=\"0\" height=\"33\" width=\"28\" alt=\"r.jpg\" /></td>\r\n						</tr></tbody></table><table style=\"margin:0 auto 0;background-color:#FFF;font-family:Verdana;\" cellpadding=\"0\" cellspacing=\"0\" width=\"630\"><tbody><tr><td style=\"font-weight:bold;font-size:14px;color:#5b5b5b;\">\r\n								尊敬的 <span>{$member_name}</span> 您好：\r\n							</td>\r\n						</tr><tr><td style=\"color:#5B5B5B;font-size:12px;\">\r\n								您于 {$time}  申请验证邮箱。<br />\r\n将链接复制到浏览器地址栏访问:<br />\r\n{$link}<br />\r\n若您没有申请过验证邮箱 ，请发邮件至：<a target=\"_blank\" href=\"mailto:%7B$weburl_email%7D\">{$weburl_email}</a> 或致电：{$weburl_tel} 。\r\n							</td>\r\n						</tr><tr><td style=\"color:#5B5B5B;font-size:12px;font-family:Verdana;\">\r\n								您之所以收到这封邮件，是因为您曾经注册成为{$weburl_name}的用户。<br />\r\n本邮件由{$weburl_name}系统自动发出，请勿直接回复！<br />\r\n在购物中遇到任何问题，请点击 <a href=\"%7B$weburl_url%7D/help.php\" target=\"_blank\">帮助中心</a>。<br />\r\n如果您有任何疑问或建议，请 <a target=\"_blank\" href=\"%7B$weburl_url%7D/aboutus.php?msg=1\">联系我们</a>。<br />\r\n{$weburl_desc}\r\n							</td>\r\n						</tr><tr><td style=\"font-size:12px;color:#5B5B5B;\" align=\"center\" valign=\"middle\">\r\n								Copyright © 2004-2014 {$weburl_name} 版权所有\r\n							</td>\r\n						</tr></tbody></table></td>\r\n		</tr></tbody></table>', null);
INSERT INTO `iwebshop_msg_template` VALUES ('5', '欢迎邮件', '感谢您注册{$weburl_name}', '<table style=\"background-color:#F3F3F2;font-size:12px;margin:auto;\" cellpadding=\"0\" cellspacing=\"0\" width=\"650\"><tbody><tr><td>\r\n				<div style=\"text-align:center;color:#8c8b8b;font-family:Arial, Helvetica, sans-serif;\">\r\n					为了您能够正常收到来自{$weburl_name}邮件，请将<a href=\"mailto:%7B$weburl_email%7D\" target=\"_blank\">{$weburl_email}</a>添加进您的通讯录\r\n				</div>\r\n				<table style=\"width:630px;background-color:#FFF;margin:0 10px;\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><td valign=\"middle\">\r\n								{$logo}\r\n							</td>\r\n						</tr></tbody></table><table style=\"height:33px;background-color:#80BA2F;color:#FFF;\" cellpadding=\"0\" cellspacing=\"0\" width=\"650\"><tbody><tr><td>\r\n								<img src=\"%7B$weburl_url%7D/image/default/message/l.jpg\" border=\"0\" height=\"33\" width=\"28\" alt=\"l.jpg\" /></td>\r\n							<td style=\"font-size:14px;font-family:\'Microsoft YaHei\';font-weight:bold;\" align=\"center\">\r\n								[menu]\r\n							</td>\r\n							<td>\r\n								<img src=\"%7B$weburl_url%7D/image/default/message/r.jpg\" border=\"0\" height=\"33\" width=\"28\" alt=\"r.jpg\" /></td>\r\n						</tr></tbody></table><table style=\"margin:0 auto 0;background-color:#FFF;font-family:Verdana;\" cellpadding=\"0\" cellspacing=\"0\" width=\"630\"><tbody><tr><td style=\"font-weight:bold;font-size:14px;color:#5b5b5b;\">\r\n								尊敬的 <span>{$member_name}</span> 您好：\r\n							</td>\r\n						</tr><tr><td style=\"font-size:18px;font-weight:bold;color:#005aa0;\" align=\"center\">\r\n								感谢您注册{weburl_name}<br />\r\n我们将为您提供最贴心的服务，祝您购物愉快！\r\n							</td>\r\n						</tr><tr><td style=\"font-size:12px;color:#5b5b5b;\">\r\n								您的用户名：{$member_name}    您的注册邮箱：{$weburl_email}\r\n							</td>\r\n						</tr><tr><td style=\"font-size:12px;color:#5b5b5b;\">\r\n								邮件中包含您的个人信息，建议您保管好本邮件！如您登陆时<a target=\"_blank\" href=\"%7B$weburl_url%7D/lostpass.php\">忘记密码</a>。\r\n							</td>\r\n						</tr><tr><td style=\"color:#5B5B5B;font-size:12px;font-family:Verdana;\">\r\n								您之所以收到这封邮件，是因为您曾经注册成为{$weburl_name}的用户。<br />\r\n本邮件由{$weburl_name}系统自动发出，请勿直接回复！<br />\r\n在购物中遇到任何问题，请点击 <a href=\"%7B$weburl_url%7D/help.php\" target=\"_blank\">帮助中心</a>。<br />\r\n如果您有任何疑问或建议，请 <a target=\"_blank\" href=\"%7B$weburl_url%7D/aboutus.php?msg=1\">联系我们</a>。<br />\r\n{$weburl_desc}\r\n							</td>\r\n						</tr><tr><td style=\"font-size:12px;color:#5B5B5B;\" align=\"center\" valign=\"middle\">\r\n								Copyright © 2004-2014 {$weburl_name} 版权所有\r\n							</td>\r\n						</tr></tbody></table></td>\r\n		</tr></tbody></table>', null);



SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for iwebshop_active_data
-- ----------------------------
CREATE TABLE `iwebshop_active_data` (
  `time` varchar(40) NOT NULL,
  `rand` varchar(40) NOT NULL,
  `uid` int(20) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `iwebshop_user` (
  `certificatenum` varchar(32) NOT NULL,
  `tel` varchar(32) NOT NULL,
  `realname` varchar(80) DEFAULT NULL COMMENT '真实姓名',
  `admin_no` varchar(20) DEFAULT NULL,
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` char(32) NOT NULL COMMENT '密码',
  `email` varchar(250) DEFAULT NULL COMMENT 'Email',
  `email_verify` tinyint(3) unsigned zerofill DEFAULT '000',
  `head_ico` varchar(250) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COMMENT='用户表';
