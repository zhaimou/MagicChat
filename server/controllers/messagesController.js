const messageModel = require("../model/messageModel");
// console.log(messageModel)
module.exports.getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      console.log(from, to)
      const messages = await messageModel.find({
        users:{
          $all: [from, to] 
        },
      }).sort({ updatedAt: 1 });
    //   const messages = await Messages.find({
        // users: {
        //   $all: [from, to],
        // },
    //   }).sort({ updatedAt: 1 });
    //   console.log(messages)
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
    //   console.log(projectedMessages)
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };

module.exports.addMessage = async (req,res,next) => {
    try{
        const {from, to,message} = req.body;
        const data = await messageModel.create({
            message: {text:message},
            users:[from, to],
            sender: from,
        });
        if(data)return res.json({msg: "message addedd successfully"})
        return res.json({msg: "Failed to add message to the database"});
        
    }catch(ex){
        next(ex);
    }
    
}