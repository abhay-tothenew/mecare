const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
require("dotenv").config();

const app = express();
const http = require("http");
// const server = http.createServer(app);

require("./config/googleAuth");

const middleware = [
  morgan("dev"),
  helmet(),
  cors(),
  express.json(),
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
  passport.initialize(),
  passport.session(),
];

app.use(middleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const routes = [
  ["/auth", "./routes/auth"],
  ["/api/users", "./routes/users"],
  ["/api/doctors", "./routes/doctors"],
  ["/api/appointments", "./routes/appointments"],
  ["/api/disease", "./routes/disease"],
  ["/api/slots", "./routes/slots"],
  ["/api/reviews", "./routes/reviews"],
  ["/api/admin", "./routes/admin"],
];

routes.forEach(([path, route]) => app.use(path, require(route)));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs: http://localhost:${PORT}/api-docs`);
});
