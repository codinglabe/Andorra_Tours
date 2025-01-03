<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonial extends FormRequest
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
            "review_title" => "required|string",
            "review_text" => "required|string",
            "client_photo" => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:5048,'.$this->testimonial->id,
            "client_name" => "required|string",
            "client_address" => "required|string",
            "reviews" => "required|string|in:1,2,3,4,5",
            'status' => "nullable|in:Active,Inactive"
        ];
    }
}
