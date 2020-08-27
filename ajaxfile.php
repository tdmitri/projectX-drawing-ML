<?php 
$image = $_POST['image'];
$scale = $_POST['scale'];

$location = "upload/";

$image_parts = explode(";base64,", $image);

$image_base64 = base64_decode($image_parts[1]);

$filename = "img_%01.2f.png";
$filename = sprintf($filename, $scale);


$file = $location . $filename;

file_put_contents($file, $image_base64);
