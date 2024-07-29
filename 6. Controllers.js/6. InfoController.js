class InfoControllers {
  constructor() {
    this.infoServices = new InfoServices();
    this.getListFeature = this.getListFeature.bind(this);
    this.getSettinganTelegram = this.getSettinganTelegram.bind(this);
    this.getVisiMisi = this.getVisiMisi.bind(this);
    this.getAboutDev = this.getAboutDev.bind(this);
    this.getAboutBot = this.getAboutBot.bind(this);
    this.getKritikSaran = this.getKritikSaran.bind(this);
    this.getMenuStart = this.getMenuStart.bind(this);
  }

  /**
   * Mengambil list fitur yang ada di bot ini
   * @param {ctx} ctx
   */
  getListFeature(ctx) {
    const listFeature = this.infoServices.getCellValueByCellPosition("A2");
    if (ctx.message && ctx.message.text) {
      return ctx.reply(listFeature);
    }

    ctx.editMessageText(listFeature, {
      reply_markup: markup.inlineKeyboard([
        [button.text("Settingan Telegram ⚙️", "settingan_telegram"), button.text("🔙 Main Menu", "main_menu")],
      ]),
    });
  }

  getSettinganTelegram(ctx) {
    const settinganTelegram = this.infoServices.getCellValueByCellPosition("A8");
    ctx.editMessageText(settinganTelegram, {
      reply_markup: markup.inlineKeyboard([
        [button.text("🧾 List Fitur", "list_fitur"), button.text("🔙 Main Menu", "main_menu")],
      ]),
    });
  }

  /**
   * Mengambil visi misi
   * @param {ctx} ctx
   */
  getVisiMisi(ctx) {
    const visiMisi = this.infoServices.getCellValueByCellPosition("A6");
    ctx.editMessageText(visiMisi, {
      reply_markup: markup.inlineKeyboard([[button.text("🔙 Main Menu", "main_menu")]]),
    });
  }

  /**
   * Mengambil tentang dari developer
   * @param {ctx} ctx
   */
  getAboutDev(ctx) {
    const aboutDev = this.infoServices.getCellValueByCellPosition("A5");
    ctx.editMessageText(aboutDev, {
      reply_markup: markup.inlineKeyboard([
        [button.text("About Bot🤖", "about_bot"), button.text("🔙 Main Menu", "main_menu")],
      ]),
    });
  }

  getAboutBot(ctx) {
    const aboutBot = this.infoServices.getCellValueByCellPosition("A9");
    ctx.editMessageText(aboutBot, {
      reply_markup: markup.inlineKeyboard([
        [button.text("💻 About Dev", "about_dev"), button.text("🔙 Main Menu", "main_menu")],
      ]),
    });
  }

  /**
   * Mengambil tentang dari developer
   * @param {ctx} ctx
   */
  getKritikSaran(ctx) {
    const kritikSaran = this.infoServices.getCellValueByCellPosition("A7");
    ctx.editMessageText(kritikSaran, {
      reply_markup: markup.inlineKeyboard([[button.text("🔙 Main Menu", "main_menu")]]),
    });
  }

  /**
   * Mengambil menu start
   * @param {ctx} ctx
   */
  getMenuStart(ctx) {

    const newUserMessage = `${this.infoServices.getCellValueByCellPosition("A4")}`;
    const returningUserMessage = `Assalamu'alaikum ${ctx.currentUser?.nama_panggilan}\nSelamat datang kembali 👋 ${TextUtils.watermark}`;

    const payload = ctx.payload;
    switch (payload) {
      case "BuatBeritaAcara":
        return stage.enter("buat_berita_acara");

      case "TambahSuratKeluar":
        return stage.enter("tambah_surat_keluar");
      case "KonfirmasiInventaris":
        return stage.enter("konfirmasi_inventaris_sekre");

      default:
        const keyboard = [];
        keyboard[0] = [
          button.text("Al-Quran", "start_quran"),
          button.text("Kajian", "start_kajian"),
        ];
        keyboard[1] = [
          button.text("ℹ️ About", "about_bot"),
          button.text("User Manual 📖", "list_fitur"),
        ];
        keyboard[2] = [
          button.text("🔭Visi Misi", "visi_misi"),
          button.text("Kritik Saran📝", "kritik_saran_bot"),
        ];
        keyboard[3] = [
          button.url("Instagram📷", "https://www.instagram.com/alfathtelu/"),
        ];

        let message;
        if (ctx.currentUser == null) {
          message = newUserMessage;
        } else {
          message = returningUserMessage;
        }

        if (ctx.update.callback_query != null) {
          return ctx.editMessageText(message, {
            parse_mode: "HTML",

            reply_markup: markup.inlineKeyboard(keyboard),
          });
        }

        return ctx.replyWithHTML(message, {
          reply_markup: markup.inlineKeyboard(keyboard),
        });
    }
  }
}

Logger.log("Loaded InfoController.js" + (new Date() - startTime) + "ms");
