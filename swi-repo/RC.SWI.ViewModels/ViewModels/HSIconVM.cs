using RC.SWI.Entities;

namespace RC.SWI.ViewModels.ViewModels
{
    public class HSIconVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public HSIconVM(HealthAndSafetyIcon hsIcon)
        {
            Id = hsIcon.Id;
            Name = hsIcon.Name;
            Image = hsIcon.Image;
        }
    }
}