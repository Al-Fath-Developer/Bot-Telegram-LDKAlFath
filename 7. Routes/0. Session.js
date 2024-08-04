const userControllers = new UserControllers();
  const suratMenyuratCOntrollers = new SuratMenyuratControllers();
  const inventarisControllers = new InventarisControllers();
  const soalIsianSingkatControllers = new SoalIsianSingkatControllers();
  const presensiControllers = new PresensiControllers();

  const stage = new Stage([
      
      userControllers.register(),
      userControllers.update(),
      suratMenyuratCOntrollers.addSuratKeluar(),
      suratMenyuratCOntrollers.createBeritaAcara(),
      inventarisControllers.addKonfirmasiSekre(),
      soalIsianSingkatControllers.jawabSoal(),
      soalIsianSingkatControllers.jawabSoalGuest(),
      presensiControllers.addAdminPresensi(),
      presensiControllers.konfirmasiKehadiranPeserta(),
  ]);

  bot.use(stage.middleware());
Logger.log("Loaded  Session.js" + (new Date() - startTime) + "ms")