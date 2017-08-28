namespace RC.SWI.ViewModels.Interfaces
{
    public interface IUserVm
    {
        string FirstName { get; set; }
        string FullName { get; }
        int Id { get; set; }
        string LastName { get; set; }
        ISiteVm DefaultSite { get; set; }
        string Username { get; set; }
    }
}