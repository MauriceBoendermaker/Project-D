using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public interface ICustomerService
    {
        Task<List<Customer>> GetAllCustomersAsync();
        Task<Customer?> GetCustomerByIdAsync(int customerId);
        Task AddCustomerAsync(Customer customer);
        Task<bool> DeleteCustomerAsync(int customerId);
        Task<bool> UpdateCustomerAsync(int id, Customer customer);
    }
}
