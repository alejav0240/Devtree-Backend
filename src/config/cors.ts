import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if (process.env.CORS_FRONEND_LIST?.split(",").includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS "+ origin));
        }
    }
};