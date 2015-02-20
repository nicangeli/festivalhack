<?php
header('Content-Type: application/json');
$var = "festivalhack";
if(isset($_GET['tag'])) $var = $_GET['tag'];
echo file_get_contents('https://api.vineapp.com/timelines/tags/'.$var);
//echo file_get_contents('https://api.vineapp.com/timelines/users/search/nicangeli');