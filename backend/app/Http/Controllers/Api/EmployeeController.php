<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\EmployeeService;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct(private readonly EmployeeService $employeeService)
    {

    }
    public function index(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'integer|exists:employees,id',
        ]);
        return response()->json($this->employeeService->getEmployeeListByChief(count($data) > 0 ? $data['id'] : null));
    }
}
