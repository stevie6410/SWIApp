using RC.SWI.Entities;

namespace RC.SWI.ViewModels
{
    public class RoleVM
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public RoleVM(Role role)
        {
            Id = role.Id;
            Name = role.Name;
        }
    }
}