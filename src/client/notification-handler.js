import {store} from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
export default class NotificationHandler{

    /**
     * Creates a notification object that is compatible with the react-notifications-component library
     * @param type {string} - The type of notification (eg danger, success, default, warning)
     * @param title {string} - The title of the notification
     * @param message {string} - The message to be displayed on the notificaption
     * @param duration {int} - The time in milliseconds the notification is displayed for
     * @param cb {function} - Callback function called when the notification is dismissed
    */
    static createNotification(type, title, message, duration = 3000, cb = null){
        const notification = {
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: duration,
            },

            onRemoval: cb                
        }

        store.addNotification(notification);
    }
}
