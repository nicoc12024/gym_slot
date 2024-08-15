<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $userId = $this->route('id') ?? $this->user()->id; // Obtiene el ID del usuario que se está actualizando

        return [
            'name' => ['sometimes', 'string', 'max:255'],  
            'email' => [
                'sometimes', 
                'string', 
                'lowercase',
                'email', 
                'max:255', 
                Rule::unique(User::class)->ignore($userId), 
            ],
            'email_notifications' => ['sometimes', 'boolean'],
        ];
    }
}