<?php

    require_once('includes/config.php');

    $messageID= $_REQUEST['id'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql= "DELETE from MESSAGES where message_id=".$messageID;

    $result = $conn->query($sql);

    $conn->close();

?>