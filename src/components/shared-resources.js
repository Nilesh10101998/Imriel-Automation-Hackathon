
let username=""
let password="";

function setUserCredentials(userName, passWord){
  username=userName;
  password=passWord;
}

function  getUserCredentials(){
  return username;
}

export{setUserCredentials, getUserCredentials}
