class PresensiControllers {
    constructor() {
        this.presensiServices = new PresensiServices();
        this.addAdminPresensi = this.addAdminPresensi.bind(this);
        this.tambahAdminPresensiScene = this.tambahAdminPresensiScene.bind(this);
        this.processJawabanScene = this.processJawabanScene.bind(this);
        this.finalScene = this.finalScene.bind(this);
        this.konfirmasiKehadiranPeserta = this.konfirmasiKehadiranPeserta.bind(this);
        this.konfirmasiKehadiranPesertaScene = this.konfirmasiKehadiranPesertaScene.bind(this);
        this.processKonfirmasiKehadiranScene = this.processKonfirmasiKehadiranScene.bind(this);

        this.chatTexts = {
            tambahAdminPresensi: "🗒️Admin Presensi LDK Al-Fath 2024\n\nSilahkan foto sekitar kamu yang menggambarkan posisi kamu sedang menjadi Admin Presensi dengan caption nama kepanitiaan",
            error: "Maaf, ada kesalahan: ",
            fileRequired: "Maaf, kamu harus mengirimkan file untuk melanjutkan. Silahkan ulangi dari awal",
            thanks: "Terima Kasih. Jawaban kamu tersimpan pada baris ke-",
            scanQR: "Berikut merupakan web untuk melakukan scan qr presensi" + TextUtils.watermark 
            ,
            loading: "Tunggu sebentar..."
        };
    }

    tambahAdminPresensiScene(ctx) {
        try {
            ctx.reply(this.chatTexts.tambahAdminPresensi);
            return ctx.wizard.next();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            return ctx.wizard.leave();
        }
    }

    processJawabanScene(ctx) {
        try {
            const loading = ctx.reply(this.chatTexts.loading);
            UserUtils.registerRequired(ctx);
            ctx.currentUser.id_telegram = TextUtils.encodeText(ctx.currentUser.id_telegram) 
            const arrJawaban = Object.values(ctx.currentUser);

            if (ctx.message.text === undefined) {
                const link_drive = FileUtils.getDriveURLFromCtx(
                    ctx,
                    getMapENV("PRESENSI_BUKTILOKASI_ADMIN_DRIVE_ID"),
                    ctx.message.caption + ctx.currentUser.nama_lengkap,
                    ctx.currentUser.email
                );
                if (link_drive === null) {
                    throw new UserInputError(this.chatTexts.fileRequired);
                }
                arrJawaban.push(link_drive);
                // Process the link data
                // Send the data to the desired sheet
            } else {
                ctx.reply(this.chatTexts.fileRequired);
                return ctx.wizard.leave();
            }
            const lastRow = this.presensiServices.addAdminPresensi(arrJawaban);
            editMessageTextFromMSG(loading, this.chatTexts.thanks + lastRow);
            ctx.replyWithHTML(this.chatTexts.scanQR, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Tools Scan QR Presensi",
                                web_app: {
                                    url: getMapENV("PRESENSI_SCANQR_LINK"),
                                },
                            },
                        ],
                    ],
                },
            });
            
            ctx.deleteMessage(loading.result.message_id);
            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            return ctx.wizard.leave();
        }
    }

    finalScene(ctx) {}

    addAdminPresensi() {
        return new Scene(
            'tambah_admin_presensi',
            this.tambahAdminPresensiScene,
            this.processJawabanScene,
            this.finalScene
        );
    }
    konfirmasiKehadiranPeserta(){
        return new Scene(
            'konfirmasi_kehadiran_peserta',
            this.konfirmasiKehadiranPesertaScene,
            this.processKonfirmasiKehadiranScene        );
        
    }
    konfirmasiKehadiranPesertaScene(ctx){
        try {
    
            
            ctx.data = {};
            const konfig_konfirm_kehadiran = this.getKonfigKonfirmasiKehadiran(ctx);
            ctx.data.id_konfirm_kehadiran = konfig_konfirm_kehadiran.id_konfirm_kehadiran;
            ctx.data.pesan = konfig_konfirm_kehadiran.pesan;
            ctx.data.nama_kegiatan_konfirm_kehadiran = konfig_konfirm_kehadiran.nama_kegiatan_konfirm_kehadiran;
            ctx.data.link_spreadsheet_konfirm_kehadiran = konfig_konfirm_kehadiran.link_spreadsheet_konfirm_kehadiran;
            ctx.data.sheet_name_konfirm_kehadiran = konfig_konfirm_kehadiran.sheet_name_konfirm_kehadiran;

            ctx.replyWithHTML(konfig_konfirm_kehadiran.pesan?? konfig_konfirm_kehadiran.nama_kegiatan_konfirm_kehadiran  ,{
                reply_markup: {
                    keyboard: [
                        [
                            {
                                text: "Insya Allah Hadir",

                            },
                           
                        ],,
                        [
                            {
                                text: "batal",
                            },
                        ],
                        [
                            {
                                text: "Batal",
                            },
                        ]
                    ],
                    one_time_keyboard: true,
                },
            });
            ctx.reply("Jika Anda tidak bisa hadir, jawab pesan ini dengan alasan Anda tidak bisa hadir. Tulis 'batal' Jika Anda ingin membatalkan proses");
            return ctx.wizard.next();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            return ctx.wizard.leave();
        }
    }
    processKonfirmasiKehadiranScene(ctx){
        try {
            if (ctx.message.text != null && ctx.message.text.toLowerCase() == "batal") {
                ctx.reply("Proses Dibatalkan");
                return ctx.wizard.leave();
            }
                        UserUtils.registerRequired(ctx);
                        delete ctx.currentUser.id_telegram;
            const arrUser = Object.values(ctx.currentUser);
            let  answer = [] ;
            if (ctx.message.text){
                answer = [ctx.message.text];
            }else if (ctx.message.caption){
                const url = FileUtils.getDriveURLFromCtx(ctx, getMapENV("USER_FILES_FOLDER_ID"), ctx.message.caption + ctx.currentUser.nama_lengkap, ctx.currentUser.email);
                answer = [ctx.message.caption, url];
            }else{
                throw new UserInputError("Tidak ada file atau pesan yang dikirim");
            }
            

            const lastRow = this.presensiServices.addKonfirmasiKehadiran(ctx.from.id,arrUser,answer, ctx.data.link_spreadsheet_konfirm_kehadiran, ctx.data.sheet_name_konfirm_kehadiran);
            ctx.reply(this.chatTexts.thanks + lastRow);
            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            if (error instanceof UserInputError) {
               return ctx.reply("silahkan isi lagi")

                }
            return ctx.wizard.leave();
    }
}
    getKonfigKonfirmasiKehadiran(ctx){
        const id_konfirm_kehadiran = ctx.match[1];
        return this.presensiServices.getKonfigKonfirmasiKehadiran(id_konfirm_kehadiran)
    }

}
