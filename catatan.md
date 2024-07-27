










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

- Todo: bikin sistem presensi scan QR make telegram
-- bikin web untuk scan presensi -> atur make github pages -> ntar bisa akses QR. ditanyain dulu id presensinya apa?. terus dicari ada engga
--  bikin sistem spreeadsheet id presensi

-- spreadsheet untuk database nya make yang biasa, tapi tetep hasilnya dikasih ke luar (data id telegramnya di encryp make md 5 biar gampang)


kosep Presensi
### Admin
- Admin request ke sekum tuk bikin presensi sendiri
- daat yang diminta: id presensi, naa kegiatan, sama linkn yang Al-FAth sender udah dapet aksesnya
- terus id baal disimpen mereka,jadi klo mau ada presensi make itu
- mauk ke tellegram, tulis /adminpresensi
- teurs suruh masukin konfirmasi lokasi
- terus dikasih webapp
- di webpap mereka ngisi id nya, harus bener
- habis itu muncul popup scan qr
- klo berhailsngescan, dapet info siapa terakhir orang itu dalam bentuk popup
- klo gagal, kassih keterangan: kode qr sepertinya saah

### sistem spreadsheet
- bikin duplikat dari hasil presensi qr. untuk dev
- di hasil presensi qr bikin sheet isinya list spreawdsheet yang untuk presensi
- fetch data presensi: bikin method post yang query nya fetchData untuk nge dapetin info presensinya
- post data presensi: bikin method post yang querynya sendPresensi untk nge nambahin presensi ke spreadsheet tersbuttu
- spreadsheet nya masuk ke sheet "Presensi Telegram", jadi klo belum ada sheet "Presensi Telegram" bakal bikin baru
- post data bakal nerima   id telegram, id presesensi sama id kader 
- isinya itu ada date<- untuk data masuk>,   id telegram yang di hash di spreadhseet, nam depan yang ngisi, sama data kader yang lain
### sistem webapp
- webapp bakal make data idtelegram, sama firstname. 
- pertama bakal nannyain id presensinya apa, terus di cek ada engga
- habis itu klo ada bakala masuk ke scan qr, judulnya itu nama acaranya
- habis itu scan qr. klo ada, data masuk, terus suruh pencet ok klo datanya dah masuk
- masukin ke github
### siistem bot
- bakal minta lokasi, terus datanya dimasukin ke spreadsheet presensi
- t3erus bakal dikasih webapp nya untuk presensi


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

```git
feat(inventaris): menampilkan sheet konfirmasi sekre, memberikan akses sheet, membolehkan konfirmasi menggunakan video
feat(utils): membuat object untuk mengurus data dari external agar menggunaakan cache
perf(ay): menggunakan konsep cache ketika pengambilan data
```