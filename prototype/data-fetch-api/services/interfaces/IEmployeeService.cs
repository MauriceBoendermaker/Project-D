using Models;
public interface IEmployeeService
{
    Task AddEmployee(EmployeeCreateDTO emp);
    Task<Employee?> GetEmployee(int EmpId);
    Task<IEnumerable<Employee>?> GetAllEmployees();
    Task<bool> DeleteEmployee(int id);
}