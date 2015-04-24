function Select()
{
  if (document.getElementById("select").value=="Display All Categories")
   {
     document.getElementById("sectionone").style.visibility="visible";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
     document.getElementById("sectionfour").style.visibility="hidden";
     document.getElementById("sectionfive").style.visibility="hidden";
   }
   else if (document.getElementById("select").value=="Add Product Category") 
   {
      document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="visible";
     document.getElementById("sectionthree").style.visibility="hidden";
    document.getElementById("sectionfour").style.visibility="hidden";
     document.getElementById("sectionfive").style.visibility="hidden";
   }
   else if (document.getElementById("select").value=="Change Description of Category")
   {
    document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="visible";
      document.getElementById("sectionfour").style.visibility="hidden";
     document.getElementById("sectionfive").style.visibility="hidden";
   }
   else if (document.getElementById("select").value=="Delete a Category")
   {
    document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
      document.getElementById("sectionfour").style.visibility="visible";
     document.getElementById("sectionfive").style.visibility="hidden";
   }
     else if (document.getElementById("select").value=="About Me")
   {
    document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
      document.getElementById("sectionfour").style.visibility="hidden";
     document.getElementById("sectionfive").style.visibility="visible";
   }
   else
   {
      document.getElementById("sectionone").style.visibility="hidden";
     document.getElementById("sectiontwo").style.visibility="hidden";
     document.getElementById("sectionthree").style.visibility="hidden";
      document.getElementById("sectionfour").style.visibility="hidden";
     document.getElementById("sectionfive").style.visibility="hidden";
   } 
}

function DisplayCatergories()
{
 var objdisplaycategory= new XMLHttpRequest(); //create ajax request
 
 var url= "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";

 
 objdisplaycategory.onreadystatechange=function()
 {
    if (objdisplaycategory.readyState==4&& objdisplaycategory.status==200)
    {
      var output=JSON.parse(objdisplaycategory.responseText);
      DisplayOutput(output);
    }
 }
 objdisplaycategory.open("GET",url,true);
 objdisplaycategory.send();
 }
 
 function DisplayOutput(result)
 {
   var count=0;
   var displaycategories="<table><tr><th>Category Id</th><th>Category Name </th><th> Category Description </th></tr>";
   
   for (count=0; count<result.GetAllCategoriesResult.length;count++)
   {
    displaycategories+="<tr><td>" +result.GetAllCategoriesResult[count].CID  +"</td><td>"
    +result.GetAllCategoriesResult[count].CName + "</td><td>"+result.GetAllCategoriesResult[count].CDescription +"</td></tr>";
   }
   document.getElementById("sectiononedisplay").innerHTML=displaycategories;
   result+="</table>";
 }
 
 function AddCategory()

{
    //collect data
 var categoryname= document.getElementById("categoryname").value;
 var categorydescription= document.getElementById("categorydescription").value;
 
 
 //create request
 var objcategorychange = new XMLHttpRequest();
 var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";
 
 //create parameter string
 var newcategory='{"CName":"'+categoryname+'","CDescription":"'+categorydescription+'"}';
 
 //check for return
 objcategorychange.onreadystatechange=function()
 {
    if (objcategorychange.readyState==4&& objcategorychange.status==200)
    {
      var change =JSON.parse(objcategorychange.responseText);
      OperationResult(change);
    }
 }
 //start AJAX request
 objcategorychange.open("Post",url, true);
 objcategorychange.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 objcategorychange.send(newcategory);
}

function OperationResult(outputtwo)
{
  if(outputtwo.WasSuccessful==1)
  {
    document.getElementById("sectiontwodisplay").innerHTML="The operation was successful!"
  }
  else (outputtwo.Exception==0)
  {
    document.getElementById("sectiontwodisplay").innerHTML="The operation was not successful!"
  }
}

function ChangeDescription()
{
    //get data from form
    var catdescription = document.getElementById("newcategorydescription").value;
    var newcategory=document.getElementById("newcategory").value;
    
    //create object request
    var objcatdescription= new XMLHttpRequest()
    var urltwo ="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //create parameter string
    var categorydescriptionupdate ='{"CID":"'+newcategory+'","CDescription":"'+catdescription+'"}';

    //check AJAX return
    objcatdescription.onreadystatechange=function()
    {
    if (objcatdescription.readyState==4 && objcatdescription.status==200) 
       
    {
     var categoryupdate=JSON.parse(objcatdescription.responseText);
    CategoryUpdateOutput(categoryupdate);
    }
}

//start AJAX request
objcatdescription.open("POST",urltwo,true);
objcatdescription.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objcatdescription.send(categorydescriptionupdate);
}
function  CategoryUpdateOutput(newoutput)
{
   if(newoutput==1)
   {
     document.getElementById("sectionthreedisplay").innerHTML="The operation was successful!"
   }
   else (newoutput==0)
   {
       document.getElementById("sectionthreedisplay").innerHTML="The operation was not successful!" 
   }
   
}

function ConfirmDeletion()
{
   var txt;
   var r = confirm("Confirm Category Deletion");
 
   if (r == true)
    {
        txt = "You pressed OK!";
        document.getElementById("sectionfourdisplay").innerHTML=txt;
    }
    else
    {
       txt = "You pressed Cancel!";
        document.getElementById("deletecategory").reset(); 
    } 

}
 function DeleteCategory()
 
 {
    ConfirmDeletion() ;
 var objdeleterequest = new XMLHttpRequest();
 var urlfordeletion = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
 urlfordeletion += document.getElementById("deletecategory").value;

 objdeleterequest.onreadystatechange = function()
 {
 if (objdeleterequest.readyState == 4 && objdeleterequest.status == 200)
 {
 var deletecategory = JSON.parse(objdeleterequest.responseText);
 DeleteCategoryFunc(deletecategory);
 }
 }

 objdeleterequest.open("GET", urlfordeletion, true);
 objdeleterequest.send();

 }
 function DeleteCategoryFunc(deletion)
 { 
 if (deletion.DeleteCategoryResult.WasSuccessful == 1)
 {
 document.getElementById("sectionfourdisplay").innerHTML = "The category was deleted successfully!"
 }
 else
 {
 document.getElementById("sectionfourdisplay").innerHTML = "The category was not deleted successfully!" + "<br>" + deletion.DeleteCategoryResult.Exception;
 }
 }


