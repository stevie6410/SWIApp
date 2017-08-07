namespace RC.SWI.ViewModels.Interfaces
{
    public interface IDocuemntUpdateVM
    {
        string AppVersion { get; set; }
        int DocumentTypeId { get; set; }
        string Name { get; set; }
        byte[] File { get; set; }
        int UserId { get; set; }
    }
}