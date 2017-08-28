using RC.SWI.Common.DTO;
using RC.SWI.Entities;

namespace RC.SWI.Common.ExtMethods
{
    public static class StandardToolingExtMethods
    {
        public static StandardTool ToStandardTool(this CreateStandardToolDTO createTool)
        {
            return new StandardTool
            {
                Name = createTool.Name,
                Image = createTool.Image,
                HasCarePoint = createTool.HasCarePoint,
                CarePoint = createTool.CarePoint,
                SWIMasterId = createTool.SWIMasterId
            };
        }
    }
}
