class UserAPI{
/**
 * Mengirim pesan
 * @param {Object} payload 
 * @returns {object}
 */
    sendMessage(payload){
        const pesan = payload.message
        const id_telegram = payload.id_telegram
        const extra = payload.extra
      const hasil = bot.telegram.sendMessage(id_telegram, pesan, extra)

        
        return {message: "Berhasil", data:hasil}

    }

}