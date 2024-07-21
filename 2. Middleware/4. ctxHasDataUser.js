
/**
 * untuk nyimpen informasi pribadi user di context, kalo ga ada info currentUser, berarti dia belum registrasi
 */
// bot.use( (ctx, next) => {
//     let currentUser = (new UserServices()).getUserInfoById(ctx.from.id)
//     ctx.currentUser = currentUser

//     // eksekusi next() untuk melanjutkan ke middleware berikutnya
//     next();
//   })