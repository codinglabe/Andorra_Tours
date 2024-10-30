<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResorts extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "provider_id" => "required|exists:providers,id",
            "photo" => "required|image|mimes:jpeg,png,jpg,gif,svg|max:5048",
            "name" => "required|string|max:255|unique:resorts,name",
            "country" => "required|string|max:255",
            "height" => "required|string|max:255",
            "alpine_skiing" => "required|string|max:255",
            "ski_lifts" => "required|string|max:255",
            "clues" => "required|string|max:255",
            "details_title" => "required|string|max:255",
            "description" => "required|string",
            "status" => "required|string|in:Active,Inactive",
        ];
    }
}
