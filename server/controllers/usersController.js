// const User = require("../model/useModel")
const User = require("../model/useModel")
const brcypt = require("bcrypt")
module.exports.register = async (req,res,next)=> {
//  console.log(req.method,req.url,req.body)
 try{
    const {username , email, password } = req.body;
const usernameCheck =  await User.findOne({username})
const  emailCheck = await User.findOne({email})
if(usernameCheck){
  return res.json({msg:"Username alreay used", status: false})
}
if (emailCheck){
    return res.json({msg:"Eamil already used",status:false})
 }
 const hashedPassword =  await brcypt.hash(password, 10)
 const user = await User.create({
    email,
    username, 
    password: hashedPassword
 })
 return  res.json({status: true,user})

 }catch(ex){
  next(ex)
 }
}
module.exports.login = async (req,res,next)=> {
    //  console.log(req.method,req.url,req.body)
     try{
        const {username , email, password } = req.body;
        const user = await User.findOne({username})
      if(!user)
       return rse.json({msg:"Incorrect username or password ", status:false})
     const isPasswordValid = await brcypt.compare(password,user.password)
      if(!isPasswordValid)
      return rse.json({msg:"Incorrect username or password ", status:false})
    
       delete user.password
       return res.json({status: true, user})
    
     }catch(ex){
      next(ex)
     }
    }
    
module.exports.setAvatar = async (req,res,next)=> {
  try{

    const userId = req.params.id;
    const  avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
    })
    return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage

    })

  }catch(er){
         next(er)
  }

}

module.exports.getAllUsers = async (req,res,next)=> {
try{
 const users = await User.find({_id :{$ne: req.params.id}}).select([
    "email",
    "username",
    "avatarImage",
    "_id",

 ]);
 return res.json(users)
}catch(ex){
 next(ex)
}
}
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    // console.log(users)
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};