Template.messages.allMessages = function (argument) {
  return Messages.find({}, {sort:{createdAt:1}});
}

// User events
Template.messages.events = {
  'click    .js-filter button': handleFilter,
  'click    .js-loadMore button': function () {
    loadMore(true);
  },
  'keypress .js-filter input': function (ev) {
    if (ev.charCode === 13){
      handleFilter();
    }
  }
}

// Actions

function handleFilter() {
  var text = $('.js-filter input').val();
  console.log(text);
  var query = Session.get('query');
  query.page = 1;
  if (text === '') {
    query.filterTitle = undefined;
  } else {
    query.filterTitle = text;
  }
  Session.set('query', query);
}

function loadMore(force) {
  var force = force || false;
  var threshold, target = $('body');
  if (!target.length) return;

  threshold = $(window).scrollTop() + $(window).height() - target.height();

  // HACK: see http://www.meteorpedia.com/read/Infinite_Scrolling
  if (target.offset().top < threshold || force) {
    var query = Session.get('query');
    console.log(query);
    Session.set('query', { filterTitle:query.filterTitle ,page:query.page+1})
  }     
}

// init
Meteor.startup(function (argument) {
  Session.setDefault('query', {filterTitle:undefined, page:1})
  $(window).scroll(loadMore);
})