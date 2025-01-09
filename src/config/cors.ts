import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = process.env.CORS_FRONEND_LIST?.split(",");
        if (process.argv.includes("--api")) {
            whiteList.push(undefined)
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS "+ origin));
        }
    }
};