import { Connection } from 'mongoose';
export declare const UserProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<any, any, any, any>;
    inject: string[];
}[];
