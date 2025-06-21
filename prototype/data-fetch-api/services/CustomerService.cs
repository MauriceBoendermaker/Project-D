using Microsoft.EntityFrameworkCore;
using Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;

        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(int customerId)
        {
            return await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == customerId);
        }

        public async Task AddCustomerAsync(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateCustomerAsync(int id, Customer customer)
        {
            try
            {
                Customer? existingCustomer = await _context.Customers.FindAsync(id);

                if (existingCustomer == null)
                {
                    return false;
                }

                existingCustomer.Company = customer.Company;
                existingCustomer.Contactperson = customer.Contactperson;
                existingCustomer.Email = customer.Email;
                existingCustomer.TelephoneNumber = customer.TelephoneNumber;
                existingCustomer.Address = customer.Address;
                existingCustomer.ZipCode = customer.ZipCode;
                existingCustomer.Location = customer.Location;

                _context.Customers.Update(existingCustomer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

        }

        public async Task<bool> DeleteCustomerAsync(int customerId)
        {
            try
            {
                Customer? FoundCostumer = await _context.Customers.FindAsync(customerId);
                if (FoundCostumer != null)
                {
                    _context.Remove(FoundCostumer);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
