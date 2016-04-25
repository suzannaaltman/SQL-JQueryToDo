$(function(){

  addTask();

  $("body").on("click", "#addTask", function(){
    var value = $("#taskField").serializeArray()[0].value;
    console.log(value);
    event.preventDefault();
    $.post("/toDo/", {"item": value}).done(function(response){
      console.log('response.item:', response);
      addTask();
    });
  })


  function addTask(){
    $.get("/toDo").done(function(response){
      $.each(response, function(index) {
          $("#itemHolder").append("<div class=\"well\"><input type=\"checkbox\" class=\"check\" />" + response[index].item + "</div><br />");
          console.log(response[index].completed);
          if(Boolean(response[index].completed) === true){
            $( "div.well" ).addClass( "notDone");
          }
      });
      console.log('get called', response);
    });

  };


})
