using RC.SWI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels
{
    public class DocumentPartLinkVM
    {
        public int Id { get; set; }
        public string PartNumber { get; set; }
        public string Revision { get; set; }
        public int? ErpSystemId { get; set; }

        public DocumentPartLinkVM(DocumentPartLink partLink)
        {
            if(partLink !=  null)
            {
                Id = partLink.Id;
                PartNumber = partLink.PartNumber;
                Revision = partLink.Revision;
                ErpSystemId = partLink.ErpSystemId;
            }
        }
    }
}
