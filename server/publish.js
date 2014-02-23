Meteor.publish("allMessages", function (opts) {
  console.log(opts);
  var now = new Date();
  var opts = opts || {};
  var page = opts.page || 1;
  var search = (opts.filterTitle) ? {title: {$regex: opts.filterTitle, $options: 'i'}} : {}
  var res = Messages.find(search, {limit:page * 10});
  console.log('allMessages in '+(new Date() - now)+'ms') ;
  return res;
});