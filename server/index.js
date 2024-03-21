import express from "express";
import cors from "cors";
import authenticationRoutes from "./routes/jwtAuthentication.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authenticationRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (_, res) => res.send("This is an express application"));
app.all("*", (_, res) => res.send("Route does not exist"));

app.listen(5000, console.log("Listening on port 5000"));
