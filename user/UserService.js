var mongoose = require('mongoose')
var User = require('../user/User');
var config = require('../config')


function validateAccess(req, res, next){
    console.log("UserId",req.userId)
    
    User.findOne({_id : mongoose.Types.ObjectId(req.userId)}, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send({message:"There was a problem finding the user."});
        if (!user) return res.status(404).send({message:"No user found."});
        // console.log(config['apiAccess'][req.originalUrl])
        console.log(user)
        if(config['apiAccess'][req.originalUrl].indexOf(user.role) == -1){
            return res.status(403).send({message :"Access denied"});
        }
        next()
        
      });
}


function checkBrackets(req, res, next){
    let input = req.body.input
    let arr=[]
    let flag = true
    let closeOf ={
        '{' : '}',
        '[' : ']'
    }

    if(!input.length){ res.send("Please enter some input")}
    for(let i of input){
        if(i == '{' || i == '[' )
            arr.push(i)
        else{
            console.log(arr[arr.length - 1])
            if (closeOf[arr[arr.length - 1]] == i){
                arr.pop()
                console.log(arr)
            }
            else{
                flag = false
            }
        }       
    }
    User.findOneAndUpdate({_id : mongoose.Types.ObjectId(req.userId)},{'$inc' : {'attempts' : 1}}, function(err, user){
        if (err) return res.status(500).send("There was a problem finding the user.");
        if(arr.length == 0 && flag)
            return res.status(200).send({username : user.username, message : "Succeed to be balanced", attempts : user.attempts == null ? 0 : user.attempts + 1})
        return res.status(200).send({username : user.username, message : "failed to be balanced", attempts : user.attempts == null ? 0 : user.attempts + 1})

    })
    
      

}

function deleteUser(req, res, next){
    User.findOneAndRemove({username : req.body.username, role : 'user'}, function(err, user){
        if (err) return res.status(500).send("There was a problem finding the user.");
        return res.send("removed succesfully")

    })
}

function listAllUsers(req, res, next){
    User.find({role : 'user'}, {_id : 0, password : 0, __v : 0, role : 0}, function(err, users){
        if (err) return res.status(500).send("There was a problem finding the users");
        return res.send(users)
    })
}

module.exports = {
    checkBrackets : checkBrackets,
    validateAccess : validateAccess,
    deleteUser : deleteUser,
    listAllUsers : listAllUsers
}