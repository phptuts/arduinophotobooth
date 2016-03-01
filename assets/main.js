/**
 * Created by noahglaser on 12/21/15.
 */



$(document).ready(function() {
    var ws = new WebSocket("ws://localhost:8001/");
    var sayCheese = new SayCheese('#show', { snapshots: true });
    sayCheese.start();

    ws.onopen = function()
    {
    };

    ws.onmessage = function (evt)
    {
        console.log(evt);
        var data = JSON.parse(evt.data);
        $("#state").html(data.number);
        console.log(sayCheese.takeSnapshot());
    };

    sayCheese.on('snapshot', function(snapshot) {
        $('#picture').prop('src', snapshot.toDataURL('image/png'));
    });




});