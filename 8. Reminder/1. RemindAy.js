
/**
 * Function to remind the user not to submit AY.
 */
function remindUserNotSubmitAY() {
    ayControllers.remindUserNotSubmitAY()
}

/**
 * Function to remind the user not to submit Ngaji today.
 */
function remindUserNotNgajiToday() {
   ayControllers.remindUserNotSubmitNgaji()
}

/**
 * Function to reset the reminder status.
 */
function resetReminderStatus(){
   Logger.log( ayControllers.resetStatus())
}
Logger.log("Loaded RemindAy.js" + (new Date() - startTime) + "ms")