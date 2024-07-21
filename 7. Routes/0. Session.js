
const userControllers = new UserControllers()
const suratKeluarCOntrollers = new SuratKeluarControllers()
const inventarisControllers = new InventarisControllers()
const soalIsianSingkatControllers = new SoalIsianSingkatControllers()

const  stage = new Stage([
    userControllers.register(), 
    userControllers.update(),
     suratKeluarCOntrollers.addSuratKeluar(), 
     suratKeluarCOntrollers.createBeritaAcara(),
     inventarisControllers.addKonfirmasiSekre(),
     soalIsianSingkatControllers.jawabSoal(),
     soalIsianSingkatControllers.jawabSoalGuest()

    ])

bot.use(stage.middleware())