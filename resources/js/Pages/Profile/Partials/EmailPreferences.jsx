import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function EmailPreferences() {
    const user = usePage().props.auth.user;
    const { data, setData, patch, processing, errors } = useForm({
        email_notifications: user.email_notifications,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"), {
            preserveScroll: true,
        });
    };
    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Email Notifications
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Send a confirmation or cancellation notification of a
                    reservation to your email.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center">
                    <input
                        id="email_notifications"
                        type="checkbox"
                        checked={data.email_notifications}
                        onChange={(e) =>
                            setData("email_notifications", e.target.checked)
                        }
                        className="mr-2"
                    />
                    <label
                        htmlFor="email_notifications"
                        className="text-sm text-gray-600"
                    >
                        Receive Email Notifications
                    </label>
                    <InputError
                        message={errors.email_notifications}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
