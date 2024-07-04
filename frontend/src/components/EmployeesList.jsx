import axiosClient from "../services/axios-client";
import {useEffect, useState} from "react";

function getEmployeesListByChief(id) {
  let uri = id ? '/?id=' + id : '/';
  console.log(uri);
  axiosClient.get(uri)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.error(error.message);
    })
}
export default function EmployeesList() {
  const [ employeesList, setEmployeesList ] = useState(null);

  useEffect(() => {
    setEmployeesList(getEmployeesListByChief());
    console.log(employeesList);
  }, []);

  return (
    <div>
      <ul>
        {employeesList && employeesList.map((employee, index) => {
          <li>{{ employee }}</li>
        })}
      </ul>
    </div>
  );
}