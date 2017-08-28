using RC.SWI.Entities;
using System;

namespace RC.SWI.ViewModels
{
    public class CreateStandardToolVM
    {
        public string Name { get; set; } // Name (Primary key) (length: 255)
        public string Image { get; set; } // Image (Primary key)
        public bool HasCarePoint { get; set; } // HasCarePoint (Primary key)
        public string CarePoint { get; set; } // CarePoint (length: 255)
        public Guid? SWIMasterId { get; set; } // SWIId

    }

    public static class StandardToolingExtMethods
    {
        public static StandardTool ToStandardTool(this CreateStandardToolVM createTool)
        {
            var result = new StandardTool();
            result.Name = createTool.Name;
            result.Image = createTool.Image;
            result.HasCarePoint = createTool.HasCarePoint;
            result.CarePoint = createTool.CarePoint;
            result.SWIMasterId = createTool.SWIMasterId; 

            return result;
        }
    }
}
