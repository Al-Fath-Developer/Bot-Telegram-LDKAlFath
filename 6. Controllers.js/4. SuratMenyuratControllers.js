/**
 * Kelas untuk menangani kontrol dokumentasi belajar
 */
class SuratMenyuratControllers {
    constructor() {
        this.suratMenyuratServices = new SuratMenyuratServices();
        this.addSuratKeluar = this.addSuratKeluar.bind(this);
        this.createBeritaAcara = this.createBeritaAcara.bind(this);
        this.template_berita_acara = `📝📝Pembuatan Berita Acara

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

${TextUtils.watermark}
`;
        this.chatTexts = {
            beritaAcara: {
                initial: "Terima Kasih telah mengisi berita acara. tunggu yaa...",
                success: "Jika proses berhasil, silahkan buka email yang kamu masukan tadi lalu cek berita acara untuk memperbaiki isi dokumen",
                error: "‼️Kesalahan‼\n\nSilahkan lakukan pengisian berita acara ulang",
                cancel: "Proses dibatalkan",
            },
            suratKeluar: {
                initial: `📑📑Tambah Surat Keluar

Silahkan masukan dokumen surat keluar (bisa berupa foto atau dokumen) dengan nama file berupa kode nomor surat

Contoh kode nomor surat: SRT-001/PRADA/ALFATH-UNITEL/V/2024

*Note: 
- Jika nomor surat tidak ada, bisa diisi dengan perihal
- tulis "batal" (tanpa tanda petik) pada kolom chat jika ingin membatalkan proses

${TextUtils.watermark}

`,
                success: `Terima kasih sudah mengisi, {fileType} nya bisa diakses disini\n\n<a href="{url}">{name}</a>\n${TextUtils.watermark}`  ,
                error: "Maaf, hanya bisa menerima file berupa foto dan dokumen",
                cancel: "Proses dibatalkan",
            },
        };
    }

    /**
     * Membuat scene untuk menambahkan dokumentasi belajar
     * @returns {Scene} Scene Telegraf untuk menambahkan dokumentasi belajar
     */
    createBeritaAcara() {
        return new Scene(
            "buat_berita_acara",
            (ctx) => {
                const pesan_bot = ctx.reply(this.template_berita_acara);
                ctx.data = {};
                ctx.data.pesan_bot = pesan_bot
                return ctx.wizard.next();
            },
            (ctx) => {
                ctx.deleteMessage(ctx.data.pesan_bot.result.message_id);
                try {
                    if (ctx.message.text != null && ctx.message.text.toLowerCase() == "batal") {
                        ctx.reply(this.chatTexts.beritaAcara.cancel);
                        return ctx.wizard.leave();
                    }

                    const pesan_bot = ctx.reply(this.chatTexts.beritaAcara.initial);
                    const beritaAcara = this.suratMenyuratServices.getBeritaAcaraRegexResult(ctx.message.text, this.template_berita_acara);
                    beritaAcara.id_telegram = ctx.from.id;
                    this.suratMenyuratServices.createBeritaAcara(beritaAcara);
                    editMessageTextFromMSG(pesan_bot, this.chatTexts.beritaAcara.success);
                    memberiLikeFromCtx(ctx)

                    return ctx.wizard.leave();
                } catch (error) {
                    ctx.reply(this.chatTexts.beritaAcara.error);
                    return ctx.wizard.leave();
                }
            }
        );
    }

    /**
     * Menambah surat keluar
     * @returns
     */
    addSuratKeluar() {
        return new Scene(
            "tambah_surat_keluar",
            (ctx) => {
                ctx.data = {};
                ctx.data.pesan_bot = ctx.reply(this.chatTexts.suratKeluar.initial);
                
                return ctx.wizard.next();
            },
            (ctx) => {
                ctx.deleteMessage(ctx.data.pesan_bot.result.message_id); // nge hapus 1 chat sebelum chat terakhir

                UserUtils.registerRequired(ctx)
                ctx.data.pesan_bot =  ctx.reply("tunggu sebentar...");
                try {
                    if (ctx.message.text != null && ctx.message.text.toLowerCase() == "batal") {
                        editMessageTextFromMSG(ctx.data.pesan_bot, this.chatTexts.suratKeluar.cancel);
                        return ctx.wizard.leave();
                    }


                    if (ctx.update.message?.photo != null || ctx.update.message?.document != null) {

                        const caption = ctx.message.caption || ctx.message?.document?.filename ||"";
                        const drive_url = FileUtils.getDriveURLFromCtx(ctx,getMapENV('SURAT_KELUAR_FOLDER_ID'),caption,ctx.currentUser.email)

                        this.suratMenyuratServices.addSuratKeluar(ctx.from.id, ctx.from.username, drive_url, caption);
                        this.chatTexts.suratKeluar.success = this.chatTexts.suratKeluar.success.replace("{url}", drive_url)
                        this.chatTexts.suratKeluar.success = this.chatTexts.suratKeluar.success.replace("{name}", caption)
                        editMessageTextFromMSG(ctx.data.pesan_bot, this.chatTexts.suratKeluar.success.replace("{fileType}", "surat keluar"), {
                            parse_mode: "HTML",
                        });
                        ;
                        ctx.deleteMessage();
                    
                    } else {
                        editMessageTextFromMSG(ctx.data.pesan_bot, this.chatTexts.suratKeluar.error);
                    }

                    return ctx.wizard.leave();
                } catch (error) {
                    errorLog(error);
                    ctx.reply(error.message)
                    return ctx.wizard.leave();
                }
            }
        );
    }
}

Logger.log("Loaded SuratMenyuratControllers.js" + (new Date() - startTime) + "ms");
