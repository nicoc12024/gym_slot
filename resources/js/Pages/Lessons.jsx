import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function Lessons({ auth, lessons }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);

    const {
        data,
        setData,
        post,
        patch,
        processing,
        errors,
        reset,
        delete: destroy,
    } = useForm({
        name: "",
        max_students: "",
    });

    const handleCreate = () => {
        setCurrentLesson(null);
        setData({
            name: "",
            max_students: "",
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (lesson) => {
        setCurrentLesson(lesson);
        setData({
            name: lesson.name || "",
            max_students: lesson.max_students || "",
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteRequest = (lesson) => {
        setCurrentLesson(lesson);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patch(route("admin.lessons.update", currentLesson.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else if (isDeleting) {
            destroy(route("admin.lessons.destroy", currentLesson.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        } else {
            post(route("admin.lessons.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Lessons" />

            <div className="bg-white sm:max-w-[80%] max-w-[100%] sm:mx-auto py-6 rounded-lg">
                <div className="flex items-center justify-left gap-2">
                    <h1 className="text-2xl font-semibold mb-4 px-3">
                        Lessons
                    </h1>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        >
                            Add Lesson
                        </button>
                    </div>
                </div>
                <table className="min-w-[100%] bg-white ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Nro
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Name
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Max Students
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson, index) => (
                            <tr
                                key={lesson.id}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-gray-50"
                                } hover:bg-gray-200 `}
                            >
                                <td className="py-2 px-4 border-gray-200 text-sm">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border-gray-200 text-sm">
                                    {lesson.name}
                                </td>
                                <td className="py-2 px-4 border-gray-200 text-sm">
                                    {lesson.max_students}
                                </td>
                                <td className="py-2 px-4 border-gray-200 text-sm flex gap-2">
                                    <button
                                        onClick={() => handleEdit(lesson)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteRequest(lesson)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <Modal
                    show={showModal}
                    onClose={() => {
                        setIsEditing(false);
                        setIsDeleting(false);
                        setShowModal(false);
                    }}
                >
                    {isDeleting ? (
                        <form onSubmit={handleSubmit} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                Delete Lesson
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete the lesson "
                                {currentLesson?.name}" with a maximum of{" "}
                                {currentLesson?.max_students} students?
                            </p>
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDeleting(false);
                                        setShowModal(false);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    Delete
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6">
                            <h2 className="text-lg font-medium text-gray-900">
                                {isEditing ? "Edit Lesson" : "Add Lesson"}
                            </h2>

                            <div className="mt-4">
                                <label
                                    htmlFor="lesson_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Lesson Name
                                </label>
                                <input
                                    type="text"
                                    id="lesson_name"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="max_students"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Max Students
                                </label>
                                <input
                                    type="number"
                                    id="max_students"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.max_students}
                                    onChange={(e) =>
                                        setData("max_students", e.target.value)
                                    }
                                />
                                {errors.max_students && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.max_students}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setShowModal(false);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    disabled={processing}
                                >
                                    {isEditing ? "Save" : "Create"}
                                </button>
                            </div>
                        </form>
                    )}
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
