/*
Init app
interact with DOM
interact with localstorage

 */
//helper functions to abstract database get and set

var putdata=function(key,obj){
  localStorage.setItem(key,JSON.stringify(obj));
}
var getdata=function(key){
  return JSON.parse(localStorage.getItem(key))
}

var removedata=function(key){
  localStorage.removeItem(key);
}


//helper functions for objec manupulation;
var getdesc=function(obj,key){
  return obj[key];
}
var deleteitem=function(obj,key){
  delete obj[key];
}
var updateitem=function(obj,key,val){
  obj[key]=val;
}


//helper function to fetch data from object
 var fetchelements=function(data,keyData){
  //onsole.log(data);
  for(item of Object.keys(data)){
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ keyData+'">'+item+'</div>');
  }
 }

$(document).ready(function(){
  var worldKey;
  $('.container-form').on('click','.btn-add-place', function(e){
    //console.log(e);
    var keyData = $('.create-region-make').val();
    var valueData = getdata(keyData); //localStorage.getItem(keyData);
    if(e.currentTarget.parentElement.className==="container-form"){
        valueData={}
      putdata(keyData,valueData);//localStorage.setItem(keyData, JSON.stringify(valueData));
      var displayText = keyData + ' | ' + getdata(keyData);//localStorage.getItem(keyData);
      $('.container-region').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+keyData+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
    else{
      var regionName = $('.create-region-name').val();
      var regionDesc = $('.create-region-desc').val();
      //console.log(e.currentTarget.parentElement.parentElement.childNodes[0])
      worldKey=e.currentTarget.parentElement.parentElement.childNodes[0].dataset.keyvalue;   //fetch the world key value
      var obj=getdata(worldKey);//JSON.parse(localStorage.getItem(worldKey));
      obj[regionName]=regionDesc;
      console.log(regionName,Object.entries(obj));

      putdata(worldKey,obj);//localStorage.setItem(worldKey, JSON.stringify(obj));
      var displayText = worldKey + ' | ' + obj[regionName];
      console.log(displayText);
      $(".container-region-make").remove();
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ worldKey+'">'+regionName+'</div>');
      $('.input-key').val('');
      $('.input-value').val('');
    }
    e.stopPropagation();
  });
  $('.container-form').on("click",".btn-update",function(e){
    console.log(e.currentTarget.parentElement.className);
    var parentClass= e.currentTarget.parentElement.className;
    if(parentClass==="container-region-update"){
      var prev=$(".update-region-prev").val();
      var next=$(".update-region-next").val();
      var obj=getdata(prev);//localStorage.getItem(prev);
      removedata(prev);// localStorage.removeItem(prev);
      putdata(next,obj);//localStorage.setItem(next,obj);
      $(".container-region-update").remove();
    }
    else{
      $(".container-region-update").remove();
      var prev=    "<input type=\"text\" class=\"update-region-prev\" placeholder=\"enter old region name\">"
      var next=    "<input type=\"text\" class=\"update-region-next\" placeholder=\"enter new region name\">"
      var submit=  "<button class=\"btn-update\">Rename a Region</button>";
      $('.container-form').append($("<div class=\"container-region-update\">"+prev+next+submit+"</div>")); //want to update in form
      e.stopPropagation()
    }
  });
  $('.container-form').on("click",".btn-select",function(e){
    $(".container-region").empty();
    console.log(e.currentTarget)
    var keyData = $('.create-region-make').val();
    var data= getdata(keyData);//JSON.parse(localStorage.getItem(keyData))
    if(!Object.is(data,null)){
      $('.container-region').append('<div class="display-data-item" data-keyValue="'+ keyData+'">'+keyData+'</div>');
      fetchelements(data,keyData);
    }
  });
  $('.container-region').on('click','.display-data-item',function(e){
    var addbtn=    "<button class=\"btn-add-place\">add a subregion</button>";
    var updatebtn= "<button class=\"btn-update\"> rename Region</button>";
    var removebtn= "<button class=\"btn-delete\">remove a Region</button>";
    var viewbtn= "<button class=\"btn-select\">view region description</button>";
    $(".container-region-menu").remove();
    //console.log(e.currentTarget);
    $(e.currentTarget).append($("<div class=\"container-region-menu\">"+addbtn+updatebtn+removebtn+viewbtn+"</div>"))

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

  //manu[ulate object buttons
  $('.container-region').on('click',".btn-add-place" ,function(e){//'.display-data-item', function(e){
    var keyData = e.currentTarget.parentElement.parentElement.dataset.keyvalue
    var name=    "<input type=\"text\" class=\"create-region-name\" placeholder=\"enter region name\">"
    var desc=    "<input type=\"text\" class=\"create-region-desc\" placeholder=\"enter region description\">"
    var type=    "<input type=\"text\" class=\"create-region-type\" placeholder=\"enter region type\">"
    var submit=  "<button class=\"btn-add-place\">Make a Region</button>";
    $(submit).appendTo(".container-region-make");
    $(".container-region-make").remove();
    $('.add-holder').append($("<div class=\"region-make\" data-world=\""+keyData+"\">"+name+desc+submit+"</div>"));
    $('.container-region-menu').remove();
    e.stopPropagation();
  });
  $(".add-holder").on('click','.btn-add-place',function(e){
    console.log("hi")
    var region=$(".create-region-name").val();
    var desc  =$(".create-region-desc").val();
    var world = e.currentTarget.parentElement.dataset.world;
    var obj=getdata(world);
    obj[region]=desc;
    putdata(world,obj);
    $(".container-region").append('<div class="display-data-item" data-keyValue="'+ world+'">'+region+'</div>');
    $(".add-holder").empty();
    e.stopPropagation();

  })
  $('.container-region').on('click',".btn-select" ,function(e){
    console.log(e.currentTarget.parentElement.parentElement.parentElement);
    var region= e.currentTarget.parentElement.parentElement.childNodes[0].textContent;
    worldKey=e.currentTarget.parentElement.parentElement.dataset.keyvalue
    var obj=getdata(worldKey);
    var desc=obj[region];
    $(".description-holder").append("<div class=\"description\">"+region+":"+desc+"</div>")
    $(".container-region-menu").remove();
    //e.preventDefault();
    e.stopPropagation();
  });
  $('.container-region').on('click',".btn-update" ,function(e){
    console.log(e.currentTarget.parentElement.parentElement.childNodes[0].textContent);
    var region=e.currentTarget.parentElement.parentElement.childNodes[0].textContent
    var text= "<input type= \"text\" class=\"text\">"
    var btn = "<button class= \"btn-update\">Submit</button>"
    var world= e.currentTarget.parentElement.parentElement.parentElement.childNodes[0].textContent;
    $(".update-holder").append("<div class= \"update-obj\" data-keyValue=\""+region+"\" data-world =\""+world+"\">"+text+btn+"</div>")
    $(e.currentTarget.parentElement).remove();
    e.stopPropagation();

  });
  $('.container-region').on('click',".btn-delete" ,function(e){
    var region= e.currentTarget.parentElement.parentElement.childNodes[0].textContent;
    var key=e.currentTarget.parentElement.parentElement.dataset.keyvalue
    var obj=getdata(key);

    delete obj[region];

    putdata(key,obj);
    if(region!==key){
      $(e.currentTarget.parentElement.parentElement).remove();
    }
    else{
      $(e.currentTarget.parentElement).remove();
    }
    e.stopPropagation();
  });

  // remove description
  $(".description-holder").on("click",".description",function(e){
    $(e.currentTarget).remove();
  });
  $(".update-holder").on("click",".btn-update",function(e){
    console.log(e.currentTarget.parentElement.dataset.keyvalue)  //need to fetch object
    console.log(e.currentTarget.parentElement.dataset.world)
    var region= e.currentTarget.parentElement.dataset.keyvalue;
    var world=e.currentTarget.parentElement.dataset.world;
    var newregion= $(".text").val();
    var obj=getdata(world);
    var desc=obj[region];
    delete obj[region];
    obj[newregion]=desc;
    putdata(world,obj);
    $(".container-region").empty();
    $('.container-region').append('<div class="display-data-item" data-keyValue="'+ world+'">'+world+'</div>');
    fetchelements(obj,world);
    $(e.currentTarget.parentElement).remove();
  })

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
//      I)     add regions (check)
//      II)    access to regions (check)
//      III)   delete a region (work in progress)
//      IV)    update a region (work in progress)


// I need to lower the scope of the problem 
//(seems like I was overly ambitious or didn't organize the data correctly)


//day 3
// I need to bring the scope down to just add stuff to the database.
// found tons of bugs concerning dom manupulation. 
// for the descriptions I should a seperate box to handle description content.



// day 4 
// need to call the program I have feature complete to do styling.