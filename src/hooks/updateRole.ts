import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export async function updateRole(userId: string, newRole: Role) {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
        });

    } catch (error) {
        console.error(error);
        throw new Error('Failed to update user role');
    }
}