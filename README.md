если CLIENT_DOMAIN = https://water-wise-frontend.vercel.app
backend крутится на https://waterwise-backend.onrender.com

const app = express();
app.use(
cors({
origin: ${CLIENT_DOMAIN},
credentials: true,
}),
);
app.use(cookieParser());

export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true,
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true,
});
};
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', ${CLIENT_DOMAIN});
res.header('Access-Control-Allow-Credentials', 'true');
};

import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true,
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
},
error => {
return Promise.reject(error);
},
);

где CONSTANTS.AXIOS.baseURL = https://waterwise-backend.onrender.com

Настройка Backend
Настройка CORS и CookieParser:

javascript
Copy code
const app = express();
app.use(
cors({
origin: `${CLIENT_DOMAIN}`, // Указание разрешенного источника
credentials: true, // Разрешение отправки учетных данных (cookies)
})
);
app.use(cookieParser());
Генерация Cookies:

javascript
Copy code
export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true, // Устанавливаем куки только по HTTPS
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: true, // Устанавливаем куки только по HTTPS
});
};
Настройка заголовков для CORS:

javascript
Copy code
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', `${CLIENT_DOMAIN}`);
res.header('Access-Control-Allow-Credentials', 'true');
};
Настройка Frontend
Создание экземпляров Axios:

javascript
Copy code
import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true, // Разрешение отправки cookies
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
error => {
return Promise.reject(error);
},
);
CONSTANTS.AXIOS.baseURL:

javascript
Copy code
CONSTANTS.AXIOS.baseURL = 'https://waterwise-backend.onrender.com';

CORS:

В express вы настроили CORS так, чтобы разрешать запросы с вашего фронтенд-домена (https://water-wise-frontend.vercel.app).
credentials: true позволяет отправлять куки и другие учетные данные в кросс-доменных запросах.
Cookies:

В функции GenerateCookie вы установили sameSite: 'None' и secure: true, что позволяет отправлять куки в кросс-доменных запросах только через HTTPS.
Axios:

Вы создали экземпляр AxiosWithCredentials с withCredentials: true, что позволяет отправлять куки с запросами.
Вы настроили интерцептор, который добавляет токен авторизации к заголовкам запросов, если он доступен в состоянии Redux.

----------------- для Localhost -----------------
если CLIENT_DOMAIN = http://localhost:5173
backend крутится на https://waterwise-backend.onrender.com

const app = express();
app.use(
cors({
origin: ${CLIENT_DOMAIN},
credentials: true,
}),
);
app.use(cookieParser());

export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false,
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None',
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false,
});
};
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', ${CLIENT_DOMAIN});
res.header('Access-Control-Allow-Credentials', 'true');
};

import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true,
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
},
error => {
return Promise.reject(error);
},
);

где CONSTANTS.AXIOS.baseURL = https://waterwise-backend.onrender.com

Настройка Backend
Настройка CORS и CookieParser:

javascript
Copy code
const app = express();
app.use(
cors({
origin: 'http://localhost:5173', // Указание вашего локального источника
credentials: true, // Разрешение отправки учетных данных (cookies)
})
);
app.use(cookieParser());
Генерация Cookies:

javascript
Copy code
export const GenerateCookie = (session, res) => {
res.cookie(COOKIE.REFRESH_TOKEN, session.refreshToken, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false, // Устанавливаем secure на false для локальной разработки
});

res.cookie(COOKIE.SESSION_ID, session.id, {
httpOnly: true,
sameSite: 'None', // Позволяет отправку куки в кросс-доменных запросах
expires: new Date(Date.now() + TIME_DURATION.THIRTY_DAYS),
secure: false, // Устанавливаем secure на false для локальной разработки
});
};
Настройка заголовков для CORS:

javascript
Copy code
export const resAccessOriginHeaders = (res) => {
res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
res.header('Access-Control-Allow-Credentials', 'true');
};
Настройка Frontend

Создание экземпляров Axios:

javascript
Copy code
import { selectUserToken } from 'src/redux/users/selectors.js';
import axios from 'axios';
import CONSTANTS from 'src/components/Constants/constants.js';
import store from 'src/redux/store.js';

export const Axios = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
});

export const AxiosWithCredentials = axios.create({
baseURL: CONSTANTS.AXIOS.baseURL,
withCredentials: true, // Разрешение отправки cookies
});

AxiosWithCredentials.interceptors.request.use(
config => {
const state = store.getState();
const token = selectUserToken(state);
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
},
error => {
return Promise.reject(error);
},
);

CONSTANTS.AXIOS.baseURL:

javascript
Copy code
CONSTANTS.AXIOS.baseURL = 'https://waterwise-backend.onrender.com';
Проверка конфигурации
CORS:

В express вы настроили CORS так, чтобы разрешать запросы с вашего локального фронтенд-домена (http://localhost:5173).
credentials: true позволяет отправлять куки и другие учетные данные в кросс-доменных запросах.
Cookies:

В функции GenerateCookie вы установили sameSite: 'None', что позволяет отправлять куки в кросс-доменных запросах.
Для локальной разработки вы установили secure: false, что корректно, так как ваши запросы будут отправляться по HTTP.
Axios:

Вы создали экземпляр AxiosWithCredentials с withCredentials: true, что позволяет отправлять куки с запросами.
Вы настроили интерцептор, который добавляет токен авторизации к заголовкам запросов, если он доступен в состоянии Redux.

middleware for backend - res.headers

const setCorsHeaders = (res) => {
res.header('Access-Control-Allow-Origin', CLIENT_DOMAIN);
res.header('Access-Control-Allow-Credentials', 'true');
};

app.use((req, res, next) => {
setCorsHeaders(res);
next();
});
