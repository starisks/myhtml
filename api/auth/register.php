<?php
require "../lib/storage.php";

$data = json_decode(file_get_contents("php://input"), true);

$usersFile = "../db/users.json";
$users = read_json($usersFile);

foreach ($users as $u) {
    if ($u["username"] === $data["username"]) {
        echo json_encode(["error" => "User exists"]);
        exit;
    }
}

$newUser = [
    "id" => uniqid(),
    "username" => $data["username"],
    "password" => password_hash($data["password"], PASSWORD_DEFAULT),
    "role" => "user"
];

$users[] = $newUser;

write_json($usersFile, $users);

echo json_encode(["success" => true]);
?>
