<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'refChiefId' => $this->ref_chief_id,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'position' => $this->position,
            'email' => $this->email,
            'phone' => $this->phone,
            'notes' => $this->notes,
            'isChief' => $this->is_chief,
        ];
    }
}
