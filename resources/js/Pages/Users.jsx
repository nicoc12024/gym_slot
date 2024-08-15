import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Users({ auth, users }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Users" />

            <div className="bg-white p-6 shadow-sm rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Users</h1>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                ID
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Name
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Email
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-gray-50"
                                } hover:bg-gray-200 cursor-pointer`}
                            >
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                    >
                                        {user.id}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                    >
                                        {user.name}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                    >
                                        {user.email}
                                    </Link>
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    <Link
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                    >
                                        {user.is_admin ? "Admin" : "User"}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
