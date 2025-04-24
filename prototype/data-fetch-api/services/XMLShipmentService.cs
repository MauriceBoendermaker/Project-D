using System.Xml.Serialization;
using System.Threading.Tasks;
using Models;

namespace DataFetchApi.Services
{


    
    public class XMLShipmentService : IJsonShipmentService
    {
        private string Path = "data/Zendingen.xml";

        public async Task<IEnumerable<Zending>?> GetAllShipments()
        {
            var serializer = new XmlSerializer(typeof(List<Zending>), new XmlRootAttribute("Zendingen"));
            try
            {
                using (var fs = new FileStream(Path, FileMode.Open))
                {

                    var zendingen = (List<Zending>)serializer.Deserialize(fs);

                    foreach (Zending z in zendingen)
                    {
                        Console.WriteLine($"ID: {z.Id}, Voertuig: {z.ShipmentId}, Bestemming: {z.Destination}");
                    }
                    return zendingen;
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public Task<double> GetAverageLoadDegree()
        {
            throw new NotImplementedException();
        }

        public Task<double> GetLoadDegree(int ZendingId)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetMaxCapacity(int ZendingId)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetTotalEmptyMiles()
        {
            throw new NotImplementedException();
        }

        public Task<List<loadDegree>?> GetTotalLoadDegree()
        {
            throw new NotImplementedException();
        }
    }
}