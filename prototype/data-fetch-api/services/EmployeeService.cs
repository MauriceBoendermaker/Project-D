
using Microsoft.EntityFrameworkCore;
using Models;

public class EmployeeService : IEmployeeService
{
    private AppDbContext appContext;

    public EmployeeService(AppDbContext context)
    {
        appContext = context;
    }
    public async Task AddEmployee(EmployeeCreateDTO emp)
    {
        try
        {
            Employee Employee = emp.ToEmployee();

            await appContext.AddAsync(Employee);
            await appContext.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public async Task<bool> DeleteEmployee(int id)
    {
        try
        {
            Employee? FoundEmployee = await appContext.Medewerkers.FindAsync(id);
            if (FoundEmployee != null)
            {
                appContext.Remove(FoundEmployee);
                await appContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return false;

        }
    }

    public async Task<IEnumerable<Employee>?> GetAllEmployees()
    {
        try
        {
            IEnumerable<Employee> employees = await appContext.Medewerkers.ToListAsync();
            return employees;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }

    public async Task<Employee?> GetEmployee(int EmpId)
    {
        try
        {
            IEnumerable<Employee> employees = await GetAllEmployees();
            return employees.FirstOrDefault(e => e.MedewerkerId == EmpId);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }
}