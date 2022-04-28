import * as mongoose from 'mongoose';
export declare const mongodbProvider: {
    provide: string;
    useFactory: () => Promise<typeof mongoose>;
}[];
