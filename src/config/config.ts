import * as dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
  MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
  MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
};

export default CONFIG;
