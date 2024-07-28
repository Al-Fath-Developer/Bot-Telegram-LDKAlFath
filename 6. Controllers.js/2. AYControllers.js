class AYControllers {
    constructor() {
        this.ayServices = new AYServices();
        this.setAYHasSubmitByIdTelegram = this.setAYHasSubmitByIdTelegram.bind(this);
        this.addKonfirmNgaji = this.addKonfirmNgaji.bind(this);
        this.getAyat = this.getAyat.bind(this);
        this.getAyatToPage = this.getAyatToPage.bind(this);
        this.getPage = this.getPage.bind(this);
        this.getKajian = this.getKajian.bind(this);
        this.remindUserNotSubmitAY = this.remindUserNotSubmitAY.bind(this);
        this.remindUserNotSubmitNgaji = this.remindUserNotSubmitNgaji.bind(this);
        this.resetStatus = this.resetStatus.bind(this);
        this.showPage = this.showPage.bind(this);
        this.arrTombolGantiHalamanQuran = this.arrTombolGantiHalamanQuran.bind(this);
    }

    /**
     * Nge set AY sudah di submit
     * @param {number} id_telegram 
     * @returns 
     */
    setAYHasSubmitByIdTelegram(id_telegram) {
        return this.ayServices.setHasSubmitByIdTelegram(id_telegram);
    }

    /**
     * Melakukan reminder user yang belum membuka AY dan belum di reminder
     */
     remindUserNotSubmitAY() {
        try {
            let arrDataRemind = this.ayServices.getUsersNotSubmitAY();
            arrDataRemind.forEach((e) => {
                const id_telegram = e[0];
                const has_remind = e[2];
                const has_open = e[3];
                let pesan = "";
                if (!has_open && !has_remind) {
                    const user = new UserServices().getUserInfoById(id_telegram);
                    if (user) {
                        this.ayServices.setHasRemindByIdTelegram(id_telegram);
                        pesan = "‼️Reminder AY\n\nHallo " + user.nama_panggilan + "\nJangan lupa buka AY yaa";
                        bot.telegram.sendMessage(id_telegram, pesan);
                        Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa");
                    } else {
                        Logger.log("id " + id_telegram + "tidak ditemukan");
                    }
                }
            });
        } catch (e) {
            errorLog(e);
        }
    }

    /**
     * Melakukan reminder user yang belum membuka AY dan belum di reminder
     */
     remindUserNotSubmitNgaji() {
        try {
            let arrDataRemind = this.ayServices.getUsersNotNgajiToday();
            arrDataRemind.forEach((e) => {
                const id_telegram = e[0];
                const has_remind = e[4];
                const has_ngaji = e[5];
                let pesan = "";
                if (!has_ngaji && !has_remind) {
                    const user = new UserServices().getUserInfoById(id_telegram);
                    if (user) {
                        this.ayServices.setHasRemindNgaji(id_telegram);
                        pesan = "‼️Reminder Ngaji\n\nHallo " + user.nama_panggilan + ", Jangan lupa ngaji hari ini ya 🤗 \n\nKalau sudah ngaji, silahkan konfirmasi ngaji dengan format sebagai berikut";
                        pesan = pesan + "\n format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255";
                        bot.telegram.sendMessage(id_telegram, pesan);
                        Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa");
                    } else {
                        Logger.log("id " + id_telegram + "tidak ditemukan");
                    }
                }
            });
        } catch (e) {
            errorLog(e);
        }
    }

     resetStatus() {
        return this.ayServices.resetReminderStatus();
    }

    /**
     * Nte submit konfirmasi ngaji
     * @param {ctx} ctx 
     * @returns 
     */
    addKonfirmNgaji(ctx) {
        const formatKonfirmNgaji = "format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255";
        if (/^\d{1,3}:\d{1,3}$/.test(ctx.match[1])) {
            const dataAyat = this.ayServices.addNgajiHarian(ctx.from.id, ctx.match[1].trim());
            if (dataAyat == null) {
                return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid\n Silahkan gunakan format sebagai berikut\n\n" + formatKonfirmNgaji);
            } else if (dataAyat.surah == null) {
                return ctx.reply(dataAyat);
            }
            this.ayServices.setHasNgajiToday(ctx.from.id);
            ctx.replyWithHTML(
`Terima Kasih sudah konfirmasi ngaji hari ini
Checkpoint ayat pada hari ini adalah sebagai berikut
Nama Surah: ${dataAyat.surah}
Ayat: ${dataAyat.no_ayat}
Isi Ayat
<a href="${dataAyat.audio}">${dataAyat.ayat}</a>
Juz: ${dataAyat.juz}
<a href="https://quran.com/id/page/${dataAyat.page}">Halaman: ${dataAyat.page}  </a>
  
`
            );
        } else {
            ctx.reply("Maaf format salah, \nIsi dengan surat & ayat terakhir yang kamu baca hari ini\n" + formatKonfirmNgaji);
        }
    }

    getAyat(ctx, ayat_from_user = null) {
        if (ctx.update.callback_query) {

        } else {
            if (/^\d{1,3}:\d{1,3}$/.test(ctx.match[1])) {
                ayat_from_user = ctx.match[1].trim();
            }
        }
        const dataAyat = this.ayServices.getDataAyat(ayat_from_user);
        if (dataAyat.no_ayat == null) {
            if (ctx.update.callback_query) {
                ctx.editMessageText("Maaf, ini sudah mencapai penghujung ayat di Al-Quran");
                return ctx.deleteMessage();
            }
            return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid.");
        }
        const message =
`[${dataAyat.no_ayat_in_alquran}]
Nama Surah: ${dataAyat.surah}
Ayat: ${dataAyat.no_ayat}
Isi Ayat
<a href="${dataAyat.audio}">${dataAyat.ayat}</a>
Juz: ${dataAyat.juz}
<a href="https://quran.com/id/page/${dataAyat.page}">Halaman: ${dataAyat.page}  </a>
`  ;
        if (ctx.update.callback_query) {
            ctx.editMessageText(message, {
                parse_mode: "HTML",

                reply_markup: markup.inlineKeyboard([[button.text("Ayat Sebelumnya", 'prev_ayat'), button.text("Ayat Setelahnya", 'next_ayat')],
                [button.text("🔙 Main Menu", 'main_menu')]
            ])
            });
        } else {
            ctx.replyWithHTML(message, {
                parse_mode: "HTML",

                reply_markup: markup.inlineKeyboard([[button.text("Ayat Sebelumnya", 'prev_ayat'), button.text("Ayat Setelahnya", 'next_ayat')]])
            });
        }
    }

    getAyatToPage(ctx, ayat_from_user = null) {
        if (ctx.update.callback_query) {

        } else {
            if (/^\d{1,3}:\d{1,3}$/.test(ctx.match[1])) {
                ayat_from_user = ctx.match[1].trim();
            }
        }
        const dataAyat = this.ayServices.getDataPageFromAyat(ayat_from_user);
        if (dataAyat.page == null) {
            if (ctx.update.callback_query) {
                ctx.editMessageText("Maaf, ini sudah mencapai penghujung ayat di Al-Quran");
                return ctx.deleteMessage();
            }
            return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid.");
        }
      const message = this.showPage(dataAyat);
        if (ctx.update.callback_query) {
            ctx.editMessageText(message, {
                parse_mode: "HTML",
                reply_markup: markup.inlineKeyboard([this.arrTombolGantiHalamanQuran(dataAyat.page)])
            });
        } else {
            ctx.replyWithHTML(message, {
                reply_markup: markup.inlineKeyboard([this.arrTombolGantiHalamanQuran(dataAyat.page)])
            });
        }
    }

    getPage(ctx, page_from_user = null) {
        const dataAyat = this.ayServices.getDataPage(page_from_user);
        if (dataAyat.page == null) {
            if (ctx.update.callback_query) {
                ctx.editMessageText("Maaf, ini sudah mencapai penghujung ayat di Al-Quran");
                return ctx.deleteMessage();
            }
            return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid.");
        }
       const message  = this.showPage(dataAyat);
        if (ctx.update.callback_query) {
            ctx.editMessageText(message, {
                parse_mode: "HTML",
                reply_markup: markup.inlineKeyboard([this.arrTombolGantiHalamanQuran(dataAyat.page),
                [button.text("🔙 Main Menu", 'main_menu')]
            
            ])
            });
        } else {
            ctx.replyWithHTML(message, {
                reply_markup: markup.inlineKeyboard([this.arrTombolGantiHalamanQuran(dataAyat.page)])
            });
        }
    }
    getKajian(ctx){

        const message = `<code><b>Kajian Islam</b></code>\n\nTekan tombol play pada gambar dibawah ini atau buka melalui link berikut:\n <a href="https://on.soundcloud.com/JD3C8vBZx5dYPnFc8">Kajian Adam dan Akhlak - Ustadz Abdullah Zaen, Lc., MA</a>`;
        if (ctx.update.callback_query) {
            ctx.editMessageText(message, {
                parse_mode: "HTML",
                reply_markup: markup.inlineKeyboard(
                [button.text("🔙 Main Menu", 'main_menu')
            
            ])
            });
        }

    }
    showPage(dataAyat){
        const basmalah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
        
        let count_ayat = 0;
        let message = `<a href="https://quran.com/page/${dataAyat.page}">Halaman [${dataAyat.page}]</a>\n\n` + dataAyat.ayahs[0].surah + "\n========\n";
        dataAyat.ayahs.forEach((e) => {
            if (e.no_ayah == 1) {
                message = message +
                    `${count_ayat == 0 ? "" : e.surah + "\n========\n"}${basmalah}\n\n(${e.no_ayah})\n${e.ayah.replace(basmalah, "")}\n<a href="${e.audio}">${e.latin}</a>\n\n`;
            } else {
                message = message + `(${e.no_ayah})\n<b>${e.ayah}</b>\n<a href="${e.audio}">${e.latin}</a>\n\n`;
            }
            count_ayat++;
        });
        message = message + `\n\nBanyak ayat yang ditampilkan: ${count_ayat}\nJuz: ${dataAyat.juz}\nHalaman: ${dataAyat.page}\n\n Jazakallah Khairan Katsiran\n\n\nBot Telegram LDK Al-Fath`;
        return message
    }
     arrTombolGantiHalamanQuran(halamansekarang) {
        const arrKeyboard = []
        if (halamansekarang != 604) {
            arrKeyboard.push(button.text(`Next Page(${halamansekarang + 1})`, 'next_page_alquran'))
        }
        if (halamansekarang != 1) {
            arrKeyboard.push(button.text(`Prev Page(${halamansekarang - 1})`, 'prev_page_alquran'))
        }
        
        return arrKeyboard
        
    }

}

// class AYControllers {
//     constructor() {
//         this.ayServices = new AYServices();
//         this.setAYHasSubmitByIdTelegram = this.setAYHasSubmitByIdTelegram.bind(this);
//         this.addKonfirmNgaji = this.addKonfirmNgaji.bind(this);
//         this.getAyat = this.getAyat.bind(this);
//         this.getAyatToPage = this.getAyatToPage.bind(this);
//         this.getPage = this.getPage.bind(this);

//         // Ekstrak kode yang mirip menjadi property
//         this.buttonMarkup = markup.inlineKeyboard([[button.text("Ayat Sebelumnya", 'prev_ayat'), button.text("Ayat Setelahnya", 'next_ayat')]]);
//         this.pageButtonMarkup = markup.inlineKeyboard([[ button.text("Halaman Setelahnya", 'next_page_alquran'),button.text("Halaman Sebelumnya", 'prev_page_alquran')]]);
//         this.basmalah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
//         this.processPage = this.processPage.bind(this);
//     }

//     /**
//      * Nge set AY sudah di submit
//      * @param {number} id_telegram 
//      * @returns 
//      */
//     setAYHasSubmitByIdTelegram(id_telegram) {
//         return this.ayServices.setHasSubmitByIdTelegram(id_telegram);
//     }

//     /**
//      * Melakukan reminder user yang belum membuka AY dan belum di reminder
//      */
//     static remindUserNotSubmitAY() {
//         try {
//             let arrDataRemind = this.ayServices.getUsersNotSubmitAY();
//             arrDataRemind.forEach((e) => {
//                 const id_telegram = e[0];
//                 const has_remind = e[2];
//                 const has_open = e[3];
//                 let pesan = "";
//                 if (!has_open && !has_remind) {
//                     const user = new UserServices().getUserInfoById(id_telegram);
//                     if (user) {
//                         this.ayServices.setHasRemindByIdTelegram(id_telegram);
//                         pesan = "‼️Reminder AY\n\nHallo " + user.nama_panggilan + "\nJangan lupa buka AY yaa";
//                         bot.telegram.sendMessage(id_telegram, pesan);
//                         Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa");
//                     } else {
//                         Logger.log("id " + id_telegram + "tidak ditemukan");
//                     }
//                 }
//             });
//         } catch (e) {
//             errorLog(e);
//         }
//     }

//     /**
//      * Melakukan reminder user yang belum membuka AY dan belum di reminder
//      */
//     static remindUserNotSubmitNgaji() {
//         try {
//             let arrDataRemind = this.ayServices.getUsersNotNgajiToday();
//             arrDataRemind.forEach((e) => {
//                 const id_telegram = e[0];
//                 const has_remind = e[4];
//                 const has_ngaji = e[5];
//                 let pesan = "";
//                 if (!has_ngaji && !has_remind) {
//                     const user = new UserServices().getUserInfoById(id_telegram);
//                     if (user) {
//                         this.ayServices.setHasRemindNgaji(id_telegram);
//                         pesan = "‼️Reminder Ngaji\n\nHallo " + user.nama_panggilan + ", Jangan lupa ngaji hari ini ya 🤗 \n\nKalau sudah ngaji, silahkan konfirmasi ngaji dengan format sebagai berikut";
//                         pesan = pesan + "\n format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255";
//                         bot.telegram.sendMessage(id_telegram, pesan);
//                         Logger.log("Hallo" + user.nama_panggilan + "Jangan lupa buka AY yaa");
//                     } else {
//                         Logger.log("id " + id_telegram + "tidak ditemukan");
//                     }
//                 }
//             });
//         } catch (e) {
//             errorLog(e);
//         }
//     }

//     static resetStatus() {
//         return this.ayServices.resetReminderStatus();
//     }

//     /**
//      * Nte submit konfirmasi ngaji
//      * @param {ctx} ctx 
//      * @returns 
//      */
//     addKonfirmNgaji(ctx) {
//         const formatKonfirmNgaji = "format yang benar:\n#chxNgaji nomorsurat:nomorayat\ncontoh:\n#chxNgaji 2:255";
//         if (/^\d{1,3}:\d{1,3}$/.test(ctx.match[1])) {
//             const dataAyat = this.ayServices.addNgajiHarian(ctx.from.id, ctx.match[1].trim());
//             if (dataAyat == null) {
//                 return ctx.reply("Maaf, ayat atau surah yang Anda masukan tidak valid\n Silahkan gunakan format sebagai berikut\n\n" + formatKonfirmNgaji);
//             } else if (dataAyat.surah == null) {
//                 return ctx.reply(dataAyat);
//             }
//             this.ayServices.setHasNgajiToday(ctx.from.id);
//             ctx.reply(
//                 `Terima Kasih sudah konfirmasi ngaji hari ini
//                 Checkpoint ayat pada hari ini adalah sebagai berikut

//                 Nama Surah: ${dataAyat.surah}
//                 Juz: ${dataAyat.juz}
            //  Ayat:
                // Isi Ayat
//                 ${dataAyat.ayat}`
//             );
//         } else {
//             ctx.reply("Maaf format salah, \nIsi dengan surat & ayat terakhir yang kamu baca hari ini\n" + formatKonfirmNgaji);
//         }
//     }
//     getAyat(ctx, ayat_from_user = null) {
//         if (ctx.update.callback_query) {
//             // ...
//         } else {
//             // ...
//         }
//         const dataAyat = this.ayServices.getDataAyat(ayat_from_user);
//         if (dataAyat.no_ayat == null) {
//             // ...
//         }
//         const message =
//             `${dataAyat.surah}  
//             ${dataAyat.ayat} (${dataAyat.no_ayat})
//             No Ayat di Al-Quran [${dataAyat.no_ayat_in_alquran}]
//             `;
//         if (ctx.update.callback_query) {
//             ctx.editMessageText(message, {
//                 reply_markup: this.buttonMarkup
//             });
//         } else {
//             ctx.replyWithHTML(message, {
//                 reply_markup: this.buttonMarkup
//             });
//         }
//     }

//     getAyatToPage(ctx, ayat_from_user = null) {
//         if (ctx.update.callback_query) {
//             // ...
//         } else {
//             // ...
//         }
//         this.processPage(ctx, ayat_from_user, this.pageButtonMarkup);
//     }

//     getPage(ctx, page_from_user = null) {
//         this.processPage(ctx, page_from_user, this.pageButtonMarkup);
//     }

//     processPage(ctx, input, buttonMarkup) {
//         const isAyat = input !== null;
//         const dataAyat = isAyat ? this.ayServices.getDataPageFromAyat(input) : this.ayServices.getDataPage(input);
//         if (dataAyat.page == null) {
//             // ...
//         }
//         let count_ayat = 0;
//         let message = `<a href="https://quran.com/page/${dataAyat.page}">Halaman [${dataAyat.page}]</a>\n\n` + dataAyat.ayahs[0].surah + "\n========\n";
//         dataAyat.ayahs.forEach((e) => {
//             if (e.no_ayah == 1) {
//                 message = message +
//                     `${count_ayat == 0 ? "" : e.surah + "\n========\n"}${this.basmalah}\n\n(${e.no_ayah})\n${e.ayah.replace(this.basmalah, "")}\n`;
//             } else {
//                 message = message + `(${e.no_ayah})\n<b>${e.ayah}</b>\n`;
//             }
//             count_ayat++;
//         });
//         message = message + `\n\nBanyak ayat yang ditampilkan: ${count_ayat}\nJuz: ${dataAyat.juz}\nHalaman: ${dataAyat.page}\n\n Jazakallah Khairan Katsiran\n\n\nBot Telegram LDK Al-Fath`;
//         if (ctx.update.callback_query) {
//             ctx.editMessageText(message, {
//                 parse_mode: "HTML",
//                 reply_markup: buttonMarkup
//             });
//         } else {
//             ctx.replyWithHTML(message, {
//                 reply_markup: buttonMarkup
//             });
//         }
//     }

// }

Logger.log("Loaded  AYControllers.js" + (new Date() - startTime) + "ms");