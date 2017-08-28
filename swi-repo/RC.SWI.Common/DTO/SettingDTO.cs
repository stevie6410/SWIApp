using RC.SWI.Entities;

namespace RC.SWI.Common.DTO
{
    public class SettingDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }

        public SettingDTO(AppSetting s)
        {
            if (s == null) return;
            Id = s.Id;
            Name = s.Name;
            Description = s.Description;
            Value = s.Value;
        }
    }
}