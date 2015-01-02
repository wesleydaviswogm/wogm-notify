<?php

    require_once('includes/config.php');

    $data=[];

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT message_id, message_text,active_status FROM messages where active_status=1";
    $result = $conn->query($sql);
    $count=0;
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[$count]['id']=$row['id'];
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