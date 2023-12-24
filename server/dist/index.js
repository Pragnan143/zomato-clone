"use strict";

var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connection = _interopRequireDefault(require("./database/connection"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const zomato = (0, _express.default)();
zomato.use(_express.default.json());
zomato.get('/', (req, res) => {
  res.json({
    message: "server is running"
  });
});

//Connection to port
zomato.listen(4000, () => {
  (0, _connection.default)().then(() => {
    console.log("Server is running !!!");
  }).catch(err => {
    console.log("server is running but DB is not established");
    console, log(err);
  });
});