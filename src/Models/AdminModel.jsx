import { z } from 'zod';

const adminModel = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    suspended: z.boolean(),
    master: z.boolean(),
    username: z.string(),
    password: z.string().optional().nullable(),
    pinNumber: z.string().optional().nullable(),
    phone: z.string(),
    roles: z.record(z.boolean()),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export default adminModel;