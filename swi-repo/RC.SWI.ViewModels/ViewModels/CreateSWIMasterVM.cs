using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels
{
    public class CreateSWIMasterVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public int TypeId { get; set; }
        public int UserId { get; set; }
        public string AppVersion { get; set; }
        public string SWIFile { get; set; }
    }
}
