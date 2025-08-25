import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv";

config();

cloudinary.config({
    cloud_name  : 'dmyzblvoi',
    api_key : process.env.api_key,
    api_secret : process.env.api_secret
});
export default cloudinary;
