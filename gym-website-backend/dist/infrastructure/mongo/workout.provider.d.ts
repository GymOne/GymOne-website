import { Connection } from 'mongoose';
export declare const WorkoutProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<any, any, any, any>;
    inject: string[];
}[];
