using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class SWITypeDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public SWITypeDTO(SWIType type)
        {
            if (type == null) return;
            Id = type.Id;
            Name = type.Name;
            Description = type.Description;
        }
    }
}
