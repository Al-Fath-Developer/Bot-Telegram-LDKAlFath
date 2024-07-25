
/**
 * Kelas untuk menangani kontrol dokumentasi belajar
*/
class SuratMenyuratControllers  {
    constructor(){

        this.suratMenyuratServices = new SuratMenyuratServices()
        this.addSuratKeluar = this.addSuratKeluar.bind(this)
        this.createBeritaAcara = this.createBeritaAcara.bind(this)
        this.template_berita_acara = 
`
📝📝Pembuatan Berita Acara

Silahkan ubah isi dari template berikut

Asal Departemen/Fakultas Penyelenggara: [KDRP]
Nama Kegiatan: [Big Class 2]
Nama Kepanitiaan/Penyelenggara: [Islah 2 2023]
Jumlah Peserta: [20 Peserta]
Rangkaian Kegiatan: [Tilawah Al-Quran, Materi, FGD]
Link Dokumentasi Kegiatan: [drive.google.com]
Tanggal Pelaksanan: [06/12/2024]
Waktu Acara Selesai: [17:00:00]
Tempat Pelaksanaan: [Gedung Damar Telkom University]
Email Pembuat Berita Acara: [atiohaidar@gmail.com]
Kota Pembuatan Berita Acara: [Bandung]
NIM Ketua Pelaksana: [1302210057]
Nama Ketua Pelaksana: [fulan1]
NIM Sekretaris: [1302210057]
Nama Sekretaris: [fulan2]


*note
- Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya
- Dokumen Berita Acara Insya Allah akan dikirim melalui email yang tertera
- Untuk proker fakultas, Asal Departemen/Fakultas diisi dengan singaktan fakultas. misal FIF
- Rangkaian kegiatan bisa diisi dengan link dokumentasi
- tulis "batal" (tanpa tanda petik) pada kolom chat jika ingin membatalkan proses
`
    }

   /**
     * Membuat scene untuk menambahkan dokumentasi belajar
     * @returns {Scene} Scene Telegraf untuk menambahkan dokumentasi belajar
     */
    createBeritaAcara(){
        return new Scene('buat_berita_acara',

        (ctx)=>{
            const pesan_bot = ctx.reply(
this.template_berita_acara
            )
            return ctx.wizard.next();

        },
        (ctx)=>{
            ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir
            try {
                if(ctx.message.text != null &&  ctx.message.text.toLowerCase() =="batal"){
                    // bot.telegram.editMessageText(chatId, messageId, inlineMessageId, text, [extra])

                    ctx.reply("Proses dibatalkan")
                    return ctx.wizard.leave()
                    
                }
                
                ctx.reply("Terima Kasih telah mengisi berita acara. tunggu yaa... ")
                const beritaAcara = this.suratMenyuratServices.getBeritaAcaraRegexResult(ctx.message.text, this.template_berita_acara);
                beritaAcara.id_telegram = ctx.from.id
                this.suratMenyuratServices.createBeritaAcara(beritaAcara)
                ctx.reply("Jika proses berhasil, silahkan buka email yang kamu masukan tadi lalu cek berita acara untuk memperbaiki isi dokumen ")
                
                return ctx.wizard.leave();
            } catch (error) {
                ctx.reply("‼️Kesalahan‼\n\n" +  error.message + "\nSilahkan lakukan pengisian berita acara ulang");
                return ctx.wizard.leave();
            
            }





        }
    )


    }
/**
 * Menambah surat keluar
 * @returns 
 */
    addSuratKeluar(){   
        return new Scene('tambah_surat_keluar',
        (ctx)=>{
            ctx.reply(
`📑📑Tambah Surat Keluar

Silahkan masukan dokumen surat keluar (bisa berupa foto atau dokumen) dengan nama file berupa kode nomor surat

Contoh kode nomor surat: SRT-001/PRADA/ALFATH-UNITEL/V/2024

*Note: 
- Jika nomor surat tidak ada, bisa diisi dengan perihal
- tulis "batal" (tanpa tanda petik) pada kolom chat jika ingin membatalkan proses

`)
            return ctx.wizard.next();
        } ,

        (ctx)=>{
            ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir

            ctx.reply("tunggu sebentar...")
            try{
                if(ctx.message.text != null && ctx.message.text.toLowerCase() =="batal"){
                    ctx.reply("Proses dibatalkan")
                    return ctx.wizard.leave()
                    
                }

                if (ctx.update.message.photo != null){
                    
                    
                    const idx_best_qulity = ctx.update.message.photo.length - 1;
                    const id_photo = ctx.update.message.photo[idx_best_qulity].file_id;
                    const url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_photo);
                    const caption = ctx.message.caption || "";                    
                    
                    const drive_url = this.suratMenyuratServices.addSuratKeluar(ctx.from.id,ctx.from.username,url_file, caption)
                ctx.reply("Terima kasih sudah mengisi, foto nya bisa diakses disini\n" , {
                    reply_markup: markup.inlineKeyboard([[button.url(caption, drive_url)]])

                })
                ctx.deleteMessage()
                
            }else if(ctx.update.message.document != null){
                const id_document = ctx.update.message.document.file_id;
                const url_file = FileUtils.getFileUrlFromMsgBotTelegram(ctx.tg.token, id_document);
                const filename = ctx.update.message.document.file_name;
                const drive_url = this.suratMenyuratServices.addSuratKeluar(ctx.from.id,ctx.from.username,url_file, filename)
                ctx.reply("Terima kasih sudah mengisi, dokumen nya bisa diakses disini\n" , {
                    reply_markup: markup.inlineKeyboard([[button.url(filename, drive_url)]])

                })
                ctx.deleteMessage()
}
            
            else{
                ctx.reply("Maaf, hanya bisa menerima file berupa foto dan dokumen")
            }
            
            return ctx.wizard.leave()
        }
        catch (error) {
            errorLog(error)
            return ctx.wizard.leave();


        }
    }
        

    )

    }
}
Logger.log("Loaded SuratMenyuratControllers.js" + (new Date() - startTime) + "ms")