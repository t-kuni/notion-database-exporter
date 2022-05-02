const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

import * as moment from "moment-timezone";
import "./diContainer";

moment.tz.setDefault("Asia/Tokyo");

