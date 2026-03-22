<?php

function read_json($file) {
    if (!file_exists($file)) return [];
    return json_decode(file_get_contents($file), true);
}

function write_json($file, $data) {
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}
?>
