<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EmployeeResource;
use App\Services\EmployeeService;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function __construct(private readonly EmployeeService $employeeService)
    {

    }
    public function index(?int $id = null): JsonResponse
    {
        return response()->json(
            EmployeeResource::collection(
                $this->employeeService->getEmployeeListByChief($id)
            )
        );
    }

    public function save(Request $request): JsonResponse
    {
        $data = $request->validate([
            'id' => 'required|integer|exists:employees,id',
            'refChiefId' => 'integer|nullable|exists:employees,id',
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'position' => 'required|string',
            'email' => 'required|email|string',
            'phone' => 'required|string',
        ]);
        $this->employeeService->save($data);
        return response()->json('', 200);
    }

    public function delete(int $id): JsonResponse
    {
        $this->employeeService->delete($id);
        return response()->json('', 204);
    }
}
