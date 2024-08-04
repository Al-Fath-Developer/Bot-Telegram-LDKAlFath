class InventarisControllers {
    constructor() {
        this.inventarisServices = new InventarisServices();
        this.addKonfirmasiSekre = this.addKonfirmasiSekre.bind(this);
        this.konfirmasiInventarisText = `📷📷Konfirmasi Inventaris Sekretariat Al-Fath

Sebelum kamu melakukan konfirmasi, silahkan update data yang ada disini pada <a href="${getMapENV('INVENTARIS_SPREADSHEET_LINK')}">sheet status inventaris</a> terlebih dahulu.

Silahkan konfirmasi berupa dokumentasi inventaris dengan ketentuan sebagai berikut:

1. jika objek foto berupa barang (misal meminjam, menitip atau mengembalikan barang), sebisa mungkin atur jarak pengambilan gambar  agar  orang yang melihat foto tersebut dapat mengetahui lokasi barang yang dimaksut

2. jika objek foto berupa ruangan (misal mengunjungi sekre atau lainnya), sebisa mungkin atur jarak pengambilan gambar agar orang yang melihat foto tersebut dapat mengetahui kondisi terakhir ruangan sekre

3. penulisan caption foto (biasanya muncul akan mengirim foto) diawali dengan '#', kemudian diikuti dengan kata kerja (mengunjungi, menitip, mengecek, mengembalikan). lalu diikuti dengan objek (barang, ruangan),  dan diakhiri dengan keterangan tambahan (format bebas)

4. contoh caption: 
- #meminjam toa, buku islah dan proyektor untuk acara Islah 2 2023
- #menitip brosur pmb
- #mengunjungi sekre untuk membersihkan ruangan

*Note: 
- tulis "batal" (tanpa tanda petik) pada kolom chat jika ingin membatalkan proses

${TextUtils.watermark}

`;

        this.prosesDibatalkanText = "Proses dibatalkan";
        this.terimaKasihText = `Terima kasih sudah konfirmasi, lah kok ilang? tenang, bukti konfirmasi nya bisa diakses disini\n<a href="{url}">{name}</a>\n${TextUtils.watermark}`        ;
    }

    /**
     * Melakukan konfirmasi terkait inventaris dari sekretariat di Al-Fath
     * @returns
     */
    addKonfirmasiSekre() {
        return new Scene(
            'konfirmasi_inventaris_sekre',
            (ctx) => {
                ctx.data = {};
                ctx.data.pesan_bot  = ctx.replyWithHTML(this.konfirmasiInventarisText);
                UserUtils.registerRequired(ctx);
                ctx.data.email = ctx.currentUser.email;
                ctx.data.nim = ctx.currentUser.nim;
                ctx.data.nama_lengkap = ctx.currentUser.nama_lengkap;
                FileUtils.giveAccessToEmail(getMapENV('INVENTARIS_SPREADSHEET_LINK'), ctx.currentUser.email);

                return ctx.wizard.next();
            },

            (ctx) => {

                const loading_message = ctx.reply("tunggu sebentar...");
                try {
                    if (ctx.message.text != null && ctx.message.text.toLowerCase() == "batal") {
                        editMessageTextFromMSG(loading_message, this.prosesDibatalkanText);

                        return ctx.wizard.leave();
                    }
                    const judul = ctx.message.caption || ctx.update.message?.document?.file_name || new Date().toLocaleString();
                    const drive_url = FileUtils.getDriveURLFromCtx(ctx, getMapENV('INVENTARIS_FOLDER_ID'), judul, ctx.data.email);
                     this.inventarisServices.addKonfirmasiSekre([ctx.data.nim, ctx.data.nama_lengkap], drive_url, judul);
                    this.terimaKasihText=  this.terimaKasihText.replace("{url}", drive_url)
                    this.terimaKasihText =  this.terimaKasihText.replace("{name}", judul)
                    editMessageTextFromMSG(loading_message, this.terimaKasihText, {
                        parse_mode: "HTML",
                    });
                    
                    ctx.deleteMessage();
                    ctx.deleteMessage(ctx.data.pesan_bot.result.message_id); 

                    return ctx.wizard.leave();
                } catch (error) {
                    errorLog(error);
                    editMessageTextFromMSG(loading_message, "Ada Kesalahan: " + error.message);

                    return ctx.wizard.leave();
                }
            }
        );
    }
}

Logger.log("Loaded InventarisControllers.js" + (new Date() - startTime) + "ms");
