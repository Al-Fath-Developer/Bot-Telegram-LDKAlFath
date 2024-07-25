["photo", "document", "audio", "video", "video_note", "voice"].forEach(fileType => {
    bot.on(fileType, ctx => {
      const catatan = "Catatan: File yang Anda Upload bisa diakses oleh pengurus LDK Al-Fath. Jika file ini bersifat pribadi, silahkan hapus file ini lewat google drive atau hubungi admin"
      const name = ctx.fileInfo?.name;
      const url = ctx.fileInfo?.url;
      ctx.deleteMessage(ctx.update.message.message_id+1)
      ctx.deleteMessage()
      if (name && url){
       
        ctx.replyWithHTML(`Upload File Selesai\n\nEits data nya ilang?. Tenang, data kamu kesimpen kok\nfile ini bisa diakses oleh email yang kamu masukan saat registrasi. Untuk melihat informasi email bisa lihat di /myinfo \n\n<a href="${url}">${name}</a>\n========\n${catatan}\n\nBot Telegram`, {
        });
        // reply_markup: markup.inlineKeyboard([[button.text("🔙Main Menu", "main_menu")]])
      }else{

        ctx.reply("maaf, ada kesalahan dalam mengunggah file kamu ke google Drive")
      }
      
    });
  });
  Logger.log("Loaded: userGetFileUrl.js" + (new Date() - startTime) + "ms")