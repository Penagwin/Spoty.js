if (Meteor.isServer) {

  Meteor.startup(function() {
    Playlists.remove({}); 
  });

}