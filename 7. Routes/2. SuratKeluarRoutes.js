bot.cmd("tambahsuratkeluar", (ctx) => {
    UserUtils.registerRequired(ctx)

    return stage.enter("tambah_surat_keluar");
});
bot.cmd("buatberitaacara", (ctx) => {
    UserUtils.registerRequired(ctx)

    return stage.enter("buat_berita_acara");
});