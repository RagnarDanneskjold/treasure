var express=require("express");

var app=express();

app.set("env", "development");
if ("development" == app.get("env")){
  app.set("session secret","development-only not-so-secret secret");
  var store=new express.session.MemoryStore;
};

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  "secret":app.get("session secret"),
  "store":store
}));
app.use(app.router);
app.use(express.static(__dirname+"/public"));

app.listen(3000, function(){
  console.log("Listening on port 3000.");
});
