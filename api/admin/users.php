<?php
require "../lib/storage.php";
require "verify.php";

$users = read_json("../db/users.json");

echo json_encode($users);
?>
