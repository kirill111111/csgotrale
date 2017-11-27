<?php
$sitename = "ASDCSGO";
$link = mysql_connect("localhost", "уук_вава", "вц111111");
$db_selected = mysql_select_db('уук_вава', $link);
mysql_query("SET NAMES utf8");

function fetchinfo($rowname,$tablename,$finder,$findervalue) {
	if($finder == "1") $result = mysql_query("SELECT $rowname FROM $tablename");
	else $result = mysql_query("SELECT $rowname FROM $tablename WHERE `$finder`='$findervalue'");
	$row = mysql_fetch_assoc($result);
	return $row[$rowname];
}
?>