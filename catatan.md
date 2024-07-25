










### update
- nambahin fitur kemanan biar kalo ada inputan rumus tuh ga langsung dieksekusi


### Todo
- Pesan error
- optimalisasi kodingan (jadi klo pengambilan darta spreadsheet itu make cache) ✅

- pegaturan regex (jdi kalo user nga ngisi nya ngaco , msial kurang [] nya , itu bakal error) ✅

- lebih ke optimalisasi fitur yang ada
- belajar versioning 
- hidden kredensial data ✅
- up data ay, surat keluar, inventasi ke spradhseet ekspternal
- nge get data histori ngaji user ini. 
- user yang ngirim file ke bot, otomatis dapet link drive nya ✅
- nge ubah object dari class biar masuk ke classs yang dibutuhin (biar ga boros) -> make konsep bind, biar nge jaga this nya engga kemana mana (). setiap function yang ngakses this
- nge tambahin yanng bisa liat dokuemnya cuman email yang dimasukin aksesnya di bot telegram, jadi klo belum nge reuest, belum dapet aksenya

Optimasi:
Untuk menghitung durasi eksekusi setiap file dari data yang diberikan, kita perlu menghitung selisih waktu antara dua durasi yang berturut-turut. Ini akan memberi kita berapa lama waktu yang dihabiskan untuk memuat setiap file secara individu. Mari kita lakukan perhitungan tersebut.



```git
chore(log): save log result to spreadhset
feat(file): add feature to save files send to bot and user having link and dirrect access via email
feat(ay): add feature to read Al-Quran by pagee or ayah
feat(ay): add audio playback feature in Quran reading 
feat(ay): add feature to litsen "kajian"
feat(auth): restrict access to certain feature for registered users only
feat(auth): fetch user data based on nim with email verification
perf(algorithm): optimize bot speed by change PropertiesService with Map
perf(algoritm): optimize bot by making some external accesses to non global object
chore(log): add log to each file for initial loading time tracking
docs(readme): add description to readme
docs(common): add JSDoc to several code files
feat(fileutil): create function to generate Drive URL based on ctx, filename and folder drive id
feat(texutils): configure regex for number template to enforce number data type
feat(logutils): create logging for location, video note and voice
feat(soalisiansingakt): add feature to reqest location proof via send location or photo/screenshot
refactor(common): refactor global obect from class repository, and sevice into necessary clas and bind funciton
refactor(suratmenyurat): change feature from "surat keluar" into "surat menyurat"
feat(suratmenyurat): add validation for data input in "Berita acara"
chore(common): update log and data fetch ti use  external spreadsheet


```
