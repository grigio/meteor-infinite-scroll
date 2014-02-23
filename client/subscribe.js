Deps.autorun(function(){
  Meteor.subscribe('allMessages', Session.get('query') );  
});