import { Connection } from 'mongoose';
export declare const ExerciseProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<any, any, any, any>;
    inject: string[];
}[];
