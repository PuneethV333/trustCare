import z from "zod";


export const IUser = z.object({
    role: z.enum(["USER", "HELPER", "ADMIN"]),
    id: z.string(),
    email: z.email(),
    name: z.string(),
    firebaseUid: z.string(),
    phoneNumber: z.string().optional(),
    profilePic: z.url().optional(),
});

export const IUserPreview = z.object({
    id: z.string(),
    name: z.string(),
    profilePic: z.url().optional(),
    role: z.enum(["USER", "HELPER", "ADMIN"]),
});


export const ISignUpPayload = z.object({
    name: z.string(),
    email: z.email(),
    phoneNumber: z.string().optional(),
    profilePic: z.url().optional()
})

export type SignUpPayload = z.infer<typeof ISignUpPayload>


//!!IMaid data 
// {
//     "id": "c144f7d6-bd03-4324-a871-da333561b9ac",
//     "userId": "192b12a1-ae9c-488f-a3b8-2f43c72927f4",
//     "type": "maid",
//     "bio": "Experienced maid with 3 years of work across Chennai. Skilled in Cooking and Cooking North Indian.",
//     "experience": 3,
//     "city": "Chennai",
//     "area": "OMR",
//     "skill": [
//         "Cooking",
//         "Cooking North Indian",
//         "Cleaning",
//         "Cooking South Indian",
//         "Dusting",
//         "Pet care"
//     ],
//     "costPerHour": "₹100",
//     "averageRating": 5,
//     "totalReviews": 2,
//     "isVerified": true,
//     "profileCompletion": 82,
//     "createdAt": "2026-06-22T15:22:58.909Z",
//     "updatedAt": "2026-06-22T15:22:58.909Z",
//     "user": {
//         "id": "192b12a1-ae9c-488f-a3b8-2f43c72927f4",
//         "name": "Meena Patel",
//         "email": "helper5@trustcare.in",
//         "role": "HELPER",
//         "phoneNumber": "8909473191",
//         "firebaseUid": "fake-helper-uid-5",
//         "createdAt": "2026-06-22T15:22:58.903Z",
//         "updatedAt": "2026-06-22T15:22:58.903Z",
//         "profilePic": "https://ui-avatars.com/api/?name=Meena%20Patel&background=random&color=fff&size=128"
//     }
// }

export const IMaid = z.object({
    id: z.string(),
    userId: z.string(),

    type: z.enum(["maid", "nanny", "babysitter"]),

    bio: z.string().nullable().optional(),
    experience: z.number().nullable().optional(),

    city: z.string().nullable().optional(),
    area: z.string().nullable().optional(),

    skill: z.array(z.string()),

    costPerHour: z.string(),

    averageRating: z.number(),
    totalReviews: z.number(),

    isVerified: z.boolean(),
    profileCompletion: z.number(),

    user: IUserPreview,
});

export type Maid = z.infer<typeof IMaid>;

export const IGetUser = z.object({
    role: z.enum(["USER", "HELPER", "ADMIN"]),
    id: z.string(),
    email: z.email(),
    name: z.string(),
    firebaseUid: z.string(),
    phoneNumber: z.string().optional(),
    profilePic: z.url().optional(),
    maidProfile: z.object({
        id: z.string(),
        userId: z.string(),

        type: z.enum(["maid", "nanny", "babysitter"]),

        bio: z.string().nullable().optional(),
        experience: z.number().nullable().optional(),

        city: z.string().nullable().optional(),
        area: z.string().nullable().optional(),

        skill: z.array(z.string()),

        costPerHour: z.string(),

        averageRating: z.number(),
        totalReviews: z.number(),

        reviews: z.array(z.object({
            comment: z.string(),
            createdAt: z.coerce.date(),
            rating: z.number(),
            user: z.object({
                id: z.string(),
                profilePic: z.url(),
                name: z.string()
            })
        })),

        isVerified: z.boolean(),
        profileCompletion: z.number(),
    })
})

export type getUser = z.infer<typeof IGetUser>