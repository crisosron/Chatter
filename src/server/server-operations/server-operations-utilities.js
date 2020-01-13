class ServerOperationsUtilities{

    /**
     * Creates a notification object that is compatible with the react-notifications-component library
     * @param type {string} - The type of notification (eg danger, success, default, warning)
     * @param title {string} - The title of the notification
     * @param message {string} - The message to be displayed on the notificaption
    */
    static createNotification(type, title, message){
        return {
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
            },
        }
    }
}

module.exports = ServerOperationsUtilities;