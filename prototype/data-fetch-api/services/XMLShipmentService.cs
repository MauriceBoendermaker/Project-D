using System.Xml.Serialization;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public class XMLShipmentService : JsonShipmentService, IShipmentService
    {
        private string Path = "data/Zendingen.xml";

        public override async Task<IEnumerable<Shipment>?> GetAllShipments()
        {
            var serializer = new XmlSerializer(typeof(List<Shipment>), new XmlRootAttribute("Zendingen"));
            try
            {
                using (FileStream fs = new FileStream(Path, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await fs.CopyToAsync(memoryStream);
                        memoryStream.Position = 0;

                        IEnumerable<Shipment> shipments = (List<Shipment>)serializer.Deserialize(memoryStream)!;
                        return shipments;
                    }
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
