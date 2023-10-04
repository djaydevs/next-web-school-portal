import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const user = await prisma.user.findUnique({
    where: {
      id: String(id)
    }
  })
  return NextResponse.json({ user }, { status: 200 });
}

// export async function PUT(req: NextRequest) {
//     const { userId } = req.query;
//     const { role } = req.body;
  
//     try {
//       await prisma.user.update({
//         where: { id: userId as string },
//         data: { role: role as Role },
//       });

//         return NextResponse.send('User role updated successfully', { status: 200 });

//     } catch (error) {
//         console.error(error);
//         return NextResponse.send('Failed to update user role', { status: 500 });
//     }
// }