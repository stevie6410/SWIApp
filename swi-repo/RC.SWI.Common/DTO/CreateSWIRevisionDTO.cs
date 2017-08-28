namespace RC.SWI.Common.DTO
{
    public class CreateSWIRevisionDTO
    {
        public System.Guid SWIMasterId { get; set; }
        public string AppVersion { get; set; }
        public int UserId { get; set; }
        public string SwiFileId { get; set; }
    }
}
