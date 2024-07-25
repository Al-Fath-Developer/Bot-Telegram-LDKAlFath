
class InventarisControllers{
    constructor(){
 this.inventarisServices = new InventarisServices()
        this.addKonfirmasiSekre = this.addKonfirmasiSekre.bind(this)
    }

    /**
     * Melakukan konfirmasi terkait inventaris dari sekretariat di Al-Fath
     * @returns 
     */
    addKonfirmasiSekre(){   
        return new Scene('konfirmasi_inventaris_sekre',
        (ctx)=>{

            const pesan_bot = ctx.replyWithHTML(
`'📷📷Konfirmasi Inventaris Sekretariat Al-Fath

Sebelum kamu melakukan konfirmasi, silahkan update data yang ada disini pada <a href="${getMapENV('INVENTARIS_SPREADSHEET_LINK')}">sheet status inventaris</a> terlebih dahulu.

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
UserUtils.registerRequired(ctx)
ctx.data = {}
ctx.data.email = ctx.currentUser.email
ctx.data.nim = ctx.currentUser.nim
ctx.data.nama_lengkap = ctx.currentUser.nama_lengkap
FileUtils.giveAccessToEmail(getMapENV('INVENTARIS_SPREADSHEET_LINK'), ctx.currentUser.email)

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
                const judul = ctx.message.caption || ctx.update.message?.document?.file_name|| new Date().toLocaleString();                    
                const drive_url = FileUtils.getDriveURLFromCtx(ctx, getMapENV('INVENTARIS_FOLDER_ID'), judul, ctx.data.email)
                this.inventarisServices.addKonfirmasiSekre([ctx.data.nim, ctx.data.nama_lengkap], drive_url, judul)
                ctx.reply("Terima kasih sudah konfirmasi, lah kok ilang? tenang, bukti konfirmasi nya bisa diakses disini\n" , {
                    reply_markup: markup.inlineKeyboard([[button.url(judul, drive_url)]])

                })
                ctx.deleteMessage() 
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
Logger.log("Loaded InventarisControllers.js" + (new Date() - startTime) + "ms")