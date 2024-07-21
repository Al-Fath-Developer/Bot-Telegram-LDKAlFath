const inventarisServices = new InventarisServices()

class InventarisControllers{
    /**
     * Melakukan konfirmasi terkait inventaris dari sekretariat di Al-Fath
     * @returns 
     */
    addKonfirmasiSekre(){   
        return new Scene('konfirmasi_inventaris_sekre',
        (ctx)=>{

            const pesan_bot = ctx.reply(
`'📷📷Konfirmasi Inventaris Sekretariat Al-Fath



Silahkan konfirmasi berupa dokumentasi inventaris dengan ketentuan sebagai berikut:

1. jika objek foto berupa barang (misal meminjam, menitip atau mengembalikan barang), sebisa mungkin atur jarak pengambilan gambar  agar  orang yang melihat foto tersebut dapat mengetahui lokasi barang yang dimaksut

2. jika objek foto berupa ruangan (misal mengunjungi sekre atau lainnya), sebisa mungkin atur jarak pengambilan gambar agar orang yang melihat foto tersebut dapat mengetahui kondisi terakhir ruangan sekre

3. penulisan caption foto (biasanya muncul akan mengirim foto) diawali dengan '#', kemudian diikuti dengan kata kerja (mengunjungi, menitip, mengecek, mengembalikan). lalu diikuti dengan objek (barang, ruangan),  dan diakhiri dengan keterangan tambahan (format bebas)

4. contoh caption: 
- #meminjam toa, buku islah dan proyektor untuk acara Islah 2 2023
- #menitip brosur pmb
- #mengunjungi sekre untuk membersihkan ruangan

*Note: 
- tulis "batal" (tanpa tanda petik) pada kolom chat jika ingin membatalkan proses

`)

            return ctx.wizard.next();
        } ,

        (ctx)=>{
            // bot.telegram.editMessageText(ctx.update.message.chat.id, ctx.update.message.message_id, "", "terganti")

            // ctx.deleteMessage(ctx.data.message_id_bot_awal)
            ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir
            const loading_message = ctx.reply("tunggu sebentar...")
            try{
                if(ctx.message.text != null && ctx.message.text.toLowerCase() =="batal"){
                    ctx.reply("Proses dibatalkan")
                ctx.deleteMessage(loading_message.result.message_id)

                    return ctx.wizard.leave()
                    
                }

                if (ctx.update.message.photo != null){
                    
                    
                    const idx_best_qulity = ctx.update.message.photo.length - 1;
                    const id_photo = ctx.update.message.photo[idx_best_qulity].file_id;
                    const url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_photo);
                    const caption = ctx.message.caption || "";                    
                    
                    const drive_url = inventarisServices.addKonfirmasiSekre(ctx.from.id,ctx.from.username,url_file, caption)

                ctx.reply("Terima kasih sudah konfirmasi, lah kok ilang? tenang, foto nya bisa diakses disini\n" , {
                    reply_markup: markup.inlineKeyboard([[button.url(caption, drive_url)]])

                })
                ctx.deleteMessage()
                
            }else if(ctx.update.message.document != null){
                const id_document = ctx.update.message.document.file_id;
                const url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_document);
                const filename = ctx.update.message.document.file_name;
                const drive_url = inventarisServices.addKonfirmasiSekre(ctx.from.id,ctx.from.username,url_file, filename)
                ctx.reply("Terima kasih sudah konfirmasi, lah kok ilang? tenang, dokumen nya bisa diakses disini\n" , {
                    reply_markup: markup.inlineKeyboard([[button.url(filename, drive_url)]])

                })
                ctx.deleteMessage()
}
            
            else{
                ctx.reply("Maaf, hanya bisa menerima file berupa foto atau dokumen")
            }
                ctx.deleteMessage(loading_message.result.message_id)

            
            return ctx.wizard.leave()
        }
        catch (error) {
            errorLog(error)
            ctx.deleteMessage(loading_message.result.message_id)

            return ctx.wizard.leave();


        }
    }
        

    )

    }
}