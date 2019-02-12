/*
Init app
interact with DOM
interact with localstorage

 */
//helper function to fetch data from object
 var fetchelements=function(data,keyData){
  //onsole.log(data);
  for(item of Object.keys(data)){
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ keyData+'">'+item+'</div>');
  }
 }

$(document).ready(function(){
  var worldKey;
  $('.container-main').on('click','.btn-add-place', function(e){
    //console.log(e);
    var keyData = $('.create-region-make').val();
    var valueData = localStorage.getItem(keyData);
    if(e.currentTarget.parentElement.className==="container-form"){
        valueData={}
      localStorage.setItem(keyData, JSON.stringify(valueData));
      var displayText = keyData + ' | ' + localStorage.getItem(keyData);
      $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
    else{
      var regionName = $('.create-region-name').val();
      var regionDesc = $('.create-region-desc').val();
      //console.log(e.currentTarget.parentElement.parentElement.childNodes[0])
      worldKey=e.currentTarget.parentElement.parentElement.childNodes[0].dataset.keyvalue;   //fetch the world key value
      var obj=JSON.parse(localStorage.getItem(worldKey));
      obj[regionName]=regionDesc;
      console.log(regionName,Object.entries(obj));

      localStorage.setItem(worldKey, JSON.stringify(obj));
      var displayText = worldKey + ' | ' + obj[regionName];
      console.log(displayText);
      $(".container-region-make").remove();
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ worldKey+'">'+regionName+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
  });
  $('.container-main').on("click",".btn-update",function(e){
    console.log(e.currentTarget.parentElement.className);
    var parentClass= e.currentTarget.parentElement.className;
    if(parentClass==="container-region-update"){
      var prev=$(".update-region-prev").val();
      var next=$(".update-region-next").val();
      var obj=localStorage.getItem(prev);
      localStorage.removeItem(prev);
      localStorage.setItem(next,obj);
      $(".container-region-update").remove();
    }
    else{
      $(".container-region-update").remove();
      var prev=    "<input type=\"text\" class=\"update-region-prev\" placeholder=\"enter old region name\">"
      var next=    "<input type=\"text\" class=\"update-region-next\" placeholder=\"enter new region name\">"
      var submit=  "<button class=\"btn-update\">Make a Region</button>";
      $('.container-region').append($("<div class=\"container-region-update\">"+prev+next+submit+"</div>"));
    }
  });
  $('.container-main').on("click",".btn-select",function(e){
    $(".container-region").empty();
    console.log(e.currentTarget)
    var keyData = $('.create-region-make').val();
    var data=JSON.parse(localStorage.getItem(keyData))
    if(!Object.is(data,null)){
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ keyData+'">'+keyData+'</div>');
      fetchelements(data,keyData);
    }
  });
  $('.container-region').on('click', '.display-data-item', function(e){
    var keyData = e.currentTarget.dataset.keyvalue;
    var name=    "<input type=\"text\" class=\"create-region-name\" placeholder=\"enter region name\">"
    var desc=    "<input type=\"text\" class=\"create-region-desc\" placeholder=\"enter region description\">"
    var type=    "<input type=\"text\" class=\"create-region-type\" placeholder=\"enter region type\">"
    var submit=  "<button class=\"btn-add-place\">Make a Region</button>";
    $(submit).appendTo(".container-region-make");
    $(".container-region-make").remove();
    $('.container-region').append($("<div class=\"container-region-make\">"+name+desc+submit+"</div>"));
  });
  $('.btn-delete').click(function(e){
    var keyData = $('.create-region-make').val();
    localStorage.removeItem(keyData);
    console.log($(".display-data-item").html())
    var item=$(".display-data-item");
    if(item.html()===keyData){

    }
    $('.container-world').text('');
  });

});


//two types of containers needed
// character and world/region/town/city


//day 1
// figurring out the delegation took twice as long as expected
// made overall world text and adds to object database.

//day 2 
// goal: have update,delete,read for world and individual regions
// 1) C.R.U.D. for world 
//  I)   edit create to not override world. (check)
//  II)  read for world (check)
//  III) delete a world (check)

// 2) CRUD for regions
//      I)    access to regions (check)
//      II)   delete a region
//      III)  update a region