/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare type UserDocument = Exercise & Document;
export declare class Exercise {
    name: string;
    email: string;
    password: string;
}
export declare const UserSchema: import("mongoose").Schema<Document<Exercise, any, any>, import("mongoose").Model<Document<Exercise, any, any>, any, any, any>, {}, {}>;
