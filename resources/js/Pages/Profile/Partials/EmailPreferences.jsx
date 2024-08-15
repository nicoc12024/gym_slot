import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";

export default function EmailPreferences({ user }) {
    const userLogged = usePage().props.auth.user;
    const { data, setData, patch, processing, errors, recentlySuccessful } =
        useForm({
            email_notifications: user.email_notifications,
        });

    const submit = (e) => {
        e.preventDefault();

        if (userLogged.is_admin === 1) {
            patch(route("admin.users.update", user.id), {
                preserveScroll: true,
            });
        } else {
            patch(route("profile.update"), {
                preserveScroll: true,
            });
        }
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
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
