using RC.SWI.Entities;

namespace RC.SWI.ViewModels.ViewModels
{
    public class SWITypeVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public SWITypeVM(SWIType type)
        {
            Id = type.Id;
            Name = type.Name;
            Description = type.Description;
        }
    }
}
