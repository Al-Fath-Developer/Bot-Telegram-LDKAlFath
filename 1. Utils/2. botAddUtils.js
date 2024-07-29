/**
 * Edits the text of a message using the Telegram Bot API.
 * @param {object} msg - The message object containing the chat ID and message ID.
 * @param {string} new_text - The new text to replace the existing message text.
 */
function editMessageTextFromMSG(msg, new_text, obj = {}){

    bot.telegram.callApi("editMessageText", {
        chat_id: msg.result.chat.id,
        message_id: msg.result.message_id,
        text: new_text,
        ...obj
    
       })
    }
/**
 * Edits the text of a message in a chat based on the chat ID and message ID.
 * @param {string|number} chat_id - The ID of the chat.
 * @param {number} message_id - The ID of the message.
 * @param {string} new_text - The new text to replace the existing message text.
 */
function editMessageTextFromChatAndMessageId(chat_id, message_id, new_text, obj = {}){

    bot.telegram.callApi("editMessageText", {
        chat_id: chat_id,
        message_id: message_id,
        text: new_text,
        ...obj
    
       })
    }
    /**
     * Shows typing status in the chat.
     * @param {Object} ctx - The context object containing the update message.
     */
    function showTypingStatus(ctx){
    
    bot.telegram.callApi("sendChatAction", {
        chat_id: ctx.update.message.chat.id,
        action: 'typing'
    
       })
    }
    /**
     * Shows typing status in the chat.
     * @param {Object} ctx - The context object containing the update message.
     * @param {string} type - The type of upload status to show.
     */
    function showBotStatus(ctx){
        let action;
        if(ctx.message?.text){
            action = 'typing'
        }
        else if (ctx.update?.callback_query){
         return   bot.telegram.callApi("sendChatAction", {
        
                chat_id: ctx.update.callback_query.message.chat.id,
                action: "typing"
            
               })
                   
         }else if (ctx.message?.photo){
            action = 'upload_photo'
        }else if (ctx.message?.document){
            action = 'upload_document'
        }else if (ctx.message?.voice){
            action = 'upload_voice'
        }else if (ctx.message?.video_note){
            action = 'upload_video_note'
        }else{
            action = 'typing'
        }



       

    
   return bot.telegram.callApi("sendChatAction", {
        
        chat_id: ctx.message.chat.id,
        action: action
    
       })
    }
    /**
     * Adds a like reaction to the message from the provided context.
     * @param {Object} ctx - The context object containing the message information.
     */
    function memberiLikeFromCtx(ctx){
    
    bot.telegram.callApi("setMessageReaction", {
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reaction: [{
          type: 'emoji',
          emoji: '👍'
        }]
    
       })
    }