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
      $("#itemHolder").children().remove();
      $.each(response, function(index) {
          $("#itemHolder").append("<div class=\"well\"><input type=\"checkbox\" class=\"check\" />" + response[index].item + "</div><br />");
          console.log('completed:', response[index].completed);
          console.log('boolean:', Boolean(response[index].completed));
          if(Boolean(response[index].completed) === true){
            console.log('true conditional');
            $( "div.well" ).addClass( "done");
          }
      });
      console.log('get called', response);
    });

  };


})
