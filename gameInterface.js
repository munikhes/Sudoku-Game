
function newGame()
{
   if(document.getElementById("userName").value !== "abcd")
    {
      document.getElementById("incorrectUsername").innerHTML = "Incorrect Username";
    }
    if(document.getElementById("password").value !== "1234")
    {
      document.getElementById("incorrectPassword").innerHTML = "Incorrect Password";
    }
  if(document.getElementById("userName").value == "abcd" && 
     document.getElementById("password").value == "1234")
  { window.open("chooseLevel.html","_self");
}
 
  };

   function forgotPassword(){
    document.getElementById("forgot").innerHTML = "Ask Eli";
   };

   let pickedLevel;

   function setLevel(level){

     if(level=="easyLevel"){
     pickedLevel="easyBoard";
   }else if (level=="mediumLevel"){
   pickedLevel="mediumBoard"}
   else {
    pickedLevel="hardBoard"
   } 
   openNewGame();
  } 

  function openNewGame(){
    window.open("suDogkuGame.html?level="+pickedLevel,"_self");
  }

