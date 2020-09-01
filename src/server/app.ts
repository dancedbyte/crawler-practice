import express from 'express';
import router from "./router";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'session',
    keys: [/* secret keys */],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router);

app.listen(7000, () => {
    console.log('server listen success ✨');
});
