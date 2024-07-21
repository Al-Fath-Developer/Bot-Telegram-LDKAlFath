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