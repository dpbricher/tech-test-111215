define([
    "backbone"
], function(
    BB
){
    return BB.Model.extend({
        idAttribute:"_id",

        validate:function(attributes, options){
            var error;

            console.log("attributes: " , attributes)

            switch (true){
                case attributes.username.length == 0:
                    error   = "User Name cannot be empty";
                    break;

                case attributes.fullname.length == 0:
                    error   = "Full Name cannot be empty";
                    break;

                case attributes.email.length == 0:
                    error   = "email cannot be empty";
                    break;

                case attributes.password != null
                    && attributes.password.length == 0:
                    error   = "Password cannot be empty";
                    break;
            }

            if (error != null)
                console.error(error);

            return error;
        },

        addFriend:function(friendId){
            var friendList  = this.get("friends");

            if (friendList.indexOf(friendId) == -1){
                friendList.push(friendId);

                this.save({ friends:friendList }, { patch:true });
            }
        },

        removeFriend:function(friendId){
            var friendList  = this.get("friends");
            var index       = friendList.indexOf(friendId);

            if (index != -1){
                friendList.splice(index, 1);

                this.save({ friends:friendList }, { patch:true });
            }
        }
    })
});
