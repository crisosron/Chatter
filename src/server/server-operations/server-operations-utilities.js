class ServerOperationsUtilities{
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