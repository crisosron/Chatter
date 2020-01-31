const USER_ACTION_EVENTS = {
    CREATE_GROUP: "create-group",
    ADD_FRIEND: "add-friend",
    ADD_FRIEND_DENIED: "add-friend-denied",
    ADD_FRIEND_SENT: "add-friend-sent",
    REMOVE_FRIEND: "remove-friend",
    JOIN_GROUP: "join-group",
    LEAVE_GROUP: "leave-group",

    CREATE_GROUP_DENIED: "create-group-denied",
    CREATE_GROUP_SUCCESS: "create-group-success",

    GENERATE_JOIN_CODE: "generate-join-code",
    DELIVER_JOIN_CODE: "deliver-join-code"
}

module.exports = USER_ACTION_EVENTS;