<?php
require "../lib/storage.php";

$times = read_json("../db/times.json");

usort($times, function($a, $b) {
    return $a["time"] - $b["time"];
});

echo json_encode($times);
?>
