import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Calendar from "./Home/components/Calendar";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Home" />

            <div className="bg-white">
                <Calendar />
            </div>
        </AuthenticatedLayout>
    );
}
