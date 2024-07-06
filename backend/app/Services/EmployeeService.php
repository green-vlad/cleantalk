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
        $employee = Employee::findOrFail($data['id']);
        if (!$employee) {
            throw new \Exception('Employee not found');
        }
        $employee->setAttribute('first_name', $data['firstName']);
        $employee->setAttribute('last_name', $data['lastName']);
        $employee->setAttribute('position', $data['position']);
        $employee->setAttribute('email', $data['email']);
        $employee->setAttribute('phone', $data['phone']);
        $employee->setAttribute('ref_chief_id', $data['refChiefId']);
        $employee->save();
    }

    public function delete(int $id): void
    {
        /**
         * @var Employee $employee
         */
        $employee = Employee::findOrFail($id);
        $employee->delete();
    }
}
