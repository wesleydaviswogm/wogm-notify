<?php

    require_once('includes/config.php');

    $message= $_REQUEST['message'];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql= "  INSERT INTO `notify`.`messages` (`message_id`, `active_status`, `message_text`, `created`, `modified`) VALUES (NULL, '0', '".$message."', NOW(), NOW()) ";

    $result = $conn->query($sql);

    $conn->close();

?>