const infoServices = new  InfoServices()
class InfoControllers{
  /**
   * Mengambil list fitur yang ada di bot ini
   * @param {ctx} ctx 
   */
    getListFeature(ctx){
        // const message_id = ctx.update.callback_query.message.message_id

        // sheet_error_log.appendRow([ JSON.stringify()])
        
        const message = infoServices.getCellValueByCellPosition("A2")
        if (ctx.message && ctx.message.text){
          return ctx.reply(message)
        }
        ctx.editMessageText(message, {
            reply_markup: markup.inlineKeyboard([[button.text("🔙 Main Menu", 'main_menu')]])
          })

    }
    /**
   * Mengambil visi misi
   * @param {ctx} ctx 
   */
    getVisiMisi(ctx){
        const message = infoServices.getCellValueByCellPosition("A6")

        ctx.editMessageText(message, {
            reply_markup: markup.inlineKeyboard([[button.text("🔙 Main Menu", 'main_menu')]])
          })    }

    /**
   * Mengambil tentang dari developer
   * @param {ctx} ctx 
   */
    getAboutDev(ctx){
        const message = infoServices.getCellValueByCellPosition("A5")
        ctx.editMessageText(message, {
            reply_markup: markup.inlineKeyboard([[
                button.text("🔙 Main Menu", 'main_menu')
            
            ]])
          })    }

            /**
   * Mengambil tentang dari developer
   * @param {ctx} ctx 
   */
    getKritikSaran(ctx){
      const message = infoServices.getCellValueByCellPosition("A7")
      ctx.editMessageText(message, {
          reply_markup: markup.inlineKeyboard([[
              button.text("🔙 Main Menu", 'main_menu')
          
          ]])
        })    }
          /**
   * Mengambil menu start
   * @param {ctx} ctx 
   */
    getMenuStart(ctx){
        const payload  = ctx.payload
    switch (payload) {
        case "BuatBeritaAcara":
            return stage.enter("buat_berita_acara");

        case "TambahSuratKeluar":
            return stage.enter("tambah_surat_keluar");
            
        default:

          const keyboard = []
          keyboard[0] = [
            button.text('💻About Dev',   'about_dev'),
            button.text('List Fitur🧾',   'list_fitur'),
            
          ]
          keyboard[1]  = [
            button.text('🔭Visi Misi',   'visi_misi'),
            button.text('Kritik Saran📝', 'kritik_saran_bot')
            
            
          ]
          keyboard[2] = [
            button.url('Instagram📷',   'https://www.instagram.com/alfathtelu/'),

          ]
          let message
          
        if(ctx.currentUser == null){


           message = 
              
        `[Ada User Baru :D]
        
        Assalamu'alaikum Selamat datang di bot kami.
        
        Jika kamu baru  masuk, silahkan tulis /register untuk melakukan registrasi 🌟
        
        Terima Kasih
        `;
       
          }else{
            message = "Hallo " +ctx.currentUser.nama_panggilan  + "\nSelamat datang kembali di bot ini"
          }
          if(ctx.update.callback_query != null){

    return ctx.editMessageText(message, {
    reply_markup: markup.inlineKeyboard(keyboard)
}

          )}
          return ctx.replyWithHTML(message, {
            reply_markup: markup.inlineKeyboard(keyboard)
          })
          
    }

    }
}