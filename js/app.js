
function setup(){
    getAllMessagesJSON();
    disableSaveNewMessageButton();
}

function displayAllMessages(messages){

    var activeStatus="";
    var buttonHideID="";
    var content="<tr>";
    content=content+"<td>";
    content=content+"<span id='newMessageField'><textarea rows='4' cols='60' id='newMessageText'></textarea></span>";
    content=content+"</td>";
    content=content+"<td>";
    content=content+"<button class='btn btn-success btn-sm' id='btnAddMessage'>Add Message</button>&nbsp;";
    content=content+"<span id='newMessageButtons'><button class='btn btn-primary btn-sm' id='btnSaveNewMessage'>Save Message</button>&nbsp;<button class='btn btn-warning btn-sm' id='btnCancelSaveNewMessage'>Cancel</button></span>";
    content=content+"</td>";
    content=content+"</td>";
    content=content+"</tr>";

    content=content+"<tr id='messageEditForm'>";
    content=content+"<td>Update Message<br>";
    content=content+"<textarea rows='4' cols='60' id='editMessageText'></textarea>";
    content=content+"</td>";
    content=content+"<td>";
    content=content+"<br><span id='editMessageButtons'><button class='btn btn-primary btn-sm' id='btnUpdateMessage'>Save Message</button>&nbsp;<button class='btn btn-warning btn-sm' id='btnCancelUpdateMessage'>Cancel</button></span>";
    content=content+"</td>";
    content=content+"</td>";
    content=content+"</tr>";

    if(messages.length>0){
        $.each( messages, function( messageIndex, messageData ) {
            if(messageData.active==1){
                activeStatus="active";
                buttonHideID=messageIndex;
            }else{
                activeStatus="";
            }
            content=content+"<tr id="+messageData.id+" class='messageRow'>";
            content=content+"<td><span class="+activeStatus+">"+messageData.message+"<span></td>";
            content=content+"<td nowrap>";
            content=content+"<button class='btn btn-primary btn-sm btnEditMessage'>Edit</button>&nbsp;";
            content=content+"<button class='btn btn-danger btn-sm btnDeleteMessage'>Delete</button>&nbsp;";
            content=content+"<button class='btn btn-info btn-sm btnActivateMessage buttonHide"+messageIndex+" '>Activate</button>&nbsp;";
            content=content+"</td>";
            content=content+"</tr>";
        });
     }
     console.log(messages);
    $('#messageList').html(content);
    bindEvents();
    $(".buttonHide"+buttonHideID+"").hide();
}

function displayActiveMessages(messages){

    var content="";
    $.each( messages, function( messageIndex, messageData ) {
        content=content+"<tr><td>"+messageData.message+"</td></tr>";
    });
    content=content+"<tr><td></td></tr>";
    $('#activeMessage').html(content);
}

function getAllMessagesJSON(){
    var json={};
    $.ajax( {
        async: false,
        url : "webservices/getMessagesJSON.php",
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
        success : function(json){
            displayAllMessages(json);
        },
        error: function(){
          displayAllMessages(json);
        }
    });
}

function getActiveMessageJSON(){
    $.ajax( {
        async: true,
        url : "webservices/getActiveMessageJSON.php",
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
            success : function(json){
                displayActiveMessages(json);
        }
    });
}

function bindEvents(){
    $('.btnActivateMessage').unbind();
    $('.btnActivateMessage').bind( "click", function() {
        var id=$(this).closest('tr').attr('id');
        activateMessage(id);
    });

    $('.btnDeleteMessage').unbind();
    $('.btnDeleteMessage').bind( "click", function() {
        var id=$(this).closest('tr').attr('id');
        deleteMessageModal(id);
    });

    $('.btnEditMessage').unbind();
    $('.btnEditMessage').bind( "click", function() {
        var id=$(this).closest('tr').attr('id');
        displayEditForm(id);
    });

    $('#btnConfirmDeleteMessage').unbind();
    $('#btnConfirmDeleteMessage').bind( "click", function() {
       deleteMessage();
    });


    $('#btnSaveNewMessage').unbind();
    $('#btnSaveNewMessage').bind( "click", function() {
        saveNewMessage();
    });

    $("#btnAddMessage").unbind();
    $('#btnAddMessage').bind( "click", function() {
        displayAddMessageField();
    });

    $("#btnCancelSaveNewMessage").unbind();
    $('#btnCancelSaveNewMessage').bind( "click", function() {
        hideAddMessageField();
       cancelSaveNewMessage();
    });


    $('#newMessageText').unbind();
    $( "#newMessageText" ).bind( "keyup", function() {
        if( $("#newMessageText").val().length>0 ){
            enableSaveNewMessageButton();
        }else{
            disableSaveNewMessageButton();
        }
    });
}

function disableSaveNewMessageButton(){
    $('#btnSaveNewMessage').unbind();
    $('#btnSaveNewMessage').prop('disabled', true);
}

function enableSaveNewMessageButton(){
    $('#btnSaveNewMessage').unbind();
    $( "#btnSaveNewMessage" ).bind( "click", function() {
        saveNewMessage();
    });
    $('#btnSaveNewMessage').prop('disabled', false);

}

function activateMessage(id){

    var url="webservices/activateMessage.php?id="+id;

    $.ajax( {
        type: 'POST',
        async: true,
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
        success : function(){
             getAllMessagesJSON();
        }
    });
}

function saveNewMessage(){

    var url="webservices/addMessage.php?message="+$('#newMessageText').val();

    $.ajax( {
        type: 'POST',
        async: true,
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
        success : function(){
        }
    });
    getAllMessagesJSON();
}

function cancelSaveNewMessage(){
    disableSaveNewMessageButton();
    $("#newMessageText").val('');
    hideAddMessageField();
}

function displayAddMessageField(){
    $("#newMessageField").show();
    $("#newMessageButtons").show();
    $("#btnAddMessage").hide();
    $('.messageRow').hide();
    $('#newMessageText').focus();
}

function hideAddMessageField(){
    $("#newMessageField").hide();
    $("#newMessageButtons").hide();
    $("#btnAddMessage").show();
    $('.messageRow').show();
}

function deleteMessage(){
    var id=$( "body" ).data( "messageID");
    var url="webservices/deleteMessage.php?id="+id;

    $.ajax( {
        type: 'POST',
        async: false,
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
        success : function(){
            $("#deleteMessageModal").modal('hide');
             getAllMessagesJSON();
        }
    });
    $("#deleteMessageModal").modal('hide');
    getAllMessagesJSON();

}

function deleteMessageModal(id){
    $( "body" ).data( "messageID", id );
    $("#deleteMessageModal").modal();
    var message = $("#"+id+"").find('td:first').text();

    $("#deleteMessageModalBody").html("Are you sure you want to delete: <strong>"+message+"</strong> ?");
    $("#btnCancelMessageDeleteModal").focus();
}

function displayEditForm(id){
    $('#btnAddMessage').hide();
    $('.messageRow').hide();
    $('#messageEditForm').show();
    var message = $("#"+id+"").find('td:first').text();
    $('#editMessageText').val(message);

    enableUpdateMessageButton(id);

    $('#btnCancelUpdateMessage').unbind();
    $('#btnCancelUpdateMessage').bind( "click", function() {
        cancelUpdateMessage();
    });

    $('#editMessageText').unbind();
    $( "#editMessageText" ).bind( "keyup", function() {
        if( $("#editMessageText").val().length>0 ){
            enableUpdateMessageButton(id);
        }else{
            disableUpdateMessageButton();
        }
    });
}

function updateMessage(id){

     var message=$('#editMessageText').val();
     var url="webservices/updateMessage.php?id="+id+"&message="+message;

    $.ajax( {
        type: 'POST',
        async: false,
        url : url,
        contentType : "application/json;charset=utf-8",
        dataType : 'json',
        success : function(){
             getAllMessagesJSON();
        }
    });
    getAllMessagesJSON();
}

function cancelUpdateMessage(){
    $('#btnAddMessage').show();
    $('.messageRow').show();
    $('#messageEditForm').hide();
    $('#editMessageText').val();
}

function disableUpdateMessageButton(){
    $('#btnUpdateMessage').unbind();
    $('#btnUpdateMessage').prop('disabled', true);
}

function enableUpdateMessageButton(id){
    $('#btnUpdateMessage').unbind();
    $( "#btnUpdateMessage" ).bind( "click", function() {
        updateMessage(id);
    });
    $('#btnUpdateMessage').prop('disabled', false);

}

function refreshDisplay(){
    getActiveMessageJSON();
    setTimeout(refreshDisplay, 5000);
}

