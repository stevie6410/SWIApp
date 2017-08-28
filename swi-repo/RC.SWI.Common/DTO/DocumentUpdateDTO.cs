using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Common.DTO
{
    public class DocumentUpdateDTO
    {
        public string AppVersion { get; }
        public int DocumentTypeId { get; }
        public string Name { get; }
        public byte[] File { get; set; }
        public string Username { get; }
    }
}
