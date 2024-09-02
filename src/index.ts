import express from "express";
import router from "./user.route";
import routerRedis from "./redis.route";

const app = express();

const globalPrefix = "/api";

app.use(globalPrefix, router);
app.use(globalPrefix, routerRedis);

app.listen(4000, () => {
  console.log(
    "The app is running in port 4000, view status in http://localhost:4000/api"
  );
});
