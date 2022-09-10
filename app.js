const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/index.html");

})

app.post("/",function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;

  var data = {
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields : {FNAME : fname, LNAME : lname}
      }
    ]
  }
   const jsonData = JSON.stringify(data);

   const url = "https://us17.api.mailchimp.com/3.0/lists/58d16185be";

   const options = {
     method : "POST",
     auth : "Senthil_Athiban:112318b75e307d68b5334c717f2d61add-us17"
   }
   const request = https.request(url, options, function(response){
     if (response.statusCode===200){
       res.sendFile(__dirname+"/success.html")
     }
     else {
       {
         res.sendFile(__dirname+"/failure.html")
       }
     }


     response.on("data", function(data){
       console.log(JSON.parse(data));
     })
   })
   request.write(jsonData);
   request.end();
});
app.post("/failure",function(req,res)
{
  res.redirect("/")
})
app.listen(process.env.PORT, function(req, res){
  console.log("Server Started");
})



//a46d16806d55e99ca45582e445899f58-us17
//58d16185be
