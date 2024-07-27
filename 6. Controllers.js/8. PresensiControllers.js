class PresensiControllers{
    constructor(){
        this.presensiServices = new PresensiServices()
        this.addAdminPresensi = this.addAdminPresensi.bind(this)
    }
    addAdminPresensi(){
        /**
            * @param {Object} ctx - Konteks Telegram
            * @returns {Promise} Promise yang menyelesaikan ke langkah wizard berikutnya atau meninggalkan wizard
            * @description Langkah pertama: Menampilkan soal dan mempersiapkan data
            */
       return new Scene('tambah_admin_presensi', (ctx)=>{
           try {

           
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
            const loading = ctx.reply("Tunggu sebentar...")
            UserUtils.registerRequired(ctx)
            const arrJawaban = Object.values(ctx.currentUser);
            


            if (ctx.message.location) {
                const latitude = ctx.message.location.latitude;
                const longitude = ctx.message.location.longitude;
                arrJawaban.push(JSON.stringify({ latitude, longitude }));
                // Process the latitude and longitude data
                // Send the data to the desired sheet
            } else if (ctx.message.photo) {
                const link_drive = FileUtils.getDriveURLFromCtx(ctx,"1CD15ZWGkZB4-G0r42KqiRMmbH9bX2_71",ctx.data.id_soal +  ctx.currentUser.nama_lengkap);
                arrJawaban.push(link_drive);
                // Process the link data
                // Send the data to the desired sheet
            } else {
                ctx.reply("Format jawaban salah. Mohon kirimkan lokasi atau link Google Drive yang valid.");
                return ctx.wizard.leave();
            }
            const lastRow =  this.presensiServices.addAdminPresensi(arrJawaban)
            
            ctx.reply("Terima Kasih. Jawaban kamu tersimpan pada baris ke-" + lastRow)
            ctx.replyWithHTML("Berikut merupakan qr presensinya", {
                reply_markup: {
                    "inline_keyboard": [
                [
                    {
                        "text": "Tools Scan QR Presensi",
                        "web_app": {
                            "url": "https://alfathtelyudev.github.io/internal/1.%20Presensi%20Kader%20Al-Fath/"
                        }
                    }
                ]
            ]
                },
            })
            ctx.deleteMessage(loading.result.message_id)

            return ctx.wizard.leave();

        } catch (error) {
            ctx.reply("Error: " + error.message);
            return ctx.wizard.leave();
        }

           

       },(ctx)=>{

               
           }
       
       )       
   }
}