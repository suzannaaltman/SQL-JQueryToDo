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
        if(Boolean(response[index].completed) === true){
          $("#completedHolder").append("<div class=\"well\">" + response[index].item + "<button class=\"deleteBtn\">Delete</button></div><br />");
          console.log('completed:', response[index].completed);
          console.log('boolean:', Boolean(response[index].completed));
          console.log('true conditional');

        }else{
          $("#itemHolder").append("<div class=\"well\">" + response[index].item + "<button class=\"completeBtn\">Completed</button></div><br />");
        }


      });
      console.log('get called', response);
    });

  };


})
