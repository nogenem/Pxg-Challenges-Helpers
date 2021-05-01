#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance force
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;SetTitleMatchMode, 2 ; allows genshin window to be found.

#IfWinActive, ahk_exe pxgme.exe
{

; Space -> Win+PrintScreen (sends the image to C:\Users\XXXX\Pictures\Screenshots)
$Space::#PrintScreen

} 