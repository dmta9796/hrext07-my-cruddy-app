/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  $('.btn-add-world').on('click', function(e){
    //gconsole.log(e);
    var keyData = $('.create-region-make').val();
    var valueData = {}
    localStorage.setItem(keyData, valueData);
    var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    console.log(displayText);
    $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });
  
  $('.btn-add-region').on('click', function(e){
    console.log(e);
    var regionName = $('.create-region-name').val();
    var regionDesc = $('.create-region-desc').val();
    console.log(regionName);
    // write to db
    var worldKey="asdf"
    var obj=localStorage.getItem(worldkey);
    obj[regionName]=regionDesc;

    localStorage.setItem(regionName, obj);
    var displayText = worldKey + ' | ' + localStorage.getItem(worldKey);
    console.log(displayText);
    $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
    $('.input-key').val('');
    $('.input-value').val('');
  });


  $('.container-region').on('click', '.display-data-item', function(e){
    //console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    //console.log($(keyData).children());
    //if(keyData.contents())

    var name=    "<input type=\"text\" class=\"create-region-name\" placeholder=\"enter region name\">"
    var desc=    "<input type=\"text\" class=\"create-region-desc\" placeholder=\"enter region description\">"
    var submit="<button class=\"btn-add-region\">Make a Region</button>"
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