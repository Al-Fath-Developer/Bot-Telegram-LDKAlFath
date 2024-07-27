class TgApi{
    /**
     * melakukan method yang ada di bot telegram API
     * @param {Object} payload 
     * @returns {object}
     */
    general(payload){
        const method = payload.method
        const data = payload.data
        const hasil = bot.telegram.callApi(method, data)
        const result = {message: "berhasil", data: hasil}
        return result
    }
}
Logger.log("Loaded TgApi.js" + (new Date() - startTime) + "ms")

// {https://script.google.com/macros/s/AKfycbzP7BhFXO0opzc4u0yq5FqdpAyP1Dsn8YXpSRqqGW4vRnxDGnTSzsDBWPJXqIaEIJoUAg/exec?customApiQuery=tgApi
//     "method": "sendMessage",
//     "data": {
//         "chat_id": 2043329651,
//         "text": "hlo",
//         "reply_markup": {
//             "inline_keyboard":  [[ {
                
//                 "text": "coba web",
//                 "web_app": {
//                     "url": "https://5af7-114-122-105-57.ngrok-free.app/"
//                 }
//                 }
//                 ]
                
//                 ]


//         }
//     }
// }