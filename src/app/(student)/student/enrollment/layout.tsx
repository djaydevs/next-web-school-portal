export const metadata = {
    title: "Enrollment | Student Portal",
    description: "Student Portal Enrollment",
};

export default function EnrollmentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}