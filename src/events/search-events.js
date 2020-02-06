const SEARCH_EVENTS = {
    SEARCH_FRIENDS: "search-friends",
    SEARCH_GROUPS: "search-groups",
    SEARCH_UNKNOWN_USERS: "search-unknown-users",
    SEARCH_UNKNOWN_GROUPS: "search-unknown-groups",
    NO_RESULTS_FOUND: "no-results-found",

    // Unknown CommunicationEntity delviery events
    DELIVER_UNKNOWN_USER_SEARCH_RESULTS: "deliver-unknown-user-search-results",
    DELIVER_UNKNOWN_GROUP_SEARCH_RESULTS: "deliver-unknown-groups-search-results",

    DELIVER_RESULTS: "deliver-results",
    RESTORE_DEFAULT_COMM_ENTITIES: "restore-default-comm-entities",
    INVALID_SEARCH_STRING: "invalid-search-string"
}

module.exports = SEARCH_EVENTS;