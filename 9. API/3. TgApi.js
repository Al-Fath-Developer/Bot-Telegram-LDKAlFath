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