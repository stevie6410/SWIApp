using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels.ViewModels
{
    public class FileVM
    {
        public string Data { get; set; }

        public FileVM(string file)
        {
            Data = file;
        }
    }
}
