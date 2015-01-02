<?php

    require_once('includes/config.php');

    $messageID = $_REQUEST['id'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "update messages set active_status=0";
    $result = $conn->query($sql);

    $sql2 = "update messages set active_status=1 where message_id=".$messageID;
    $result2 = $conn->query($sql2);

    $conn->close();

    $json=json_encode( $messageID );
    echo $json;


?>