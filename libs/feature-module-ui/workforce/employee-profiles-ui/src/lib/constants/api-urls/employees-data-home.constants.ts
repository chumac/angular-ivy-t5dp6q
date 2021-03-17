export const EMPLOYEES_DATA_HOME = {
  chartData: '/api/employees/hr/dashboard-chart',
  activeEmployeesData: getActiveEmployeesData,
  inactiveEmployeesData: getInactiveEmployeesData,
  employeeDataItem: '/api/employees/hr/comprehensive-info',
  employeeProfilePicture: '/api/employees/profile-image',
  cancelAllReboard: '/api/reboard/hr/all-employee-session/cancel',
  cancelReboard: '/api/reboard/hr/employee-session/cancel',
  cancelMyReboard: '/api/reboard/my-session/cancel',
  submitReboard: '/api/reboard/submit-session',
  agreementText: '/api/reboard/agreement/get',
  startReboard: '/api/reboard/start-session',
  retrieveReboard: '/api/reboard/retrieve-session',
  retrieveEmployeeReboard: '/api/reboard/hr/retrieve-session',
  reboardAllEmployees: '/api/reboard/hr/initiate-all-employee-session/create',
  reboardEmployee: '/api/reboard/hr/initiate-employee-session/create',
  activeReboardEmployees: '/api/reboard/hr/employee-details/getAll',
  activeReboardEmployee: '/api/reboard/hr/employee-details/get',
  getMyDetails: '/api/reboard/my-details/getall',
}

function getActiveEmployeesData(sourceId: string): string {
  return `/api/employees/hr/${sourceId}/get`;
}

function getInactiveEmployeesData(sourceId: string): string {
  return `/api/employees/hr/${sourceId}/in-active/get`;
}
