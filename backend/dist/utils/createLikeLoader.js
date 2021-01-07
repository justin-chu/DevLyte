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
exports.createLikeLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const Like_1 = require("../entities/Like");
const createLikeLoader = () => new dataloader_1.default((keys) => __awaiter(void 0, void 0, void 0, function* () {
    const likes = yield Like_1.Like.findByIds(keys);
    const likesIdsToLike = {};
    likes.forEach((like) => {
        likesIdsToLike[parseInt(`${like.userId}|${like.postId}`)] = like;
    });
    return keys.map((key) => likesIdsToLike[parseInt(`${key.userId}|${key.postId}`)]);
}));
exports.createLikeLoader = createLikeLoader;
//# sourceMappingURL=createLikeLoader.js.map