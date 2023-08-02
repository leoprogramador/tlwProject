"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Delete = exports.s3Upload = void 0;
const aws_sdk_1 = require("aws-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESSkEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_REGION,
});
const s3Upload = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const contentFile = yield fs_1.default.promises.readFile(`./public/media/${file.filename}.jpg`);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `media/${file.filename}.jpg`,
        Body: contentFile,
        ACL: "public-read"
    };
    yield s3.upload(params).promise();
    fs_1.default.unlink(`./public/media/${file.filename}.jpg`, (err) => {
        if (err)
            throw err;
    });
});
exports.s3Upload = s3Upload;
const s3Delete = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${file.filename}.jpg`,
    };
    yield s3.deleteObject(params).promise();
});
exports.s3Delete = s3Delete;
