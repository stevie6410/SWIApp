using RC.SWI.Entities;
using RC.SWI.ViewModels.Interfaces;

namespace RC.SWI.ViewModels
{
    public class UserVM : IUserVM
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get { return FirstName + ' ' + LastName; } }
        public string Username { get; set; }
        public ISiteVM DefaultSite { get; set; }

        public UserVM(User user)
        {
            if (user != null)
            {
                Id = user.Id;
                FirstName = user.FirstName;
                LastName = user.LastName;
                Username = user.Username;
                DefaultSite = new SiteVM(user.Site);
            }
        }
    }
}
