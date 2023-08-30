export var HandStatus;
(function (HandStatus) {
    HandStatus[HandStatus["Active"] = 0] = "Active";
    HandStatus[HandStatus["Stand"] = 1] = "Stand";
    HandStatus[HandStatus["Bust"] = 2] = "Bust";
    HandStatus[HandStatus["Blackjack"] = 3] = "Blackjack";
})(HandStatus || (HandStatus = {}));
