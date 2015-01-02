<?php

    require_once('includes/config.php');

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $data=[];

    $sql = "SELECT message_id, active_status, message_text FROM messages order by created desc";
    $result = $conn->query($sql);
    $count=0;
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[$count]['id']=$row['message_id'];
            $data[$count]['active']=$row['active_status'];
            $data[$count]['message']=$row["message_text"];
            $count++;
        }
    } else {
        //echo "0 results";
    }
    $conn->close();
    $json=json_encode( $data );
    echo $json;

?>