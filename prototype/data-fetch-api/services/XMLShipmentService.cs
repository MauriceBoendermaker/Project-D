using System.Xml.Serialization;
using System.Threading.Tasks;
using Models;

namespace Services
{
    public class XMLShipmentService : JsonShipmentService, IJsonShipmentService
    {
        private string Path = "data/Zendingen.xml";

        public override async Task<IEnumerable<Zending>?> GetAllShipments()
        {
            var serializer = new XmlSerializer(typeof(List<Zending>), new XmlRootAttribute("Zendingen"));
            try
            {
                using (FileStream fs = new FileStream(Path, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true))
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await fs.CopyToAsync(memoryStream);
                        memoryStream.Position = 0;

                        IEnumerable<Zending> zendingen = (List<Zending>)serializer.Deserialize(memoryStream)!;
                        return zendingen;
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