import {v2 as cloudinary} from "cloudinary";

import {config} from "dotenv";

config();

cloudinary.config({
    cloud_name  : 'dmyzblvoi',
    api_key : '364198119611463',
    api_secret : 'KAWc4GspmCdJ_R7rDWWVSdpzuMM'
});
export default cloudinary;
