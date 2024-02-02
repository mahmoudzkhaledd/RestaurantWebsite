import { z } from 'zod';
import adminModel from './AdminModel';

const MealModel = z.object({
    _id: z.string(),
    active: z.boolean().optional(),
    adminId: z.string().or(z.object({
        _id: z.string(),
        name: z.string(),
    })),
    number: z.number(),
    doneOrders: z.number(),
    pendingOrders: z.number(),
    name: z.string(),
    category: z.string(),
    price: z.number(),
    thumbnailImage: z.string().nullable().or(z.object({
        url: z.string(),
        _id: z.string(),
    })),
    description: z.string(),
    subDescription: z.string(),
    rating: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export default MealModel;