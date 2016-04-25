$(function(){
  $.get("/toDo").done(function(response){
    addTask(response);
    console.log(response);
  });

  $("addTask").on("submit", function(){
    console.log("addTask clicked");
    $.post("/toDo/add", {"item": response}).done(function(response){
      console.log('response.item:', response);
    });
    addTask();
  })


  function addTask(response){
    $.each(response, function(index) {
        $("#itemHolder").append("<div class=\"well\">" + response[index].item + "</div><br />");
        console.log(response[index].completed);
        if((response[index].completed).toString() === "false"){
          $( "div.well" ).addClass( "notDone");
        }
    });
  };

})
