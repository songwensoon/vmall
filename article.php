<?php
/**
 * @copyright (c) 2011 jooyea.cn
 * @file article.php
 * @brief 关于文章管理
 * @author chendeshan
 * @date 2011-02-14
 * @version 0.6
 */

 /**
 * @class article
 * @brief 文章管理模块
 */
class Article
{
	//显示标题
	public static function showTitle($title,$color=null,$fontStyle=null)
	{
		$str='<span style="';
		if($color!=null) $str.='color:'.$color.';';
		if($fontStyle!=null)
		{
			switch($fontStyle)
			{
				case "1":
				$str.='font-weight:bold;';
				break;

				case "2":
				$str.='font-style:oblique;';
				break;
			}
		}
		$str.='">'.$title.'</span>';
		return $str;
	}
	public static function get_word($string, $length, $dot = '..', $charset = 'utf-8')
    {
		$string = strip_tags($string);
        if (strlen($string) <= $length)
        {
            return $string;
        }

        $string = str_replace(array('　', '&nbsp;', '&', '"', '<', '>'), array('', '', '&', '"', '<', '>'), $string);

        $strcut = '';
        if (strtolower($charset) == 'utf-8')
        {

            $n = $tn = $noc = 0;
            while ($n < strlen($string))
            {

                $t = ord($string[$n]);
                if ($t == 9 || $t == 10 || (32 <= $t && $t <= 126))
                {
                    $tn = 1;
                    $n++;
                    $noc++;
                }
                elseif (194 <= $t && $t <= 223)
                {
                    $tn = 2;
                    $n += 2;
                    $noc += 2;
                }
                elseif (224 <= $t && $t < 239)
                {
                    $tn = 3;
                    $n += 3;
                    $noc += 2;
                }
                elseif (240 <= $t && $t <= 247)
                {
                    $tn = 4;
                    $n += 4;
                    $noc += 2;
                }
                elseif (248 <= $t && $t <= 251)
                {
                    $tn = 5;
                    $n += 5;
                    $noc += 2;
                }
                elseif ($t == 252 || $t == 253)
                {
                    $tn = 6;
                    $n += 6;
                    $noc += 2;
                }
                else
                {
                    $n++;
                }

                if ($noc >= $length)
                {
                    break;
                }

            }
            if ($noc > $length)
            {
                $n -= $tn;
            }

            $strcut = substr($string, 0, $n);

        }
        else
        {
            for ($i = 0; $i < $length; $i++)
            {
                $strcut .= ord($string[$i]) > 127 ? $string[$i] . $string[++$i] : $string[$i];
            }
        }

        return $strcut . $dot;
    }
}
