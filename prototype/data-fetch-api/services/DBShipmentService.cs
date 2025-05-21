using Microsoft.EntityFrameworkCore;
using Models;

namespace Services
{
    public class DBShipmentService : IShipmentService
    {
        private AppDbContext _context;
        public DBShipmentService(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public async Task<IEnumerable<Shipment>?> GetAllShipments()
        {
            try
            {

                List<Shipment> shipments = await _context.Shipments.ToListAsync();
                return shipments.Count() < 0 ? null : shipments;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;

            }

        }

        public async Task<double> GetAverageLoadDegree()
        {
            try
            {

                var Shipments = await GetAllShipments();
                if (Shipments == null || !Shipments.Any()) return -1;

                double totalLoadDegree = Shipments.Sum(x => (double)x.CurrentLoadKg / x.MaxCapacityKg);
                return Math.Round(totalLoadDegree / Shipments.Count(), 4);


            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }



        }

        public async Task<double> GetLoadDegree(int shipmentId)
        {
            try
            {

                var Shipments = await GetAllShipments();
                if (Shipments == null) return -1;

                var shipment = Shipments.FirstOrDefault(x => x.ShipmentId == shipmentId);
                if (shipment == null) return -1;

                return Math.Round((double)shipment.CurrentLoadKg / shipment.MaxCapacityKg, 4);

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;

            }



        }

        public async Task<int> GetMaxCapacity(int shipmentId)
        {
            try
            {

                var Shipments = await GetAllShipments();
                if (Shipments == null) return -1;

                var shipment = Shipments.FirstOrDefault(x => x.ShipmentId == shipmentId);
                return shipment != null ? shipment.MaxCapacityKg : -1;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }



        }

        public async Task<int> GetTotalEmptyKilometers()
        {
            try
            {

                var shipments = await GetAllShipments();
                if (shipments == null) return -1;

                return shipments.Sum(x => x.EmptyKilometers);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return -1;
            }



        }

        public async Task<List<LoadDegree>?> GetTotalLoadDegree()
        {
            try
            {

                var Shipments = await GetAllShipments();
                if (Shipments == null || !Shipments.Any()) return null;

                var loadDegrees = Shipments.Select(x => new LoadDegree
                {
                    ShipmentId = x.ShipmentId,
                    Degree = Math.Round((double)x.CurrentLoadKg / x.MaxCapacityKg, 4)
                }).ToList();

                return loadDegrees;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}