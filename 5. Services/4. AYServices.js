const ayRepository = new AYRepository()

class AYServices  {
    
    /**
     * mengambil semua user yang belum membuka AY
     * @returns {Array}
     */
    getUsersNotSubmitAY  (){
        return ayRepository.getUsersNotSubmitAY()
    }
    /**
     * mengambil semua user yang belum ngaji
     * @returns {Array}
     */
    getUsersNotNgajiToday  (){
        
        return ayRepository.getUsersNotNgajiToday()
    }

    /**
     * mengambil status reminder dari semua user bedasarkan id telegeram
     * @param {number} id_telegram
     * @returns {Array}
     */
    getRemindStatusUserByIdTelegram(id_telegram){
        return ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
    }
    /**
     * nge set kalo id telegram tersebut sudah direminder
     * @param {string} id_telegram
     * 
     */
    setHasRemindByIdTelegram (id_telegram) {
        const arr = ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[2] = true;
    ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)        

    }
    /**
     * nge set kalo id telegram tersebut udah buka AY  
     * @param {number} id_telegram id telegram user
     */
    setHasSubmitByIdTelegram(id_telegram) {
        const arr = ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        Logger.log(arr)
        if(arr){

            arr[3] = true;
            ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)        
        }
        

    }
    /**
     * nge reset status reminder semua user
     * @returns number
     */
    resetReminderStatus(){
         return ayRepository.resetAllReminderStatus()
    }

    /**
     * nge nambah user baru ke yang reminder AY    
     * @param {number} id_telegram 
     * @param {number} nim
     * @returns number
     */
    addNewUser (id_telegram, nim) {
         return ayRepository.addNewUser(id_telegram, nim)
    }

    
    /**
     * @param {number} id_telegram 
     * @param {String} checkPointNgaji menggunakan format nomor surat:ayat terakhir contoh: 5:12 
     * @return {number} lastrow
     */
addNgajiHarian(id_telegram, checkPointNgaji){
    
   return ayRepository.addNgajiHarian(id_telegram, checkPointNgaji)


  
    }

    /**
     * nge set hari ini udah ngaji
     * @param {number} id_telegram 
     */

    setHasNgajiToday(id_telegram){
        const arr = ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[5] = true;
    ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)  

    }

    /**
     * nge set hari ini udah diingetin ngaji
     * @param {number} id_telegram 
     */
    setHasRemindNgaji(id_telegram){
        const arr = ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[4] = true;
    ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)  

    }


}