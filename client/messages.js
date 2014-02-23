Template.messages.allMessages = function (argument) {
  return Messages.find({}, {sort:{createdAt:1}});
}

// User events
Template.messages.events = {
  'click    .js-filter button': handleFilter,
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

function loadMore() {
  var threshold, target = $('body');
  if (!target.length) return;

  var threshold = $(window).scrollTop() + $(window).height() - target.height();

  if (target.offset().top < threshold) {
      if (!target.data('visible')) {
          // console.log('target became visible (inside viewable area)');
          var query = Session.get('query');
          Session.set('query', { filterTitle:query.filterTitle ,page:query.page+1})

          target.data('visible', true);
      }
  } else {
      if (target.data('visible')) {
          // console.log('target became invisible (below viewable arae)');
          target.data('visible', false);
      }
  }        
}

// init
Meteor.startup(function (argument) {
  Session.setDefault('query', {filterTitle:undefined, page:1})
  $(window).scroll(loadMore);
})