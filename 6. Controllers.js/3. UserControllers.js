class UserControllers {
    constructor() {
        this.userServices = new UserServices();
        this.registerScene = this.registerScene.bind(this);
        this.processRegistration = this.processRegistration.bind(this);
        this.completeRegistration = this.completeRegistration.bind(this);
        this.updateScene = this.updateScene.bind(this);
        this.processUpdate = this.processUpdate.bind(this);

        this.template_data_user = "Nama Panggilan: [Fulan]\nNIM: [11111]";
        this.registrationMessages = [
            "*Registrasi Akun*",
            "Silahkan melakukan data diri kamu dengan template sebagai berikut:\n\n\n",
            this.template_data_user,
            "\n\n\n\n\n*note",
            "- NIM harus terdaftar sebagai pengurus LDK Al-Fath.",
            "- jika NIM yang Anda isi valid, maka kode verifikasi akan dikirimkan ke email yang terdaftar pada data di LDK Al-Fath.",
            "- gunakan format seperti pada contoh diatas",
            "- Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya",
            "- tulis batal jika ingin membatalkan proses",
            TextUtils.watermark

        ];
        this.confirmationEmailMessage = "{Konfirmasi Email}\nSilahkan buka email {email}, lalu kirimkan token pendaftaran ke chat ini";
        this.registrationSuccessMessage = "{Registrasi berhasil}\n Selamat datang {nama_panggilan}";
        this.registrationErrorMessage = "‼️Kesalahan‼\n\n{error_message}\nSilahkan lakukan registrasi ulang";
        this.tokenErrorMessage = "‼️Kesalahan‼️\nToken salah\nSilahkan lakukan registrasi ulang";
        this.updateMessages = [
            "Silahkan  salin dan kirim data paling baru dengan contoh seperti pada chat diatas",
            "Kurung siku digunakan sebagai tempat pengisian template, jadi jangan dihapus kurung siku nya"
        ];
        this.updateSuccessMessage = "ℹ️ℹ️Data berhasil terupdateℹ️ℹ️\n\n{data_user}";
        this.updateErrorMessage = "‼️Kesalahan‼\n\n{error_message}\nSilahkan ulangi proses update data";
        this.cancelMessage = "Proses dibatalkan";
    }

    register() {
        return new Scene('register', this.registerScene, this.processRegistration, this.completeRegistration);
    }

    registerScene(ctx) {
        try {
            ctx.data = {};
            showTypingStatus(ctx);
            ctx.currentUser = this.userServices.getUserInfoById(ctx.from.id);

            if (ctx.currentUser != null) {
                ctx.reply("Kamu sudah terdaftar, untuk melihat informasi diri bisa ketik /myinfo");
                return ctx.wizard.leave();
            }

            ctx.data.botMessage = ctx.replyWithHTML(this.registrationMessages.join("\n"));
            return ctx.wizard.next();
        } catch (error) {
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    processRegistration(ctx) {

        
        ctx.deleteMessage(ctx.data.botMessage.result.message_id);
        
        
        if (ctx.message.text.toLowerCase() == "batal") {
            ctx.reply(this.cancelMessage);
            
            return ctx.wizard.leave();
        }
        
        try {
            let random = Math.random().toString(36).substring(7);
            random = random.toString();
            let user_input = TextUtils.getRegexResult(ctx.message.text, this.template_data_user);
            const user = this.userServices.getRawUserByNIM(user_input[1]);
            if (user.nim == null) {
                ctx.reply(user);
                throw new UserInputError("NIM tidak terdaftar sebagai pengurus LDK Al-Fath");
            }
            user.nama_panggilan = user_input[0];

            if (user.email) {
                UserUtils.sendEmail(user.email, random);
                memberiLikeFromCtx(ctx)
            } else {
                throw new UserInputError("\nEmail tidak boleh kosong. \n");
            }

            ctx.data.user = user;
            ctx.data.random = random;
            ctx.data.botMessage =  ctx.reply(this.confirmationEmailMessage.replace("{email}", user.email));
            return ctx.wizard.next();
        } catch (error) {
            ctx.reply(this.registrationErrorMessage.replace("{error_message}", error.message));
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    completeRegistration(ctx) {
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
                editMessageTextFromMSG(ctx.data.botMessage, this.registrationSuccessMessage.replace("{nama_panggilan}", new_user.nama_panggilan));

            } else {
                ctx.reply(this.tokenErrorMessage);
            }
            return ctx.wizard.leave();
        } catch (error) {
            errorLog(error);
            return ctx.wizard.leave();
        }
    };

    update() {
        return new Scene('update', this.updateScene, this.processUpdate);
    }

    updateScene(ctx) {
        ctx.data = {};

        ctx.reply(this.updateMessages.join("\n"));

        return ctx.wizard.next();
    };

    processUpdate(ctx) {
        if (ctx.message.text.toLowerCase() == "batal") {
            ctx.reply(this.cancelMessage);
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
                ctx.reply(this.updateSuccessMessage.replace("{data_user}", updatedUser.printDataUser()));
            } else {
                ctx.reply("Data gagal di update");
            }

            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply(this.updateErrorMessage.replace("{error_message}", error.message));
            errorLog(error);
            return ctx.wizard.leave();
        }
    };
}

function cbaikn() {
    this.sendEmail("atiohaidar@gmail.com", "241");
}

Logger.log("Loaded  UserControllers.js" + (new Date() - startTime) + "ms");
