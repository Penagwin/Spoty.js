  Playlists = new Meteor.Collection('playlists');


if (Meteor.isServer) {

  Playlists.insert({
  song: "spotify:user:128367137:playlist:1xVQx07fAduYdxchwljeys", user: "langpenguins@gmail.com"
        }); 

  Meteor.publish('playlists', function (name, id) {
    if(name != ''){
      return Playlists.find( {user: name});
    }
    return Playlists.find( {owner: id});
  });
   Playlists.allow({
//only allow inserting if the user is not anonymous, and the document
//being inserted belongs to the user inserting it.      
            'insert': function(userId, doc) {           
              
              return (userId && doc.owner === userId);
            },
 
            //for each of the records being update, make sure the current user is the owner
            'update': function(userId, docs, fields, modifier) {
                        for(var i=0; i<docs.length; i++ ){
                                    if ( docs[i].user_id != userId) {
                                                return false;
                                    }
                        }
             
                        return true;
            },
 
            //for each of the records being removed, make sure the user owns them
            'remove': function(userId, docs) {
                        for(var i=0; i<docs.length; i++ ){
                                    if ( docs[i].user_id != userId) {
                                                return false;
                                    }
                        }
                        return true;                
            }           
});
}

/*
  Playlists.insert({
  song: "spotify:user:128367137:playlist:1xVQx07fAduYdxchwljeys", user: "langpenguins@gmail.com"
        });  
Playlists.insert({
  song: "spotify:user:128367137:playlist:1y7GjDRcIyQ0CBBsumFICT", user: "langpenguin@gmail.com"
        });
  });
  */