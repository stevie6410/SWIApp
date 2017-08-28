using RC.SWI.Entities;
using RC.SWI.ViewModels;

namespace RC.SWI.Common.DTO
{
    public class StandardToolDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool? HasCarePoint { get; set; }
        public string CarePoint { get; set; }
        public SWIMasterDTO SWIMaster { get; set; }

        public StandardToolDTO(StandardTool tool)
        {
            if (tool == null) return;
            Id = tool.Id;
            Name = tool.Name;
            Image = tool.Image;
            HasCarePoint = tool.HasCarePoint;
            CarePoint = tool.CarePoint;
            SWIMaster = (tool.SWIMaster == null) ? null : new SWIMasterDTO(tool.SWIMaster);
        }
    }
}
