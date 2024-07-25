### Git Ignore tidak terbaca
https://qastack.id/programming/25436312/gitignore-not-working

### catatan
- jangan lupa untuk yang reminder itu make judul dari tabel, jadi judul tabel harus diperhatiin banget (misal has_reminder) -> case has opened udah diubah di spreadsheet tapi belum diubah di kodingan

## kekurangan appscript
- setiap file bakal dieksekusi dulu (klo bukan function), jadi haru s nge load semua dulu

Semakin banyak bikin objectr, semakin lambat

walaupun gitu, ngurnun environment tuh makan waktu banget. kek ngambil atau nge set data dari environemnt. misal semua enviroment di set nyala, itu tuh bisa makan 6 detik sendiri

Berikut adalah durasi eksekusi masing-masing file (dalam milidetik):

1. **env.js**: 52ms
2. **debug.js**: 2ms
3. **Error.js**: 1ms
4. **bot.js**: 55ms
5. **google_info.js**: 617ms
6. **SpreadsheetUtils.js**: 1ms
7. **FileUtils.js**: 1ms
8. **TextUtils.js**: 0ms
9. **UserUtils.js**: 1ms
10. **uploadFileMustRegister.js**: 1ms
11. **fileHasPathCtx.js**: 1ms
12. **fileHasIdDrive.js**: 0ms
13. **saveAllLog.js**: 2ms
14. **userGetFileUrl.js**: 1ms
15. **User.js**: 0ms
16. **UserBuilder.js**: 1ms
17. **SoalIsianSingkat.js**: 0ms
18. **SoalIsianSingkatBuilder.js**: 1ms
19. **UserRepository.js**: 0ms
20. **SuratMenyuratRepository.js**: 1ms
21. **AYRepository.js**: 1ms
22. **AYBuilder.js**: 0ms
23. **InventarisRepository.js**: 1ms
24. **SoalIsianSingkatRepository.js**: 0ms
25. **InfoRepository.js**: 1ms
26. **UserServices.js**: 0ms
27. **SuratMenyuratServices.js**: 1ms
28. **AYServices.js**: 1ms
29. **InventarisServices.js**: 1ms
30. **InfoServices.js**: 0ms
31. **SoalIsianSingkatServices.js**: 1ms
32. **AYControllers.js**: 1ms
33. **UserControllers.js**: 0ms
34. **SuratMenyuratControllers.js**: 1ms
35. **InventarisControllers.js**: 0ms
36. **InfoController.js**: 1ms
37. **SoalIsianSingkatControllers.js**: 0ms
38. **AYRoutes.js**: 128ms
39. **Session.js**: 436ms
40. **SuratMenyuratRoutes.js**: 1ms
41. **UserRoutes.js**: 1ms
42. **InventarisRoutes.js**: 1ms
43. **InfoRoutes.js**: 23ms
44. **SoalIsianSingkatRoutes.js**: 1ms
45. **RemindAy.js**: 1ms
46. **APIRoutes.js**: 0ms
47. **UserAPI.js**: 1ms
48. **TgApi.js**: 1ms

Tapi setelah diteleiti lagi, ternyata yang bikin lama itu kalo ngakses eksternal, misal nge manggil spreadsheet, ibkin env dari PropertiesService
intinya klo ngakses service luar, itu biasanya makin lambat, ternyata untuk bikin object tuh ga gede gede banget makan waktunya
 (setelah ga make PropertiesService)
File	Waktu Selesai (ms)	Durasi (ms)
env.js	0	0
env.js loaded	4	4
debug.js	6	2
Error.js	7	1
bot.js	8	1
google_info.js	514	506
SpreadsheetUtils.js	516	2
FileUtils.js	517	1
TextUtils.js	518	1
UserUtils.js	518	0
uploadFileMustRegister.js	519	1
fileHasPathCtx.js	520	1
fileHasIdDrive.js	521	1
saveAllLog.js	522	1
userGetFileUrl.js	522	0
User.js	523	1
UserBuilder.js	524	1
SoalIsianSingkat.js	524	0
SoalIsianSingkatBuilder.js	525	1
UserRepository.js	526	1
SuratMenyuratRepository.js	526	0
AYRepository.js	527	1
AYBuilder.js	527	0
InventarisRepository	528	1
SoalIsianSingkatRepository	528	0
InfoRepository	529	1
UserServices.js	530	1
SuratMenyuratServices.js	530	0
AYServices.js	531	1
InventarisServices	532	1
InfoServices	532	0
SoalIsianSingkatServices	533	1
AYControllers.js	534	1
UserControllers.js	535	1
SuratMenyuratControllers.js	535	0
InventarisControllers.js	536	1
InfoController.js	537	1
SoalIsianSingkatControllers.js	537	0
AYRoutes.js	539	2
Session.js	541	2
SuratMenyuratRoutes.js	543	2
UserRoutes.js	544	1
InventarisRoutes.js	545	1
InfoRoutes.js	546	1
SoalIsianSingkatRoutes.js	547	1
RemindAy.js	548	1
APIRoutes.js	549	1
UserAPI.js	549	0
TgApi.js	550	1