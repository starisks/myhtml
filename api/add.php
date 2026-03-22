<?php
session_start();
require "../lib/storage.php";

if (!isset($_SESSION["user"])) {
    http_response_code(401);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$file = "../db/times.json";
$times = read_json($file);

$times[] = [
    "user_id" => $_SESSION["user"]["id"],
    "username" => $_SESSION["user"]["username"],
    "time" => $data["time"],
    "created_at" => date("Y-m-d H:i:s")
];

write_json($file, $times);

echo json_encode(["success" => true]);
?>
