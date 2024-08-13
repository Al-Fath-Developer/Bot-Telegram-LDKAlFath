/**
 *  * @param {Object} userData - The user data.
     * @param {number} userData.id_telegram - The Telegram ID of the user.
     * @param {string} userData.nama_lengkap - The full name of the user.
     * @param {string} userData.nama_panggilan - The nickname of the user.
     * @param {string} userData.nim - The student ID of the user.
     * @param {string} userData.jenis_kelamin - The gender of the user.
     * @param {string} userData.email - The email of the user.
     * @param {string} userData.angkatan - angkatan user
     * @param {string} userData.fakultas - fakultas kuliah user
     * @param {string} userData.departemen - departemen atau bidang kader
     * @param {string} userData.wilayah - berisi pusat / fakultas
     * @param {string} userData.amanah - berisi amanah dari kader
     * @returns {User} A new User instance.
 */
/**
 * @typedef {Object} UserRegexResult
     * @param {string} nama_lengkap - The full name of the user.
     * @param {string} nama_panggilan - The nickname of the user.
     * @param {string} nim - The student ID of the user.
     * @param {string} jenis_kelamin - The gender of the user.
     * @param {string} email - The email of the user.
     * @param {string} angkatan - angkatan user
     * @param {string} fakultas - fakultas kuliah user
     * @param {string} departemen - departemen atau bidang kader
     * @param {string} wilayah - berisi pusat / fakultas
     * @param {string} amanah - berisi amanah dari kader
 * 
 */


const UserUtils = {
    registerOptional(ctx) {
        let currentUser = (new UserServices()).getUserInfoById(ctx.from.id)
        ctx.currentUser = currentUser
    const user = ctx.currentUser
   
    return user

},
registerRequired(ctx){
    let currentUser = (new UserServices()).getUserInfoById(ctx.from.id)
        ctx.currentUser = currentUser
    const user = ctx.currentUser
    if (user == null){
    
         ctx.reply("Fitur ini terbatas untuk user yang telah melakukan registrasi. Silahkan /register pada kolom chat untuk melakukan registrasi jika kamu pengurus aktif LDK Al-Fath 2024\n\n Jika Anda telah selesai melakukan registrasi, silahkan kirimkan perintah yang Anda masukan sebelumnya")
         
         throw Error("Akun ini belum melakukan registrasi")
    }
    return user
    
    },
       
  
     /**
     * Template untuk input informasi pengguna.
     * @type {string}
     */
    template :  
`
📝*Registrasi Akun*📝

Nama Lengkap: [Fulan bin Fulan]
Nama Panggilan: [Fulan]
NIM: [13021]
Jenis Kelamin (Laki-laki/Perempuan: [Laki-laki]
Email: [fulan@gmail.com]
Angkatan: [2023]
Fakultas: [FIK]
Departemen/Bidang: [Syiar]
Wilayah (Pusat/Fakultas): [Fakultas]
Amanah: [Kepala Bidang]

`    
    ,
    
    
    /**
     *  Mengekstrak informasi pengguna dari teks mentah menggunakan regex.

     * @param {string} raw 
     * @returns {UserRegexResult}
     */
    getUserRegexResult(raw){
        let match
        const regex = TextUtils.regex_template 
        const result = []

        while ((match = regex.exec(raw)) !== null) {
        
            result.push(match[1])
    } 
    const userData = {}
    
userData.nama_lengkap = result[0]
userData.nama_panggilan = result[1]
userData.nim = result[2]
userData.jenis_kelamin = result[3]
userData.email = result[4]
userData.angkatan = result[5]
userData.fakultas = result[6]
userData.departemen = result[7]
userData.wilayah = result[8]
userData.amanah = result[9]


       
        return userData

    },

    
    /**
     * Mengonversi objek pengguna ke dalam bentuk array.
     * @param {User} user - Data User
     * @return {Array}
     */


    userToArray(user) {
        let arr = [
            user.id_telegram,
            user.nama_lengkap,
            user.nama_panggilan,
            user.nim,
            user.jenis_kelamin,
            user.email,
            user.angkatan,
user.fakultas,
user.departemen,
user.wilayah,
user.amanah
        ]
        
        return arr
    },
     
    /**
     * Mengonversi objek pengguna ke dalam bentuk array.
     * @param {Array}
     * @return {User} user - Data User
     */
    arrayToUser(arr){
        let user = new User({
            id_telegram: arr[0],
             nama_lengkap:  arr[1], 
             nama_panggilan:  arr[2], 
             nim:  arr[3], 
             jenis_kelamin:  arr[4],
              email: arr[5],
              angkatan : arr[6],
              fakultas : arr[7],
              departemen : arr[8],
              wilayah : arr[9],
              amanah : arr[10],
            });

              return user



    },

     /**
     * Metode untuk mengirim email verifikasi dengan token.
     * @param {string} email - Alamat email.
     * @param {string} token - Token verifikasi.
     */
      sendEmail(email, token) {
        try {
                const urlsendbot = getMapENV('BOT_TELEGRAM_URL') +  "?text="
                  let html = HtmlService.createTemplateFromFile('9. Verifikasi Email Template').getRawContent()
                  html = html.replace("${token}", token)
                  html = html.replace("${token}", token)
                  html = html.replace("${urlsendbot}", urlsendbot)
                  Logger.log(html)
                  GmailApp.sendEmail(email, "Verifikasi Bot Telegram LDK Al-Fath", "Bismillah, berikut merupakan kode verifikasi akun di bot telegram: " + token ,{
                    replyTo	: "alfath.sender@gmail.com",
                    name: "Admin Bot Telegram LDK Al-Fath",
                  htmlBody: html
                
                   })
        } catch (error) {
                errorLog(error)
            // Handle error
        }
    }

}
Logger.log("Loaded UserUtils.js" + (new Date() - startTime) + "ms");