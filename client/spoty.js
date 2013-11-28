Router.map(function () {
 // layoutTemplate: 'layout'
this.route('settings', {path: '/settings' });
this.route('settings', {path: '/settings' });
this.route('me', {path: '/me',
                  template: 'me',
                     loadingTemplate: 'loading',
                    before: function(){

        if(_.isNull(Meteor.user())){
            Router.go(Router.path('home'));
          } },
                    waitOn: function () {
                     var useremail=  Meteor.userId();//.emails[0].address;
   return Meteor.subscribe('playlists', '',useremail);
},
 
  data: function () {
        //  Playlists =  Meteor.Collection('playlists');
 templateData = { displaypage: Playlists.find() };
    return templateData;

  
}
});

  
this.route('displaypage', {
  path: '/user/:username',
  template: 'displaypage',
 
  waitOn: function () {
    var usern = this.params.username;
   return Meteor.subscribe('playlists', usern);
  },
 
  data: function () {
        //  Playlists =  Meteor.Collection('playlists');
 templateData = { displaypage: Playlists.find() };
    return templateData;

  
  }
  });
});


Template.me.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { 
      var message = document.getElementById('message');
    var user = Meteor.user();

      if (message.value != '' && user.emails[0].address != '') {
        Playlists.insert({
          song: message.value, user: user.emails[0].address, owner: Meteor.userId()
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}