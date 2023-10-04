import { prisma } from '@/lib/prisma';

export async function updateRole(userId: string, newRole: string) {
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