
class UserControllers {
    constructor(){
        this.userServices = new UserServices()
        this.registerScene = this.registerScene.bind(this)
        this.processRegistration = this.processRegistration.bind(this)
        this.completeRegistration = this.completeRegistration.bind(this)
        this.updateScene = this.updateScene.bind(this)
        this.processUpdate = this.processUpdate.bind(this)
        
        this.template_data_user = "Nama Panggilan: [Fulan]\nNIM: [11111]"

    }
    /**
     * Metode untuk mendaftarkan pengguna baru.
     * @returns {object} Objek dengan metode terkait pendaftaran pengguna.
     */
    register() {
        return new Scene('register', this.registerScene, this.processRegistration, this.completeRegistration);
    }

    /**
     * Fungsi untuk mendaftarkan pengguna.
     * @param {object} ctx - Objek konteks.
     */
    registerScene(ctx) {
        try {
            
            ctx.data = {};
            ctx.currentUser = this.userServices.getUserInfoById(ctx.from.id);

            if (ctx.currentUser != null) {
                ctx.reply("Kamu sudah terdaftar, untuk melihat informasi diri bisa ketik /myinfo");
                return ctx.wizard.leave();
            }

            ctx.reply("[Registrasi Akun]\nSilahkan melakukan data diri kamu dengan template sebagai berikut:");
            ctx.reply(this.template_data_user);
            ctx.reply(`
*note
- NIM harus terdaftar sebagai pengurus LDK Al-Fath.
- jika NIM yang Anda isi valid, maka kode verifikasi akan dikirimkan ke email yang terdaftar pada data di LDK Al-Fath.
- gunakan format seperti pada contoh diatas
- Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya
- tulis batal jika ingin membatalkan proses`);
            return ctx.wizard.next();
        } catch (error) {
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    /**
     * Fungsi untuk memproses data pendaftaran pengguna.
     * @param {object} ctx - Objek konteks.
     */
    processRegistration(ctx) {
        ctx.deleteMessage(ctx.update.message.message_id - 1);
        ctx.deleteMessage(ctx.update.message.message_id - 2);
        ctx.deleteMessage(ctx.update.message.message_id - 3);

        if (ctx.message.text.toLowerCase() == "batal") {
            ctx.reply("Proses dibatalkan");
            return ctx.wizard.leave();
        }

        try {
            // ctx.reply(ctx.message.text);
            let random = Math.random().toString(36).substring(7);
            random = random.toString();
            let user_input = TextUtils.getRegexResult(ctx.message.text,this.template_data_user );
            const user  = this.userServices.getRawUserByNIM(user_input[1]);
            if (user.nim == null){
                ctx.reply(user)
                throw new UserInputError("NIM tidak terdaftar sebagai pengurus LDK Al-Fath");
            }
            user.nama_panggilan = user_input[0];

            if (user.email) {
                UserUtils.sendEmail(user.email, random);
            } else {
                throw new UserInputError("\nEmail tidak boleh kosong. \n");
            }

            ctx.data.user = user;
            ctx.data.random = random;
            ctx.reply("[Konfirmasi Email]\nSilahkan buka email "+user.email+", lalu kirimkan token pendaftaran ke chat ini\n");
            return ctx.wizard.next();
        } catch (error) {
            ctx.reply("‼️Kesalahan‼\n\n" + error.message + "\nSilahkan lakukan registrasi ulang");
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    /**
     * Fungsi untuk menyelesaikan pendaftaran pengguna.
     * @param {object} ctx - Objek konteks.
     */
    completeRegistration(ctx) {
        ctx.deleteMessage(ctx.update.message.message_id - 1);

        try {
            ctx.deleteMessage();

            if (ctx.message.text == ctx.data.random) {
                const new_user = this.userServices.createNewUser({
                    id_telegram: ctx.from.id,
                    nama_lengkap: ctx.data.user.nama_lengkap,
                    nama_panggilan: ctx.data.user.nama_panggilan,
                    nim: ctx.data.user.nim,
                    jenis_kelamin: ctx.data.user.jenis_kelamin,
                    email: ctx.data.user.email,
                    angkatan: ctx.data.user.angkatan,
                    fakultas: ctx.data.user.fakultas,
                    departemen: ctx.data.user.departemen,
                    wilayah: ctx.data.user.wilayah,
                    amanah: ctx.data.user.amanah,
                });

                ctx.reply("[Registrasi berhasil]\n Selamat datang " + new_user.nama_panggilan);
            } else {
                ctx.reply(("‼️Kesalahan‼️\nToken salah" + "\nSilahkan lakukan registrasi ulang"));
            }
            return ctx.wizard.leave();
        } catch (error) {
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    /**
     * Metode untuk memperbarui data pengguna.
     * @returns {object} Objek dengan metode terkait pembaruan data pengguna.
     */
    update() {
        return new Scene('update', this.updateScene, this.processUpdate);
    }

    /**
     * Fungsi untuk memperbarui data pengguna.
     * @param {object} ctx - Objek konteks.
     */
    updateScene(ctx) {
        ctx.data = {};

        ctx.reply("Silahkan  salin dan kirim data paling baru dengan contoh seperti pada chat diatas");
        ctx.reply("Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya");

        return ctx.wizard.next();
    };

    /**
     * Fungsi untuk memproses data yang diperbarui.
     * @param {object} ctx - Objek konteks.
     */
    processUpdate(ctx) {
        ctx.deleteMessage(ctx.update.message.message_id - 1);
        ctx.deleteMessage(ctx.update.message.message_id - 2);
        ctx.deleteMessage(ctx.update.message.message_id - 3);

        if (ctx.message.text.toLowerCase() == "batal") {
            ctx.reply("Proses dibatalkan");
            return ctx.wizard.leave();
        }

        ctx.reply("tunggu sebentar...");
        try {
            let hasil = UserUtils.getUserRegexResult(ctx.message.text);

            let updatedUser = this.userServices.updateDataUserById(ctx.from.id, {
                nama_lengkap: hasil.nama_lengkap,
                nama_panggilan: hasil.nama_panggilan,
                nim: hasil.nim,
                jenis_kelamin: hasil.jenis_kelamin,
                email: hasil.email,
                angkatan: hasil.angkatan,
                fakultas: hasil.fakultas,
                departemen: hasil.departemen,
                wilayah: hasil.wilayah,
                amanah: hasil.amanah,
            });

            if (updatedUser) {
                ctx.reply("ℹ️ℹ️Data berhasil terupdateℹ️ℹ️\n\n" + updatedUser.printDataUser());
            } else {
                ctx.reply("Data gagal di update");
            }

            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply("‼️Kesalahan‼\n\n" + error.message + "\nSilahkan ulangi proses update data");
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

   
}
    function cbaikn() {
    this.sendEmail("atiohaidar@gmail.com", "241");
}



Logger.log("Loaded  UserControllers.js" + (new Date() - startTime) + "ms");