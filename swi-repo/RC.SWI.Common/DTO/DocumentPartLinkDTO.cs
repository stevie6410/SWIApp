using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class DocumentPartLinkDTO
    {
        public int Id { get; set; }
        public string PartNumber { get; set; }
        public string Revision { get; set; }
        public int? ErpSystemId { get; set; }

        public DocumentPartLinkDTO(DocumentPartLink partLink)
        {
            if (partLink == null) return;
            Id = partLink.Id;
            PartNumber = partLink.PartNumber;
            Revision = partLink.Revision;
            ErpSystemId = partLink.ErpSystemId;
        }
    }
}
