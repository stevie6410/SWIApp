using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class HSIconDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Caption { get; set; }
        public string Image { get; set; }

        public HSIconDTO(HealthAndSafetyIcon hsIcon)
        {
            Id = hsIcon.Id;
            Name = hsIcon.Name;
            Caption = hsIcon.Caption;
            Image = hsIcon.Image;
        }
    }
}