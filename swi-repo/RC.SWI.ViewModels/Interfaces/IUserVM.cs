using RC.SWI.ViewModels.Interfaces;

namespace RC.SWI.ViewModels
{
    public interface IUserVM
    {
        string FirstName { get; set; }
        string FullName { get; }
        int Id { get; set; }
        string LastName { get; set; }
        ISiteVM DefaultSite { get; set; }
        string Username { get; set; }
    }
}