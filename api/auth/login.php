<?php
session_start();
require "../lib/storage.php";

$data = json_decode(file_get_contents("php://input"), true);

$users = read_json("../db/users.json");

foreach ($users as $user) {
    if ($user["username"] === $data["username"] &&
        password_verify($data["password"], $user["password"])) {

        $_SESSION["user"] = [
            "id" => $user["id"],
            "username" => $user["username"],
            "role" => $user["role"]
        ];

        echo json_encode(["success" => true]);
        exit;
    }
}

echo json_encode(["error" => "Invalid credentials"]);
?>
