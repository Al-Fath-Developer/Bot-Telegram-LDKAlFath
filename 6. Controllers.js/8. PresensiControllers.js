class PresensiControllers {
    constructor() {
        this.presensiServices = new PresensiServices();
        this.addAdminPresensi = this.addAdminPresensi.bind(this);
        this.tambahAdminPresensiScene = this.tambahAdminPresensiScene.bind(this);
        this.processJawabanScene = this.processJawabanScene.bind(this);
        this.finalScene = this.finalScene.bind(this);
        this.chatTexts = {
            tambahAdminPresensi: "Silahkan foto sekitar kamu yang menggambarkan posisi kamu sedang menjadi Admin Presensi dengan caption nama kepanitiaan",
            error: "Maaf, ada kesalahan: ",
            fileRequired: "Maaf, kamu harus mengirimkan file untuk melanjutkan. Silahkan ulangi dari awal",
            thanks: "Terima Kasih. Jawaban kamu tersimpan pada baris ke-",
            scanQR: "Berikut merupakan web untuk melakukan scan qr presensi",
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
            const arrJawaban = Object.values(ctx.currentUser);

            if (ctx.message.text === undefined) {
                const link_drive = FileUtils.getDriveURLFromCtx(
                    ctx,
                    getMapENV("PRESENSI_BUKTILOKASI_ADMIN_DRIVE_ID"),
                    ctx.message.caption + ctx.currentUser.nama_lengkap,
                    ctx.currentUser.email
                );
                arrJawaban.push(link_drive);
                // Process the link data
                // Send the data to the desired sheet
            } else {
                ctx.reply(this.chatTexts.fileRequired);
                return ctx.wizard.leave();
            }
            const lastRow = this.presensiServices.addAdminPresensi(arrJawaban);

            ctx.replyWithHTML(this.chatTexts.thanks + lastRow);
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
}
