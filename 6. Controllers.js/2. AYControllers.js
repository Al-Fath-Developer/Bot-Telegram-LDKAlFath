const ayServices = new AYServices()
class AYControllers{
/**
 * Nge set AY sudah di submit
 * @param {number} id_telegram 
 * @returns 
 */
    setAYHasSubmitByIdTelegram(id_telegram) {
       
        return ayServices.setHasSubmitByIdTelegram(id_telegram)

    }
    /**
     * melakukan reminder user yang belum membuka AY dan belulm di reminder
     */
    static remindUserNotSubmitAY  (){
        try{
        
            let arrDataRemind = ayServices.getUsersNotSubmitAY()
            arrDataRemind.forEach((e)=>{
                    const id_telegram =  e[0]
                    const has_remind = e[2]
                    const has_open = e[3]
                    let pesan  =""
                    if (!has_open && !has_remind){
                        
                        const user =(new UserServices()).getUserInfoById(id_telegram) 
        if (user){
            ayServices.setHasRemindByIdTelegram(id_telegram)
            pesan = "‼️Reminder AY\n\nHallo " + user.nama_panggilan + "\nJangan lupa buka AY yaa"
            bot.telegram.sendMessage(id_telegram, pesan)
            
            Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa") 
        }else{
            Logger.log("id " + id_telegram + "tidak ditemukan")
        }
        }
                    
        })
        }catch(e){
            errorLog(e);
        }
        }   
         /**
     * melakukan reminder user yang belum membuka AY dan belulm di reminder
     */
    static remindUserNotSubmitNgaji  (){
        try{
        
            let arrDataRemind = ayServices.getUsersNotNgajiToday()
            arrDataRemind.forEach((e)=>{
                    const id_telegram =  e[0]
                    const has_remind = e[4]
                    const has_ngaji = e[5]
                    let pesan  =""
                    if (!has_ngaji && !has_remind){
                        
                        const user =(new UserServices()).getUserInfoById(id_telegram) 
        if (user){
            ayServices.setHasRemindNgaji(id_telegram)
            pesan = "‼️Reminder Ngaji\n\nHallo " + user.nama_panggilan + ", Jangan lupa ngaji hari ini ya 🤗 \n\nKalau sudah ngaji, silahkan konfirmasi ngaji dengan format sebagai berikut"
            pesan = pesan + "\n format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255"
            bot.telegram.sendMessage(id_telegram, pesan)
            
            Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa") 
        }else{
            Logger.log("id " + id_telegram + "tidak ditemukan")
        }
        }
                    
        })
        }catch(e){
            errorLog(e);
        }
        }   
        static resetStatus(){
            return ayServices.resetReminderStatus();
        }
        
/**
 * nte submit konfirmasi ngaji
 * @param {ctx} ctx 
 * @returns 
 */
        addKonfirmNgaji(ctx){
            const formatKonfirmNgaji = "format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255"
            ctx.reply(ctx.match[1])
    if (/^\d{1,3}:\d{1,3}$/.test(ctx.match[1])) {

        const dataAyat =  ayServices.addNgajiHarian(ctx.from.id, ctx.match[1].trim())
        if(dataAyat == null){

            return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid\n Silahkan gunakan format sebagai berikut\n\n" + formatKonfirmNgaji)
        }else if (dataAyat.surah == null){
            return ctx.reply(dataAyat)
        }
        ayServices.setHasNgajiToday(ctx.from.id)

        ctx.reply(
`Terima Kasih sudah konfirmasi ngaji hari ini
Checkpoint ayat pada hari ini adalah sebagai berikut

Nama Surah: ${dataAyat.surah}
Juz: ${dataAyat.juz}
Ayat:  ${dataAyat.no_ayat}
Isi Ayat
${dataAyat.ayat}


`
        )
    


    }else{
        ctx.reply("Maaf format salah, \nIsi dengan surat & ayat terakhir yang kamu baca hari ini\n" +formatKonfirmNgaji )
    }
}
}