<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $tops = Employee::factory()->count(10)->state(['position' => 'top', 'is_chief' => true])->create();
        $subtops = [];
        foreach ($tops as $top) {
            $subtops = array_merge($subtops, Employee::factory()->count(10)->state([
                'position' => 'subtop',
                'is_chief' => true,
                'ref_chief_id' => $top->getKey(),
            ])->create()->toArray());
        }
        foreach ($subtops as $middle) {
            Employee::factory()->count(99)->state([
                'position' => 'subsubtop',
                'ref_chief_id' => $middle['id'],
            ])->create();
        }
    }
}
