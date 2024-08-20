import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";

export default function Professors({ auth, professors, lessons }) {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentProfessor, setCurrentProfessor] = useState(null);

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
        surname: "",
        lessons: [],
    });

    const handleCreate = () => {
        setCurrentProfessor(null);
        setData({
            name: "",
            surname: "",
            lessons: [],
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (professor) => {
        setCurrentProfessor(professor);
        setData({
            name: professor.name || "",
            surname: professor.surname || "",
            lessons: professor.lessons.map((lesson) => lesson.id) || [],
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDeleteRequest = (professor) => {
        setCurrentProfessor(professor);
        setIsDeleting(true);
        setShowModal(true);
    };

    const handleLessonChange = (lessonId) => {
        if (data.lessons.includes(lessonId)) {
            setData(
                "lessons",
                data.lessons.filter((id) => id !== lessonId)
            );
        } else {
            setData("lessons", [...data.lessons, lessonId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patch(route("admin.professors.update", currentProfessor.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setIsEditing(false);

                    reset();
                },
            });
        } else if (isDeleting) {
            destroy(route("admin.professors.destroy", currentProfessor.id), {
                onSuccess: () => {
                    setShowModal(false);
                    setIsDeleting(false);
                    reset();
                },
            });
        } else {
            post(route("admin.professors.store"), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Professors" />

            <div className="bg-white sm:max-w-[80%] max-w-[100%] sm:mx-auto py-6 rounded-lg">
                <div className="flex items-center justify-left gap-2">
                    <h1 className="text-2xl font-semibold mb-4">Professors</h1>
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={handleCreate}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        >
                            Add Professor
                        </button>
                    </div>
                </div>
                <table className="min-w-[100%] bg-white ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                ID
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Name
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Surname
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Lessons
                            </th>
                            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {professors.map((professor, index) => (
                            <tr
                                key={professor.id}
                                className={`${
                                    index % 2 === 0
                                        ? "bg-gray-100"
                                        : "bg-gray-50"
                                } hover:bg-gray-200 cursor-pointer`}
                            >
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    {professor.name}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    {professor.surname}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm">
                                    {professor.lessons
                                        .map((lesson) => lesson.name)
                                        .join(", ")}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 text-sm flex gap-2">
                                    <button
                                        onClick={() => handleEdit(professor)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteRequest(professor)
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
                                Delete Professor
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Are you sure you want to delete Professor "
                                {currentProfessor?.name}{" "}
                                {currentProfessor?.surname}"?
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
                                {isEditing ? "Edit Professor" : "Add Professor"}
                            </h2>

                            <div className="mt-4">
                                <label
                                    htmlFor="professor_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="professor_name"
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
                                    htmlFor="surname"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="surname"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.surname}
                                    onChange={(e) =>
                                        setData("surname", e.target.value)
                                    }
                                />
                                {errors.surname && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.surname}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="lessons"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Lessons
                                </label>
                                <div className="mt-2 space-y-2">
                                    {lessons.map((lesson) => (
                                        <div key={lesson.id}>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox"
                                                    value={lesson.id}
                                                    checked={data.lessons.includes(
                                                        lesson.id
                                                    )}
                                                    onChange={() =>
                                                        handleLessonChange(
                                                            lesson.id
                                                        )
                                                    }
                                                />
                                                <span className="ml-2">
                                                    {lesson.name}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.lessons && (
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors.lessons}
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
