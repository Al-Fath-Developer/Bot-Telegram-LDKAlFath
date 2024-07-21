const userServices = new UserServices()


class UserControllers  {
   
    /**
     * Metode untuk mendaftarkan pengguna baru.
     * @returns {object} Objek dengan metode terkait pendaftaran pengguna.
     */
    register  ()  {
        return new Scene('register', 
        
            /**
             * Fungsi untuk mendaftarkan pengguna.
             * @param {object} ctx - Objek konteks.
             */
            (ctx)=> {
                try{

                    ctx.data = {};
                    ctx.currentUser = userServices.getUserInfoById(ctx.from.id)
                    
                    
                    if (ctx.currentUser != null) {
                    ctx.reply("Kamu sudah terdaftar, silahkan masuk");
                    return ctx.wizard.leave();
                }
                
                ctx.reply("[Registrasi Akun]\nSilahkan melakukan data diri kamu dengan template sebagai berikut:");
                ctx.reply("- Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya\n- tulis batal jika ingin membatalkan proses")
                ctx.reply(UserUtils.template);
                return ctx.wizard.next();
            } catch (error) {
                errorLog(error)
                return ctx.wizard.leave();


            }
            },

            /**
             * Fungsi untuk memproses data pendaftaran pengguna.
             * @param {object} ctx - Objek konteks.
             */
            (ctx)=> {
            ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir
            ctx.deleteMessage(ctx.update.message.message_id-2) // nge hapus 1 chat sebelum chat terakhir
            ctx.deleteMessage(ctx.update.message.message_id-3) // nge hapus 1 chat sebelum chat terakhir
           
            if(ctx.message.text.toLowerCase() =="batal"){
                ctx.reply("Proses dibatalkan")
                return ctx.wizard.leave()
                
            }
                try{

                    ctx.reply(ctx.message.text);
                    let random = Math.random().toString(36).substring(7);
                    random = random.toString();
                    let user = UserUtils.getUserRegexResult(ctx.message.text);
                  
                    
                        if (user.email) {
                            this.sendEmail(user.email, random);
                        } else {
                            throw new UserInputError("\nEmail tidak boleh kosong. \n");
                        }
                        
                        ctx.data.user = user;
                        ctx.data.random = random;
                    ctx.reply("[Konfirmasi Email]\nSilahkan buka email yang Anda input barusan, lalu kirimkan token pendaftaran ke chat ini\n");
                    
                    return ctx.wizard.next();
              
            }
            catch (error) {
                ctx.reply("‼️Kesalahan‼\n\n" +  error.message + "\nSilahkan lakukan registrasi ulang");
                errorLog(error)
                return ctx.wizard.leave();


            }
            },
            
            /**
             * Fungsi untuk menyelesaikan pendaftaran pengguna.
             * @param {object} ctx - Objek konteks.
             */
            (ctx)=> {
            ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir

                try{

                    ctx.deleteMessage()
                    
                    if (ctx.message.text == ctx.data.random) {
                       
                        const new_user = userServices.createNewUser({
                            id_telegram: 
                            ctx.from.id, nama_lengkap:

                            ctx.data.user.nama_lengkap, nama_panggilan: 
                            ctx.data.user.nama_panggilan, nim: 
                            ctx.data.user.nim, jenis_kelamin: 
                            ctx.data.user.jenis_kelamin, email: 
                            ctx.data.user.email, angkatan: 
                            ctx.data.user.angkatan, fakultas: 
                            ctx.data.user.fakultas, departemen: 
                            ctx.data.user.departemen, wilayah: 
                            ctx.data.user.wilayah, amanah: 
                            ctx.data.user.amanah})
                        
                        
                        ctx.reply("[Registrasi berhasil]\n Selamat datang " + new_user.nama_panggilan);
                    } else {
                        ctx.reply(("‼️Kesalahan‼️\nToken salah"+ "\nSilahkan lakukan registrasi ulang"));
                    }
                    return ctx.wizard.leave();
                }
                catch (error) {
                    errorLog(error)
                    return ctx.wizard.leave();
    
    
                }
                }
            
        
        )}
    
    
    /**
     * Metode untuk memperbarui data pengguna.
     * @returns {object} Objek dengan metode terkait pembaruan data pengguna.
     */
    update() {
        
        return new Scene('update', 
            /**
             * Fungsi untuk memperbarui data pengguna.
             * @param {object} ctx - Objek konteks.
             */
            (ctx)=> {
                ctx.data = {};

                ctx.reply("Silahkan  salin dan kirim data paling baru dengan contoh seperti pada chat diatas");
                ctx.reply("Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya")

                return ctx.wizard.next();
            },

            /**
             * Fungsi untuk memproses data yang diperbarui.
             * @param {object} ctx - Objek konteks.
             */
            (ctx) =>{
                ctx.deleteMessage(ctx.update.message.message_id-1) // nge hapus 1 chat sebelum chat terakhir
                ctx.deleteMessage(ctx.update.message.message_id-2) // nge hapus 1 chat sebelum chat terakhir
                ctx.deleteMessage(ctx.update.message.message_id-3) // nge hapus 1 chat sebelum chat terakhir
                if(ctx.message.text.toLowerCase() =="batal"){
                    ctx.reply("Proses dibatalkan")
                    return ctx.wizard.leave()
                    
                }

                ctx.reply("tunggu sebentar...")
                try{
                    
                    let hasil = UserUtils.getUserRegexResult(ctx.message.text);
                    
                    
                let updatedUser = userServices.updateDataUserById(ctx.from.id,{
                      nama_lengkap: hasil.nama_lengkap
                    , nama_panggilan: hasil.nama_panggilan
                    , nim: hasil.nim
                    , jenis_kelamin: hasil.jenis_kelamin
                    , email: hasil.email
                    , angkatan: hasil.angkatan
                    , fakultas: hasil.fakultas
                    , departemen: hasil.departemen
                    , wilayah: hasil.wilayah
                    , amanah: hasil.amanah

                })
                if (updatedUser){

                    ctx.reply("ℹ️ℹ️Data berhasil terupdateℹ️ℹ️\n\n"  + updatedUser.printDataUser());
                }else{
                    ctx.reply("Data gagal di update")
                }
                
                return ctx.wizard.leave();
            }
            catch (error) {
                ctx.reply("‼️Kesalahan‼\n\n" +  error.message + "\nSilahkan ulangi proses update data");
                errorLog(error)
                return ctx.wizard.leave();


            }}
)
        
        }
        
        
        /**
         * Metode untuk mengirim email verifikasi dengan token.
     * @param {string} email - Alamat email.
     * @param {string} token - Token verifikasi.
        */
       sendEmail(email, token) {
           try{
               
               // Menggunakan HTML dengan CSS untuk pesan email yang lebih menarik
            const subject = "Verifikasi Akun Anda";
            const body = `Terima kasih telah mendaftar. Berikut adalah token verifikasi akun Anda: <strong>${token}</strong>`
            const htmlBody = `
            <html>
            <head>
            <style>
            body {
                background-color: #333;
                color: #fff;
                font-family: Arial, sans-serif;
                padding: 20px;
            }
            p {
                margin-bottom: 10px;
            }
            strong {
                color: #f0f;
            }
            </style>
            </head>
            <body>
                   <p>Halo,</p>
                   <p>${body}</p>
                   <p>Terima Kasih,</p>
                   <p>Tim Kami</p>
                   </body>
                   </html>
                   `;
                   
                   // Mengirim email dengan pesan yang diperbarui
           GmailApp.sendEmail(email, subject, body,{htmlBody: htmlBody });
        }
        catch (error) {
            errorLog(error)


        }
        }
    };
    
    function cbaikn() {
    this.sendEmail("atiohaidar@gmail.com", "241");
}



