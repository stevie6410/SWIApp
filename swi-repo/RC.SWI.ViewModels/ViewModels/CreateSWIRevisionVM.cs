using RC.SWI.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels
{
    public class CreateSWIRevisionVM
    {
        public Guid SWIMasterId { get; set; }
        public string AppVersion { get; set; }
        public int UserId { get; set; }
    }
}
