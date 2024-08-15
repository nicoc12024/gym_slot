import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import EmailPreferences from "./Partials/EmailPreferences";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, user, mustVerifyEmail, status }) {
    const displayedUser = user || auth.user;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {displayedUser.name}'s Profile
                </h2>
            }
        >
            <Head title={`${displayedUser.name}'s Profile`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 mx-auto max-w-5xl bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            user={displayedUser}
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>

                    {!user.id && (
                        <div className="p-4 sm:p-8 mx-auto max-w-5xl bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                            <UpdatePasswordForm />
                        </div>
                    )}

                    <div className="p-4 sm:p-8 mx-auto max-w-5xl bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <EmailPreferences user={displayedUser} />
                    </div>

                    <div className="p-4 sm:p-8 mx-auto max-w-5xl bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm user={displayedUser} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
