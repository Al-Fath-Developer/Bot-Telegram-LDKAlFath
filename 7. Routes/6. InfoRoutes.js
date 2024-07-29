/**
 * File: InfoRoutes.js
 * 
 * Ini adalah file yang berisi definisi rute-rute untuk fitur informasi pada bot Telegram Al-Fath.
 */

const infoControllers = new InfoControllers()

/**
 * Menambahkan perintah "/infofitur" pada bot untuk mendapatkan daftar fitur.
 * 
 * @param {Object} ctx - Konteks dari perintah.
 * @returns {Promise} - Promise yang mengembalikan daftar fitur.
 */
bot.cmd("infofitur", (ctx)=>{
    showTypingStatus(ctx)

    return infoControllers.getListFeature(ctx);
})

/**
 * Menambahkan aksi "list_fitur" pada bot untuk mendapatkan daftar fitur.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan daftar fitur.
 */
bot.action("list_fitur", (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getListFeature(ctx);
})

/**
 * Menambahkan aksi "about_dev" pada bot untuk mendapatkan informasi tentang pengembang.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan informasi tentang pengembang.
 */
bot.action('about_dev', (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getAboutDev(ctx)
})

/**
 * Menambahkan aksi "visi_misi" pada bot untuk mendapatkan visi dan misi.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan visi dan misi.
 */
bot.action('visi_misi', (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getVisiMisi(ctx)
})

/**
 * Menambahkan aksi "main_menu" pada bot untuk kembali ke menu utama.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan menu utama.
 */
bot.action('main_menu', (ctx)=>{
    showBotStatus(ctx)

    UserUtils.registerOptional(ctx)

    return infoControllers.getMenuStart(ctx)
})
bot.action('about_bot', (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getAboutBot(ctx)
})

/**
 * Menambahkan aksi "kritik_saran_bot" pada bot untuk mendapatkan kritik dan saran.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan kritik dan saran.
 */
bot.action('kritik_saran_bot', (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getKritikSaran(ctx)
})

bot.action('settingan_telegram', (ctx)=>{
    showBotStatus(ctx)

    return infoControllers.getSettinganTelegram(ctx)
})


/**
 * Menambahkan aksi "start" pada bot untuk memulai bot dan menampilkan menu utama.
 * 
 * @param {Object} ctx - Konteks dari aksi.
 * @returns {Promise} - Promise yang mengembalikan menu utama.
 */
bot.start(ctx=>{
    showBotStatus(ctx)

    UserUtils.registerOptional(ctx)
    return infoControllers.getMenuStart(ctx)
})
Logger.log("Loaded  InfoRoutes.js" + (new Date() - startTime) + "ms")