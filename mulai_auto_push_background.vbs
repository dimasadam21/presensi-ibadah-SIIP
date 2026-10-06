Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WshShell.Run "node auto_git_push.js", 0, False
MsgBox "Auto Git Push telah aktif di latar belakang (Background)!" & vbCrLf & vbCrLf & "Setiap kali Anda mengedit atau menyimpan berkas, perubahan akan otomatis di-push ke GitHub." & vbCrLf & vbCrLf & "Untuk menghentikannya, jalankan file 'stop_auto_push.bat'.", 64, "Auto Git Push Aktif"
