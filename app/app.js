/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-add').on('click', function(e){
    //gconsole.log(e);
    var keyData = $('.create-region-make').val();
    var valueData = {}
    // write to db
    localStorage.setItem(keyData, valueData);
    // read from db
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    console.log(displayText);
    $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });


  $('.container-region').on('click', '.display-data-item', function(e){
    console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    console.log($(keyData).children());
    //if(keyData.contents())

    var name=    "<input type=\"text\" class=\"create-region-name\" placeholder=\"enter region name\">"
    var desc=    "<input type=\"text\" class=\"create-region-desc\" placeholder=\"enter region description\">"
    var submit="<button class=\"btn-add\">Make a Region</button>"
    $('.container-region').append("<div class=\"container-region-make\">"+name+desc+submit+"</div>");
    //localStorage.removeItem(keyData);
    //$('.container-data').text('');
  });

  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-world').text('');
  });

});


//two types of containers needed
// character and world/region/town/city