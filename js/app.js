/**
 * Created with JetBrains WebStorm.
 * User: bradleymarks
 * Date: 2013-09-10
 * Time: 8:38 PM
 * To change this template use File | Settings | File Templates.
 */

var parseID="riKAAGlObXvmA7PkTp3WBfzNmh9A8KGLEYdMZPUl";
var parseRestKey="mhkzufGzCnv54gNrgbd5D96PsvmfMa0lw1phLBdw";
$(document).ready(function(){

    getMessages();
    $("#send").click(function(){
        var username = $('#username').val();
        var message =  $('#message').val();
        console.log(username) ;
        $.ajax({
            url:'https://api.parse.com/1/classes/Chat',
            headers: {
                'X-Parse-Application-ID':
                    parseID,
                'X-Parse-REST-API-Key':
                    parseRestKey
            },
            contentType:
                'application/json',
            dataType:
                'json',
            processData:false,
            data: JSON.stringify({
                'username': username,
                'message': message
            })    ,
            type: 'POST'    ,
            success:function() {
                console.log('sent');
                getMessages();

            }    ,
            error: function(){
                console.log('error');
            }



        }) ;


    } );
})

function getMessages(){
    $.ajax({
        url:'https://api.parse.com/1/classes/Chat',
        headers:{
            'X-Parse-Application-Id':
                parseID,
            'X-Parse-REST-API-Key':
                parseRestKey
        },
        contentType:'application/json',
        dataType:'json' ,
        type:'GET',
        success: function(data){
            console.log('get');
            updateView(data);
        },
        error: function(){
            console.log('error');
        }
    }) ;


}
function updateView(messages){
    var table = $('.table tbody');
    table.html('');
    $.each(messages.results, function(index, value){
        var trEl=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');
        table.append(trEl);
    });
    console.log(messages);

}
