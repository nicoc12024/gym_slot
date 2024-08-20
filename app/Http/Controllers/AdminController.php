<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Lesson;
use App\Models\Professor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;


class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $bookings = Booking::all()->map(function ($booking) use ($user) {
            return [
                'date' => $booking->date,
                'time' => $booking->time,
                'user_id' => $booking->user_id,
                'is_current_user' => $booking->user_id == $user->id,
            ];
        });
    
        return Inertia::render('Dashboard', [
            'bookings' => $bookings,
        ]);
    }

    public function listUsers()
    {
        $users = User::all();
        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    public function listProfessors()
    {
        $professors = Professor::with('lessons')->get();
        $lessons = Lesson::all(); // Asegúrate de obtener las lecciones disponibles
    
        return Inertia::render('Professors', [
            'professors' => $professors,
            'lessons' => $lessons, // Pasar las lecciones al componente
        ]);
    }

    public function listLessons()
    {
        $lessons = Lesson::all();
        return Inertia::render('Lessons', [
            'lessons' => $lessons
        ]);
    }

    public function storeLesson(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'max_students' => 'required|numeric',
        ]);

        Lesson::create([
            'name' => $request->name,
            'max_students' => $request->max_students, 
        ]);

        return redirect()->route('admin.lessons')->with('success', 'Lesson created successfully');
    }


    public function updateLesson(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'max_students' => 'required|numeric',
        ]);

        $lesson = Lesson::findOrFail($id);

        // Llenar los atributos del modelo con los datos de la solicitud
        $lesson->fill($request->all());

        // Guardar los cambios en la base de datos
        $lesson->save();

        return redirect()->route('admin.lessons')->with('success', 'Lesson updated successfully');
    }

    public function destroyLesson($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return redirect()->route('admin.lessons')->with('success', 'Lesson deleted successfully');
    }


    public function destroyProfessor($id)
    {
        $professor = Professor::findOrFail($id);
        $professor->delete();

        return redirect()->route('admin.professors')->with('success', 'Professor deleted successfully');
    }

    public function storeProfessor(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'lessons' => 'required|array',
            'lessons.*' => 'exists:lessons,id',
        ]);
    
        $professor = Professor::create([
            'name' => $request->name,
            'surname' => $request->surname,
        ]);
    
        // Asignar las lecciones seleccionadas
        $professor->lessons()->sync($request->lessons);
    
        return redirect()->route('admin.professors')->with('success', 'Professor created successfully');
    }
    
    public function updateProfessor(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'lessons' => 'required|array',
            'lessons.*' => 'exists:lessons,id',
        ]);
    
        $professor = Professor::findOrFail($id);
        $professor->update([
            'name' => $request->name,
            'surname' => $request->surname,
        ]);
    
        // Actualizar las lecciones seleccionadas
        $professor->lessons()->sync($request->lessons);
    
        return redirect()->route('admin.professors')->with('success', 'Professor updated successfully');
    }

       
}
