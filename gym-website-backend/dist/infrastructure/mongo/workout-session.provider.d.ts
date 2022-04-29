import { Connection } from 'mongoose';
export declare const WorkoutSessionProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<any, any, any, any>;
    inject: string[];
}[];
