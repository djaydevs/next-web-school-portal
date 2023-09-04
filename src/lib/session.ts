import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function sessionRole() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return redirect("/signin");
    }
    if (session?.user.role !== "STUDENT") {
        throw new Error("User is not a student");
    }

    if (session?.user.role !== "FACULTY") {
        throw new Error("User is not a faculty member");
    }

    if (session?.user.role !== "ADMIN") {
        throw new Error("User is not an admin");
    }
}
