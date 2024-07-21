const soalIsianSingkatServices = new SoalIsianSingkatServices()
/**
 * @class SoalIsianSingkatControllers
 * @description Kelas pengontrol untuk menangani soal isian singkat
 */
class SoalIsianSingkatControllers{
  /**
     * @method showSoal
     * @param {Object} ctx - Konteks Telegram
     * @returns {Object|null} Data soal atau null jika tidak ditemukan
     * @description Menampilkan soal berdasarkan ID yang diberikan
     */
    showSoal(ctx){
        const data = soalIsianSingkatServices.getDataSoalLengkapById(ctx.match[1])
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
                UserUtils.registerRequired(ctx)

                ctx.deleteMessage(ctx.update.message.message_id-2) // nge hapus 1 chat sebelum chat terakhir

                if(ctx.message.text != null && ctx.message.text.toLowerCase() =="batal"){
                    ctx.reply("Proses dibatalkan")

                    return ctx.wizard.leave()
                    
                }
                const jawaban= TextUtils.getRegexResult(ctx.message.text, ctx.data.soal.template_pertanyaan ) 
                const lastRow =  soalIsianSingkatServices.addAnswerFromUser(
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
               const lastRow =  soalIsianSingkatServices.addAnswerFromUser(
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