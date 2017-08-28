namespace RC.SWI.ViewModels.Interfaces
{
    public interface IDocuemntUpdateVm
    {
        string AppVersion { get; }
        int DocumentTypeId { get; }
        string Name { get; }
        byte[] File { get; set; }
        string Username { get; }
    }
}