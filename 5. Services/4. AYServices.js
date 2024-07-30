
class AYServices  {
    constructor(){
         this.ayRepository = new AYRepository()
         this.addNewUser = this.addNewUser.bind(this)
            this.getUsersNotSubmitAY = this.getUsersNotSubmitAY.bind(this)
            this.getUsersNotNgajiToday = this.getUsersNotNgajiToday.bind(this)
            this.getRemindStatusUserByIdTelegram = this.getRemindStatusUserByIdTelegram.bind(this)
            this.setHasRemindByIdTelegram = this.setHasRemindByIdTelegram.bind(this)
            this.setHasSubmitByIdTelegram = this.setHasSubmitByIdTelegram.bind(this)
            this.resetReminderStatus = this.resetReminderStatus.bind(this)
            this.addNgajiHarian = this.addNgajiHarian.bind(this)
            this.getDataAyat = this.getDataAyat.bind(this)
            this.getDataPageFromAyat = this.getDataPageFromAyat.bind(this)
            this.getDataPage = this.getDataPage.bind(this)
            this.setHasNgajiToday = this.setHasNgajiToday.bind(this)
            this.setHasRemindNgaji = this.setHasRemindNgaji.bind(this)
            

    }
    
    /**
     * mengambil semua user yang belum membuka AY
     * @returns {Array}
     */
    getUsersNotSubmitAY  (){
        return this.ayRepository.getUsersNotSubmitAY()
    }
    /**
     * mengambil semua user yang belum ngaji
     * @returns {Array}
     */
    getUsersNotNgajiToday  (){
        
        return this.ayRepository.getUsersNotNgajiToday()
    }

    /**
     * mengambil status reminder dari semua user bedasarkan id telegeram
     * @param {number} id_telegram
     * @returns {Array}
     */
    getRemindStatusUserByIdTelegram(id_telegram){
        return this.ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
    }
    /**
     * nge set kalo id telegram tersebut sudah direminder
     * @param {string} id_telegram
     * 
     */
    setHasRemindByIdTelegram (id_telegram) {
        const arr = this.ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[2] = true;
    this.ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)        

    }
    /**
     * nge set kalo id telegram tersebut udah buka AY  
     * @param {number} id_telegram id telegram user
     */
    setHasSubmitByIdTelegram(id_telegram) {
        const arr = this.ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        Logger.log(arr)
        if(arr){

            arr[3] = true;
            this.ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)        
        }
        

    }
    /**
     * nge reset status reminder semua user
     * @returns number
     */
    resetReminderStatus(){
         return this.ayRepository.resetAllReminderStatus()
    }

    /**
     * nge nambah user baru ke yang reminder AY    
     * @param {number} id_telegram 
     * @param {number} nim
     * @returns number
     */
    addNewUser (id_telegram, nim) {

         return this.ayRepository.addNewUser(id_telegram, nim)
    }

    
    /**
     * @param {number} id_telegram 
     * @param {String} checkPointNgaji menggunakan format nomor surat:ayat terakhir contoh: 5:12 
     * @return {number} lastrow
     */
addNgajiHarian(id_telegram, checkPointNgaji){
    id_telegram = TextUtils.encodeText(id_telegram)
    
   return this.ayRepository.addNgajiHarian(id_telegram, checkPointNgaji)


  
    }
    /**
     * @param {String} no_ayat_in_surah menggunakan format nomor surat:ayat terakhir contoh: 5:12 
     * @return {number} lastrow
     */
getDataAyat(dataAyat){
    
   return this.ayRepository.getAyat(dataAyat)


  
    }
    getDataPageFromAyat(dataAyat){
    
        const page = this.ayRepository.getAyat(dataAyat).page
        return this.ayRepository.getPageAlQuran(page)
     
     
     
       
         }
getDataPage(page){
    
   return this.ayRepository.getPageAlQuran(page)


  
    }

    /**
     * nge set hari ini udah ngaji
     * @param {number} id_telegram 
     */

    setHasNgajiToday(id_telegram){
        const arr = this.ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[5] = true;
    this.ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)  

    }

    /**
     * nge set hari ini udah diingetin ngaji
     * @param {number} id_telegram 
     */
    setHasRemindNgaji(id_telegram){
        const arr = this.ayRepository.getRemindStatusUserByIdTelegram(id_telegram)
        arr[4] = true;
    this.ayRepository.updateStatusUserByIdTelegram(id_telegram, arr)  

    }


}
Logger.log("Loaded AYServices.js" + (new Date() - startTime) + "ms")