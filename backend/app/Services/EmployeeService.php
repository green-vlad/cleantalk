<?php

namespace App\Services;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Collection;

class EmployeeService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }

    public function getEmployeeListByChief(int|null $id): Collection
    {
        if ($id) {
            return Employee::where('ref_chief_id', $id)->get();
        }
        return Employee::where('ref_chief_id', null)->get();
    }
}
