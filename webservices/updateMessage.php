<?php

    require_once('includes/config.php');

    $messageID= $_REQUEST['id'];
    $message= $_REQUEST['message'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql= "update MESSAGES set message_text='".$message."' , modified=NOW() where message_id=".$messageID;

    $result = $conn->query($sql);

    $conn->close();

?>