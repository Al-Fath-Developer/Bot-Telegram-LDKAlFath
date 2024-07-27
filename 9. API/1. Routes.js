/**
 * 
 * @param {string} query query dari api
 * @param {Object} payload isi json yng dikirim
 * @returns 
 */
function APIRoutes(query, payload){
    const userApi = new UserAPI()
    const tgApi = new TgApi()

    switch (query) {
        case "sendMessage":
            return userApi.sendMessage(payload)
        case "tgApi":
            return tgApi.general(payload)
        
        
    
        default:
            return {message: "query not found"}
    }

}
// {
//     "method": "sendMessage",
//     "data": {
//         "chat_id": chat id bebas,
//         "text": "hlo",
//         "reply_markup": {
//             "keyboard":  [[ {
//                 "text": "Minta Lokasi",
//                 "request_location": true
//                 },{
//                 "text": "Buka Link Lokasi",
//                 "web_app": {
//                     "url": "https://mylocation.org/"
//                 }
//                 }
//                 ]
                
//                 ],
//                   "one_time_keyboard": true


//         }
//     }
// }'

Logger.log("Loaded APIRoutes.js" + (new Date() - startTime) + "ms")