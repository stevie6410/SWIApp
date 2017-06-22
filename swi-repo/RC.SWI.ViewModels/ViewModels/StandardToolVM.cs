using RC.SWI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels
{
    public class StandardToolVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public bool HasCarePoint { get; set; }
        public string CarePoint { get; set; }
        public SWIMasterVM SWIMaster { get; set; }

        public StandardToolVM(StandardTool tool)
        {
            if (tool != null)
            {
                Id = tool.Id;
                Name = tool.Name;
                Image = tool.Image;
                HasCarePoint = tool.HasCarePoint;
                CarePoint = tool.CarePoint;
                SWIMaster = (tool.SWIMaster == null) ? null : new SWIMasterVM(tool.SWIMaster);
            }
        }
    }

    public static class StandardToolVMExtMethods
    {
        public static StandardTool ToStandardTool(this StandardToolVM toolVM)
        {
            var result = new StandardTool();
            result.Id = toolVM.Id;
            result.Name = toolVM.Name;
            result.Image = toolVM.Image;
            result.HasCarePoint = toolVM.HasCarePoint;
            result.CarePoint = toolVM.CarePoint;
            result.SWIId = toolVM.SWIMaster.Id;
            return result;
        }
    }
}
