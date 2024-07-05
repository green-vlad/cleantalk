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

    public function save(array $data): void
    {
        /**
         * @var Employee $employee
        */
        $employee = Employee::find($data['id'])->firstOrFail();
        if (!$employee) {
            throw new \Exception('Employee not found');
        }
        $employee->setAttribute('first_name', $data['firstName']);
        $employee->setAttribute('last_name', $data['lastName']);
        $employee->setAttribute('position', $data['position']);
        $employee->setAttribute('email', $data['email']);
        $employee->setAttribute('phone', $data['phone']);
        $employee->save();
    }
}
