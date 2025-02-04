import { CorsOptions } from "cors";
import colors from "colors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = process.env.CORS_FRONEND_LIST?.split(",");
    if (process.argv.includes("--api")) {
      whiteList.push(undefined);
    }
    console.log(colors.bgCyan.white.bold("CORS: "), whiteList);
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS " + origin));
    }
  },
};
