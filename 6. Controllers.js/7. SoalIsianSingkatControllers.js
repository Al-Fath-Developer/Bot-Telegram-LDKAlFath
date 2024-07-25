/**
 * @class SoalIsianSingkatControllers
 * @description Kelas pengontrol untuk menangani soal isian singkat
*/
class SoalIsianSingkatControllers{
    constructor(){
         this.soalIsianSingkatServices = new SoalIsianSingkatServices()
        this.showSoal = this.showSoal.bind(this)
        this.jawabSoal = this.jawabSoal.bind(this)
        this.jawabSoalGuest = this.jawabSoalGuest.bind(this
        )
    }
  /**
   * 
     * @method showSoal
     * @param {Object} ctx - Konteks Telegram
     * @returns {Object|null} Data soal atau null jika tidak ditemukan
     * @description Menampilkan soal berdasarkan ID yang diberikan
     */
    showSoal(ctx){
        const data = this.soalIsianSingkatServices.getDataSoalLengkapById(ctx.match[1])
        if (data == null){
             ctx.reply("maaf, id soal yang Anda cari tidak ketemu")
             return null
        }
        ctx.reply(data.template_pertanyaan)
         return data

    }

        /**
     * @method jawabSoal
     * @returns {Scene} Scene Telegraf untuk menjawab soal
     * @description Membuat scene untuk proses menjawab soal
     */
    jawabSoal(){
         /**
             * @param {Object} ctx - Konteks Telegram
             * @returns {Promise} Promise yang menyelesaikan ke langkah wizard berikutnya atau meninggalkan wizard
             * @description Langkah pertama: Menampilkan soal dan mempersiapkan data
             */
        return new Scene('jawab_soal', (ctx)=>{
            try {

                
                const soal =  this.showSoal(ctx)
                if (soal ==null){
                    return ctx.wizard.leave();
                    
                }
                
                ctx.data = {};
                ctx.data.soal ={}
                ctx.data.id_soal = soal.id_soal
                ctx.data.soal.template_pertanyaan = soal.template_pertanyaan
                ctx.data.soal.spreadsheet_hasil_link =  soal.spreadsheet_hasil_link
                ctx.data.soal.sheet_hasil_name =  soal.sheet_hasil_name
                ctx.data.soal.bukti_lokasi = soal.bukti_lokasi

                soal.sheet_hasil_name
                ctx.reply("Silahkan jawab sesuai format diatas\n*Catatan: Jangan hilangkan kurung siku nya. isi jawaban kamu di dalam kurung siku -> [jawaban]")
                
                
                
                return ctx.wizard.next();
            } catch (error) {

                ctx.reply("Maaf, ada kesalahan: " + error.message)    
                return ctx.wizard.leave()
            }


        },
        /**
             * @param {Object} ctx - Konteks Telegram
             * @returns {Promise} Promise yang menyelesaikan dengan meninggalkan wizard
             * @description Langkah kedua: Memproses jawaban pengguna dan menyimpannya
             */
        (ctx)=>{
            try {
                
                ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir
                UserUtils.registerRequired(ctx)

                ctx.deleteMessage(ctx.update.message.message_id-2) // nge hapus 1 chat sebelum chat terakhir

                if(ctx.message.text != null && ctx.message.text.toLowerCase() =="batal"){
                    ctx.reply("Proses dibatalkan")

                    return ctx.wizard.leave()
                    
                }
                const jawaban= TextUtils.getRegexResult(ctx.message.text, ctx.data.soal.template_pertanyaan )
                if (ctx.data.soal.bukti_lokasi){
                    ctx.data.jawaban = jawaban
                    ctx.reply("Silahkan kirim lokasi saat ini. bisa berupa lokasi, screenshot lokasi dari web atau foto sekitar kamu yang menggambarkan posisi saat ini", {
                        reply_markup: {
                            keyboard: [
                                [
                                    {
                                        text: "Kirim Lokasi",
                                        request_location: true,
                                    },
                                    {
                                        text: "Screenshot hasil dari web ini",
                                        web_app: {
                                            url: "https://mylocation.org/",
                                        },
                                    },
                                ],
                            ],
                            one_time_keyboard: true,
                        },
                    });
                return ctx.wizard.next()
                } 
                const lastRow =  this.soalIsianSingkatServices.addAnswerFromUser(
                    ctx.from.id, 
                    ctx.currentUser.nim,
                    jawaban,
                    ctx.data.soal.spreadsheet_hasil_link,
                    ctx.data.soal.sheet_hasil_name
                )
                
                ctx.reply("Terima Kasih. Jawaban kamu tersimpan pada baris ke-" + lastRow)
                return ctx.wizard.leave()
                
                
            } catch (error) {
                 ctx.reply("Error: " + error.message)    
                return ctx.wizard.leave()

            }

            

        },(ctx)=>{

                try {
                    const loading = ctx.reply("Tunggu sebentar...")
                    const jawaban = ctx.data.jawaban;
                UserUtils.registerRequired(ctx)


                    if (ctx.message.location) {
                        const latitude = ctx.message.location.latitude;
                        const longitude = ctx.message.location.longitude;
                        jawaban.push(JSON.stringify({ latitude, longitude }));
                        // Process the latitude and longitude data
                        // Send the data to the desired sheet
                    } else if (ctx.message.photo) {
                        const link_drive = FileUtils.getDriveURLFromCtx(ctx,"1CD15ZWGkZB4-G0r42KqiRMmbH9bX2_71",ctx.data.id_soal +  ctx.currentUser.nama_lengkap);
                        jawaban.push(link_drive);
                        // Process the link data
                        // Send the data to the desired sheet
                    } else {
                        ctx.reply("Format jawaban salah. Mohon kirimkan lokasi atau link Google Drive yang valid.");
                        return ctx.wizard.leave();
                    }
                    const lastRow =  this.soalIsianSingkatServices.addAnswerFromUser(
                        ctx.from.id, 
                        ctx.currentUser.nim,
                        jawaban,
                        ctx.data.soal.spreadsheet_hasil_link,
                        ctx.data.soal.sheet_hasil_name
                    )
                    
                    ctx.reply("Terima Kasih. Jawaban kamu tersimpan pada baris ke-" + lastRow)
                    ctx.deleteMessage(loading.result.message_id)

                    return ctx.wizard.leave();

                } catch (error) {
                    ctx.reply("Error: " + error.message);
                    return ctx.wizard.leave();
                }
            }
        
        )       
    }
    jawabSoalGuest(){
        /**
            * @param {Object} ctx - Konteks Telegram
            * @returns {Promise} Promise yang menyelesaikan ke langkah wizard berikutnya atau meninggalkan wizard
            * @description Langkah pertama: Menampilkan soal dan mempersiapkan data
            */
       return new Scene('jawab_soal_guest', (ctx)=>{
           try {

               
               const soal =  this.showSoal(ctx)
               if (soal ==null){
                   return ctx.wizard.leave();
                   
               }
               
               ctx.data = {};
               ctx.data.soal ={}
               ctx.data.soal.template_pertanyaan = soal.template_pertanyaan

               ctx.data.soal.spreadsheet_hasil_link =  soal.spreadsheet_hasil_link
               ctx.data.soal.sheet_hasil_name =  soal.sheet_hasil_name

               soal.sheet_hasil_name
               ctx.reply("Silahkan jawab sesuai format diatas\n*Catatan: Jangan hilangkan kurung siku nya. isi jawaban kamu di dalam kurung siku -> [jawaban]")
               
               
               
               return ctx.wizard.next();
           } catch (error) {

               ctx.reply("Maaf, ada kesalahan: " + error.message)    
               return ctx.wizard.leave()
           }


       },
       /**
            * @param {Object} ctx - Konteks Telegram
            * @returns {Promise} Promise yang menyelesaikan dengan meninggalkan wizard
            * @description Langkah kedua: Memproses jawaban pengguna dan menyimpannya
            */
       (ctx)=>{
           try {
            
               
               ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir

               ctx.deleteMessage(ctx.update.message.message_id-2) // nge hapus 1 chat sebelum chat terakhir

               if(ctx.message.text != null && ctx.message.text.toLowerCase() =="batal"){
                ctx.reply("Proses dibatalkan")

                return ctx.wizard.leave()
                
            }
               const jawaban= TextUtils.getRegexResult(ctx.message.text, ctx.data.soal.template_pertanyaan ) 
               const lastRow =  this.soalIsianSingkatServices.addAnswerFromUser(
                   ctx.from.id, 
                   ctx.from.username,
                   jawaban,
                   ctx.data.soal.spreadsheet_hasil_link,
                   ctx.data.soal.sheet_hasil_name
               )
               
               ctx.reply("Terima Kasih. Jawaban kamu tersimpan pada baris ke-" + lastRow)
               return ctx.wizard.leave()
               
               
           } catch (error) {
                ctx.reply("Error: " + error.message)    
               return ctx.wizard.leave()

           }

           

       }
       )       
   }
}
Logger.log("Loaded SoalIsianSingkatControllers.js" + (new Date() - startTime) + "ms")