/**
 * @class SoalIsianSingkatControllers
 * @description Kelas pengontrol untuk menangani soal isian singkat
 */
class SoalIsianSingkatControllers {
    constructor() {
        this.soalIsianSingkatServices = new SoalIsianSingkatServices();
        this.chatTexts = {
            idNotFound: "maaf, id soal yang Anda cari tidak ketemu",
            answerSaved: "Terima Kasih. Jawaban kamu tersimpan pada baris ke-",
            processCancelled: "Proses dibatalkan",
            answerFormat: "Silahkan jawab sesuai format diatas\n*Catatan: Jangan hilangkan kurung siku nya. isi jawaban kamu di dalam kurung siku -> [jawaban]",
            error: "Maaf, ada kesalahan: ",
            locationOrDriveLink: "Silahkan kirim lokasi saat ini. bisa berupa lokasi, screenshot lokasi dari web atau foto sekitar kamu yang menggambarkan posisi saat ini",
            invalidAnswerFormat: "Format jawaban salah. Mohon kirimkan lokasi atau link Google Drive yang valid.",
            loading: "Tunggu sebentar...",
        };
        this.jawabSoal = this.jawabSoal.bind(this);
        this.jawabSoalGuest = this.jawabSoalGuest.bind(this);
        this.processAnswer = this.processAnswer.bind(this);
        this.processLocationOrDriveLink = this.processLocationOrDriveLink.bind(this);

    }

    /**
     * 
     * @method showSoal
     * @param {Object} ctx - Konteks Telegram
     * @returns {Object|null} Data soal atau null jika tidak ditemukan
     * @description Menampilkan soal berdasarkan ID yang diberikan
     */
    showSoal  (ctx)  {
        const data = this.soalIsianSingkatServices.getDataSoalLengkapById(ctx.match[1]);
        if (data == null) {
            ctx.reply(this.chatTexts.idNotFound);
            return null;
        }
        ctx.reply(data.template_pertanyaan);
        return data;
    }

    /**
     * @method jawabSoal
     * @returns {Scene} Scene Telegraf untuk menjawab soal
     * @description Membuat scene untuk proses menjawab soal
     */
    jawabSoal  ()  {
        return new Scene('jawab_soal', (ctx) => {
            try {
                const soal = this.showSoal(ctx);
                if (soal == null) {
                    return ctx.wizard.leave();
                }

                ctx.data = {};
                ctx.data.soal = {};
                ctx.data.soal.template_pertanyaan = soal.template_pertanyaan;
                ctx.data.soal.spreadsheet_hasil_link = soal.spreadsheet_hasil_link;
                ctx.data.soal.sheet_hasil_name = soal.sheet_hasil_name;
                ctx.data.soal.bukti_lokasi = soal.bukti_lokasi;

                ctx.reply(this.chatTexts.answerFormat);

                return ctx.wizard.next();
            } catch (error) {
                ctx.reply(this.chatTexts.error + error.message);
                return ctx.wizard.leave();
            }
        }, this.processAnswer, this.processLocationOrDriveLink);
    }

    /**
     * @method jawabSoalGuest
     * @returns {Scene} Scene Telegraf untuk menjawab soal sebagai guest
     * @description Membuat scene untuk proses menjawab soal sebagai guest
     */
    jawabSoalGuest  ()  {
        return new Scene('jawab_soal_guest', (ctx) => {
            try {
                const soal = this.showSoal(ctx);
                if (soal == null) {
                    return ctx.wizard.leave();
                }

                ctx.data = {};
                ctx.data.soal = {};
                ctx.data.soal.template_pertanyaan = soal.template_pertanyaan;
                ctx.data.soal.spreadsheet_hasil_link = soal.spreadsheet_hasil_link;
                ctx.data.soal.sheet_hasil_name = soal.sheet_hasil_name;
                ctx.data.soal.bukti_lokasi = soal.bukti_lokasi;

                ctx.reply(this.chatTexts.answerFormat);

                return ctx.wizard.next();
            } catch (error) {
                ctx.reply(this.chatTexts.error + error.message);
                return ctx.wizard.leave();
            }
        }, this.processAnswer);
    }

    /**
     * @method processAnswer
     * @param {Object} ctx - Konteks Telegram
     * @returns {void}
     * @description Proses menjawab soal
     */
    processAnswer  (ctx)  {
        try {
            ctx.deleteMessage(ctx.update.message.message_id - 1);
            UserUtils.registerRequired(ctx);
            ctx.deleteMessage(ctx.update.message.message_id - 2);

            if (ctx.message.text != null && ctx.message.text.toLowerCase() == "batal") {
                ctx.reply(this.chatTexts.processCancelled);
                return ctx.wizard.leave();
            }

            const jawaban = TextUtils.getRegexResult(ctx.message.text, ctx.data.soal.template_pertanyaan);
            if (ctx.data.soal.bukti_lokasi) {
                ctx.data.jawaban = jawaban;
                ctx.reply(this.chatTexts.locationOrDriveLink, {
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
                                        url: getMapENV("PRESENSI_BUKTILOKASI_ADMIN_WEBAPP"),
                                    },
                                },
                            ],
                        ],
                        one_time_keyboard: true,
                    },
                });
                return ctx.wizard.next();
            }

            const lastRow = this.soalIsianSingkatServices.addAnswerFromUser(
                ctx.from.id,
                ctx.currentUser.nim,
                jawaban,
                ctx.data.soal.spreadsheet_hasil_link,
                ctx.data.soal.sheet_hasil_name
            );

            ctx.reply(this.chatTexts.answerSaved + lastRow);
            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            return ctx.wizard.leave();
        }
    }

    /**
     * @method processLocationOrDriveLink
     * @param {Object} ctx - Konteks Telegram
     * @returns {void}
     * @description Proses lokasi atau tautan Google Drive
     */
    processLocationOrDriveLink  (ctx)  {
        try {
            const loading = ctx.reply(this.chatTexts.loading);
            const jawaban = ctx.data.jawaban;
            UserUtils.registerRequired(ctx);

            if (ctx.message.location) {
                const latitude = ctx.message.location.latitude;
                const longitude = ctx.message.location.longitude;
                jawaban.push(JSON.stringify({ latitude, longitude }));
                // Process the latitude and longitude data
                // Send the data to the desired sheet
            } else if (ctx.message.photo) {
                const link_drive = FileUtils.getDriveURLFromCtx(ctx, getMapENV("SOAL_ISIAN_SINGKAT_BUKTILOKASI_DRIVE_ID"), ctx.data.id_soal + ctx.currentUser.nama_lengkap);
                jawaban.push(link_drive);
                // Process the link data
                // Send the data to the desired sheet
            } else {
                ctx.reply(this.chatTexts.invalidAnswerFormat);
                return ctx.wizard.leave();
            }

            const lastRow = this.soalIsianSingkatServices.addAnswerFromUser(
                ctx.from.id,
                ctx.currentUser.nim,
                jawaban,
                ctx.data.soal.spreadsheet_hasil_link,
                ctx.data.soal.sheet_hasil_name
            );

            ctx.reply(this.chatTexts.answerSaved + lastRow);
            ctx.deleteMessage(loading.result.message_id);

            return ctx.wizard.leave();
        } catch (error) {
            ctx.reply(this.chatTexts.error + error.message);
            return ctx.wizard.leave();
        }
    }
}

Logger.log("Loaded SoalIsianSingkatControllers.js" + (new Date() - startTime) + "ms");
