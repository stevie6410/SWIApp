using RC.SWI.Entities;

namespace RC.SWI.ViewModels.ViewModels
{
    public class SettingVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }

        public SettingVM(AppSetting s)
        {
            Id = s.Id;
            Name = s.Name;
            Description = s.Description;
            Value = s.Value;
        }
    }
}