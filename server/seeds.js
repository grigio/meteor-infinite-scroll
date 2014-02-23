// generate some fake messages
if (Messages.find({}).fetch().length === 0) {
    var now = new Date();
    _.times(1000, function(n) {
      Messages.insert({
                title:'Message '+ n +': Lorem ipsum bla'+String.fromCharCode(97+Math.round(Math.random()*100)),
                createdAt: new Date()
              });
    });
    console.log('DB seed in '+(new Date() - now)/1000+'s') ;
}