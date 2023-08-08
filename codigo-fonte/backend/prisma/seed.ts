import {PrismaClient, Prisma} from "@prisma/client";
// @ts-ignore
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userData: Prisma.userCreateInput[] = [
    {
        name: "Phelipe Admin",
        email: "phelipe_admin@email.com",
        role: "ADMIN",
        password: "123456",
    },
    {
        name: "Phelipe Paciente",
        email: "phelipe_user@email.com",
        role: "PACIENTE",
        password: "123456",
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        try {
            const user = await prisma.user.create({
                data: {
                    ...u,
                    password: await bcrypt.hash(u.password, 10),
                },
            });
            console.log(`Created user with id: ${user.id}`);
        } catch (e) {
            console.log(e);
        }
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
