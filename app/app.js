/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?


  // $('.btn-add-place').on('click', function(e){
  //   //gconsole.log(e);
  //   var keyData = $('.create-region-make').val();
  //   var valueData = {}
  //   localStorage.setItem(keyData, valueData);
  //   var displayText = keyData + ' | ' + localStorage.getItem(keyData);
  //   console.log(displayText);
  //   $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
  //   $('.input-key').val('');
  //   $('.input-value').val('');
  // });
  
  $('.container-main').on('click','.btn-add-place', function(e){
    console.log(e);
    var keyData = $('.create-region-make').val();
    var valueData = localStorage.getItem(keyData)
    //console.log(e.currentTarget.parentElement.className==="container-form");
    if(e.currentTarget.parentElement.className==="container-form"){//Object.is(valueData,null)){
      valueData={}
      localStorage.setItem(keyData, JSON.stringify(valueData));
      var displayText = keyData + ' | ' + localStorage.getItem(keyData);
      //console.log(displayText);
      $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
    else{
      var regionName = $('.create-region-name').val();
      var regionDesc = $('.create-region-desc').val();
      //console.log(regionName);
      // write to db
      //console.log(e.currentTarget.parentElement.parentElement)
      var worldKey=e.currentTarget.parentElement.parentElement.childNodes[0].dataset.keyvalue;   //fetch the world key value
      var obj=JSON.parse(localStorage.getItem(worldKey));
      obj[regionName]=regionDesc;
      console.log(regionName,Object.entries(obj));

      localStorage.setItem(worldKey, JSON.stringify(obj));
      var displayText = worldKey + ' | ' + obj[regionName];
      console.log(displayText);
      $('.container-region').html('<div class="display-data-item" data-keyValue="'+ regionName+'">'+worldKey+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
  });

  $('.container-region').on('click', '.display-data-item', function(e){
    console.log("test")
  })


  $('.container-region').on('dblclick', '.display-data-item', function(e){
    //console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    //console.log($(keyData).children());
    //if(keyData.contents())

    var name=    "<input type=\"text\" class=\"create-region-name\" placeholder=\"enter region name\">"
    var desc=    "<input type=\"text\" class=\"create-region-desc\" placeholder=\"enter region description\">"
    var type=    "<input type=\"text\" class=\"create-region-type\" placeholder=\"enter region type\">"
    var submit=  "<button class=\"btn-add-place\">Make a Region</button>";
    //$abutton=$("<div class=\"container-region-make\">"+name+desc+submit+"</div>");
    //$('.btn-add-region').html(submit).appendTo(".container-region");
    $(submit).appendTo(".container-region-make");
    $('.container-region').append($("<div class=\"container-region-make\">"+name+desc+submit+"</div>"));
    //localStorage.removeItem(keyData);
    //$('.container-data').text('');
  });

  // delete world
  $('.btn-delete').click(function(e){
    var keyData = $('.create-region-make').val();
    localStorage.removeItem(keyData);
    $('.container-world').text('');
  });

});


//two types of containers needed
// character and world/region/town/city